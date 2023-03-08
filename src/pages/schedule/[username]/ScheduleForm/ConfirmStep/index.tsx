import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  observation: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmSchendule(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmSchendule)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 may 2023
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Full name</Text>
        <TextInput placeholder="Your name" {...register('name')} />

        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Email</Text>
        <TextInput
          type="email"
          placeholder="calendargo@example.com"
          {...register('email')}
        />

        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observation</Text>
        <TextArea {...register('observation')} />
      </label>

      <FormActions>
        <Button
          style={{ transition: 'all 0.2s ease-out' }}
          type="button"
          variant="tertiary"
        >
          Cancel
        </Button>
        <Button
          style={{ transition: 'all 0.2s ease-out' }}
          disabled={isSubmitting}
          type="submit"
        >
          Confirm
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
