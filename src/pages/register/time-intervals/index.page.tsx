import { api } from '@/lib/axios'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalInput,
  IntervalItem,
  IntervalsContainer,
} from './styles'

const TimeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        start: z.string(),
        end: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((intervals) => intervals.enabled),
    )
    .refine((intervals) => intervals.length > 0, {
      message: 'Select at least one day of the week',
    })
    .transform((intervals) => {
      return intervals.map((intervals) => {
        return {
          weekDay: intervals.weekDay,
          startInMinutes: convertTimeStringToMinutes(intervals.start),
          endInMinutes: convertTimeStringToMinutes(intervals.end),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) => interval.endInMinutes - 60 >= interval.startInMinutes,
        )
      },
      {
        message: 'The minimum interval is 1 hour',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof TimeIntervalsFormSchema>

type TimeIntervalsFormOutput = z.output<typeof TimeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(TimeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, start: '08:00', end: '18:00' },
        { weekDay: 1, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 2, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 3, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 4, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 5, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 6, enabled: false, start: '08:00', end: '18:00' },
      ],
    },
  })

  const router = useRouter()

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const invervals = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', { intervals })

    await router.push('/register/update-profile')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá </Heading>
        <Text>
          Agora, escolha os horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />

                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInput>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={invervals[index].enabled === false}
                    {...register(`intervals.${index}.start`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={invervals[index].enabled === false}
                    {...register(`intervals.${index}.end`)}
                  />
                </IntervalInput>
              </IntervalItem>
            )
          })}
        </IntervalsContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Next Step
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
