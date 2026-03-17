import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  firstName: string
  dashboardUrl: string
}

export function WelcomeEmail({ firstName, dashboardUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Persia Bridge — The Cyrus Accord</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to Persia Bridge</Heading>
          <Text style={subheading}>The Cyrus Accord</Text>
          <Hr style={hr} />
          <Text style={paragraph}>Dear {firstName},</Text>
          <Text style={paragraph}>
            Your membership application has been approved. You are now part of The Cyrus Accord —
            a community built on the 2,500-year covenant between Persia and Israel.
          </Text>
          <Text style={paragraph}>To get started, we recommend:</Text>
          <Text style={list}>
            1. Complete your member profile (target: 5 minutes)
            <br />
            2. Connect with 3 fellow members in the Directory
            <br />
            3. Explore the Heritage Layer to understand our shared history
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              Go to your dashboard
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Persia Bridge · The Cyrus Accord · London
            <br />
            <a href="https://persiabridge.com/legal/unsubscribe" style={link}>
              Manage email preferences
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#f5f5f5', fontFamily: 'Georgia, serif' }
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '40px', maxWidth: '560px', borderRadius: '8px' }
const heading = { fontSize: '28px', fontWeight: '700', color: '#1a1a2e', margin: '0' }
const subheading = { fontSize: '13px', color: '#b45309', margin: '4px 0 0', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const paragraph = { fontSize: '16px', lineHeight: '26px', color: '#374151' }
const list = { fontSize: '16px', lineHeight: '30px', color: '#374151', paddingLeft: '16px' }
const buttonContainer = { textAlign: 'center' as const, margin: '28px 0' }
const button = { backgroundColor: '#c2610a', borderRadius: '6px', color: '#fff', fontSize: '16px', fontWeight: '600', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }
const footer = { fontSize: '12px', color: '#9ca3af', lineHeight: '18px', textAlign: 'center' as const }
const link = { color: '#9ca3af' }
