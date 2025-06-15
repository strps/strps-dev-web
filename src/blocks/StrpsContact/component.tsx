'use client'
import React, { useState } from 'react'
import type { Page } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Section } from '@/components/Section/Section'

type StrpsContactProps = Extract<Page['layout'][number], { blockType: 'strpsContact' }>

export const StrpsContact = ({
  id,
  title = 'Contact',
  disabled = false,
}: StrpsContactProps & { disabled?: boolean }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <Section
      id={id}
      container={true}
      backgroundContainer={false}
      theme="auto"
      background="none"
      className="my-16"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              disabled={disabled}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              disabled={disabled}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              disabled={disabled}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={5}
            />
          </div>
          <Button type="submit" disabled={disabled}>
            {disabled ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </Section>
  )
}
