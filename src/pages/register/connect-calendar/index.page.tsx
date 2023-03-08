import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'

import CalendarSVG from '@/assets/calendar.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Connect your calendar</Heading>
        <Text>
          We need to connect your calendar to your account so we can schedule
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text size="sm">
            <Image
              src={CalendarSVG}
              alt=""
              width={18}
              style={{ marginRight: 10 }}
            />
            Google Calendar
          </Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button onClick={handleConnectCalendar} variant="secondary">
              Connect <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao conectar com o Google Calendar. Tente novamente e verifique
            se você ativou as permissões necessárias.
          </AuthError>
        )}

        <Button
          onClick={handleNavigateToNextStep}
          type="submit"
          disabled={!isSignedIn}
        >
          Next Step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
