"use server"

interface ContactFormState {
  success: boolean
  message: string
  errors?: {
    name?: string
    email?: string
    message?: string
  }
}

export async function submitContactMessage(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const message = (formData.get("message") as string)?.trim()

  const errors: { name?: string; email?: string; message?: string } = {}

  if (!name || name.length < 2) {
    errors.name = "Please provide a valid name (at least 2 characters)."
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please provide a valid email address."
  }

  if (!message || message.length < 10) {
    errors.message = "Please provide a message with at least 10 characters."
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted errors.",
      errors,
    }
  }

  // Artificial async delay to simulate network latency for responsive UX state
  await new Promise((resolve) => setTimeout(resolve, 600))

  // In production, configure RESEND_API_KEY or mailer here
  // e.g., await resend.emails.send({ from: '...', to: 'Abdulhammedmustapha@gmail.com', ... })

  return {
    success: true,
    message: "Thank you! Your message has been received. I will respond to your email shortly.",
  }
}
