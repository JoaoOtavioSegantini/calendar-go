import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/calendar.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="CalendarGo | Hassle-free scheduling "
        description="Connect your calendar and let your customers book in their spare
            time."
      />

      <Container>
        <Hero>
          <Text size="sm">Welcome to Calendar Go!</Text>
          <Heading size="4xl">Hassle-free scheduling</Heading>
          <Text size="xl">
            Connect your calendar and let your customers book in their spare
            time.
          </Text>

          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt=""
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
