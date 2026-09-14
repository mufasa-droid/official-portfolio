import { createClient } from '@/lib/supabase/server'
import { MessagesView } from '@/components/admin/messages/messages-view'
import type { Database } from '@/types/database'

type MessageRow = Database['public']['Tables']['contact_messages']['Row']

export default async function AdminMessagesPage() {
  const supabase = createClient()
  let messagesList: MessageRow[] = []

  if (supabase) {
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      messagesList = data
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground">
          Inbound Contact Inquiries
        </h1>
        <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
          Review incoming client inquiries, collaboration proposals, and recruiting messages.
        </p>
      </div>

      <MessagesView initialMessages={messagesList} />
    </div>
  )
}
