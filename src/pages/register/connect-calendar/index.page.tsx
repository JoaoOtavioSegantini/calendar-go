import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Calendar } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  // async function handleRegister(data: registerFormData) {}

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
            <Calendar
              weight="fill"
              width={16}
              height={16}
              style={{ marginRight: 8 }}
            />{' '}
            Google Calendar
          </Text>
          <Button variant="secondary">
            Connect <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Next Step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
