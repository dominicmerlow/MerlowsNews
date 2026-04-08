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

interface ApplicationApprovedEmailProps {
  firstName: string
  loginUrl: string
}

export function ApplicationApprovedEmail({ firstName, loginUrl }: ApplicationApprovedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Persia Bridge application has been approved</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Application Approved</Heading>
          <Text style={subheading}>Persia Bridge · The Cyrus Accord</Text>
          <Hr style={hr} />
          <Text style={paragraph}>Dear {firstName},</Text>
          <Text style={paragraph}>
            We are pleased to welcome you to The Cyrus Accord. Your membership application has been
            reviewed and approved.
          </Text>
          <Text style={paragraph}>
            Click below to set up your profile and join your fellow members.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={loginUrl}>
              Activate your membership
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>Persia Bridge · The Cyrus Accord · London</Text>
        </Container>
      </Body>
    </Html>
  )
}

interface ApplicationRejectedEmailProps {
  firstName: string
  reason?: string
}

export function ApplicationRejectedEmail({ firstName, reason }: ApplicationRejectedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Update on your Persia Bridge application</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Application Update</Heading>
          <Text style={subheading}>Persia Bridge · The Cyrus Accord</Text>
          <Hr style={hr} />
          <Text style={paragraph}>Dear {firstName},</Text>
          <Text style={paragraph}>
            Thank you for your interest in The Cyrus Accord. After careful review, we are unable to
            approve your membership application at this time.
          </Text>
          {reason && <Text style={paragraph}>Reason: {reason}</Text>}
          <Text style={paragraph}>
            If you believe this decision was made in error, or if your circumstances have changed,
            please contact us at{' '}
            <a href="mailto:membership@persiabridge.com" style={link}>
              membership@persiabridge.com
            </a>
            .
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Persia Bridge · The Cyrus Accord · London</Text>
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
const buttonContainer = { textAlign: 'center' as const, margin: '28px 0' }
const button = { backgroundColor: '#c2610a', borderRadius: '6px', color: '#fff', fontSize: '16px', fontWeight: '600', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }
const footer = { fontSize: '12px', color: '#9ca3af', lineHeight: '18px', textAlign: 'center' as const }
const link = { color: '#c2610a' }
