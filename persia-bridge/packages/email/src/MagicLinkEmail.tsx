import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface MagicLinkEmailProps {
  url: string
  email: string
}

export function MagicLinkEmail({ url, email }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Sign in to Persia Bridge</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Persia Bridge</Heading>
          <Text style={subheading}>The Cyrus Accord</Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Click the button below to sign in to your Persia Bridge account. This link expires in
            15 minutes.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Sign in to Persia Bridge
            </Button>
          </Section>
          <Text style={hint}>
            If you didn&apos;t request this, you can safely ignore this email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Persia Bridge · The Cyrus Accord · London
            <br />
            {email}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#f5f5f5', fontFamily: 'Georgia, serif' }
const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 40px',
  maxWidth: '560px',
  borderRadius: '8px',
}
const heading = { fontSize: '28px', fontWeight: '700', color: '#1a1a2e', margin: '0' }
const subheading = { fontSize: '13px', color: '#b45309', margin: '4px 0 0', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const paragraph = { fontSize: '16px', lineHeight: '26px', color: '#374151' }
const buttonContainer = { textAlign: 'center' as const, margin: '28px 0' }
const button = {
  backgroundColor: '#c2610a',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 32px',
  textDecoration: 'none',
  display: 'inline-block',
}
const hint = { fontSize: '13px', color: '#9ca3af', lineHeight: '20px' }
const footer = { fontSize: '12px', color: '#9ca3af', lineHeight: '18px', textAlign: 'center' as const }
