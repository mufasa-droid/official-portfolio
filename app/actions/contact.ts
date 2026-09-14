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
  // Honeypot anti-spam verification: if a bot fills in the hidden field, silently return success
  const botField = (formData.get("website_url") as string)?.trim()
  if (botField) {
    return {
      success: true,
      message: "Thank you! Your message has been received.",
    }
  }

  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const message = (formData.get("message") as string)?.trim()

  const errors: { name?: string; email?: string; message?: string } = {}

  if (!name || name.length < 2) {
    errors.name = "Please provide a valid name (at least 2 characters)."
  } else if (name.length > 100) {
    errors.name = "Name must not exceed 100 characters."
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please provide a valid email address."
  } else if (email.length > 254) {
    errors.email = "Email address must not exceed 254 characters."
  }

  if (!message || message.length < 10) {
    errors.message = "Please provide a message with at least 10 characters."
  } else if (message.length > 5000) {
    errors.message = "Message must not exceed 5,000 characters."
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted errors.",
      errors,
    }
  }

  // Persist message to Supabase database if configured
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const { revalidatePath } = await import('next/cache')
    const supabase = createClient()
    if (supabase) {
      await supabase.from('contact_messages').insert({
        name,
        email,
        message,
        is_read: false,
      })
      revalidatePath('/admin/messages')
    }
  } catch (err) {
    // If Supabase is unconfigured or offline, gracefully continue so the user is not blocked
    console.warn('Notice: Could not persist contact message to database:', err)
  }

  // Artificial async delay to simulate network latency for responsive UX state
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    success: true,
    message: "Thank you! Your message has been received. I will respond to your email shortly.",
  }
}

