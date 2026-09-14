'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCircle,
  Clock,
  User,
  Reply,
  Search,
  Inbox,
  AlertCircle,
  Calendar,
} from 'lucide-react'
import { markMessageRead, deleteMessage } from '@/app/admin/actions/messages'
import type { Database } from '@/types/database'

type MessageRow = Database['public']['Tables']['contact_messages']['Row']

interface MessagesViewProps {
  initialMessages: MessageRow[]
}

export function MessagesView({ initialMessages }: MessagesViewProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<MessageRow | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const handleToggleRead = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await markMessageRead(id, !currentStatus)
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_read: !currentStatus } : m))
        )
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, is_read: !currentStatus } : null))
        }
        router.refresh()
      }
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteMessage(id)
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
        setDeleteConfirmId(null)
        router.refresh()
      }
    })
  }

  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'unread' ? !m.is_read : m.is_read
    const matchesSearch =
      searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 sm:top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inquiries by name, email, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 rounded-xl bg-card/60 backdrop-blur border border-border text-base sm:text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/40 border border-border">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 rounded-lg text-xs font-mono transition-colors flex items-center justify-center ${
              filter === 'all'
                ? 'bg-background text-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-1.5 ${
              filter === 'unread'
                ? 'bg-background text-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFilter('read')}
            className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 rounded-lg text-xs font-mono transition-colors flex items-center justify-center ${
              filter === 'read'
                ? 'bg-background text-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Main Inbox Layout: Master/Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List (5 Cols on large screens) */}
        <div className={`lg:col-span-5 space-y-3 ${selectedMessage ? 'hidden lg:block' : 'block'}`}>
          {filteredMessages.length === 0 ? (
            <div className="p-10 rounded-2xl bg-card/60 border border-border text-center space-y-3">
              <Inbox className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-xs font-mono text-muted-foreground">
                {searchQuery
                  ? 'No inquiries match your search filter.'
                  : 'No contact inquiries received yet.'}
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg)
                    if (!msg.is_read) handleToggleRead(msg.id, false)
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-primary/10 border-primary/40 shadow-sm'
                      : !msg.is_read
                      ? 'bg-card border-border hover:border-primary/30 shadow-xs'
                      : 'bg-card/40 border-border/70 hover:bg-card/70 opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {!msg.is_read && (
                        <span
                          className="w-2 h-2 rounded-full bg-primary shrink-0"
                          title="Unread"
                        />
                      )}
                      <span className="text-xs font-mono font-bold text-foreground truncate">
                        {msg.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(msg.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-primary/80 truncate mb-1">
                    {msg.email}
                  </p>

                  <p className="text-xs font-mono text-muted-foreground line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              )
            })
          )}
        </div>

        {/* Message Detail View (7 Cols) */}
        <div className={`lg:col-span-7 ${selectedMessage ? 'block' : 'hidden lg:block'}`}>
          {selectedMessage ? (
            <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-6 sticky top-6">
              {/* Mobile Back to List Button */}
              <div className="lg:hidden pb-3 border-b border-border">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="min-h-[40px] px-3 py-1.5 rounded-xl border border-border text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                >
                  <span>← Back to Inquiries</span>
                </button>
              </div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-border gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <h2 className="text-base font-mono font-bold text-foreground">
                      {selectedMessage.name}
                    </h2>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    Sender:{' '}
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-primary hover:underline font-semibold"
                    >
                      {selectedMessage.email}
                    </a>
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 pt-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(selectedMessage.created_at).toLocaleString(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'short',
                      })}
                    </span>
                  </p>
                </div>

                {/* Status Badge & Actions */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleRead(selectedMessage.id, selectedMessage.is_read)
                    }
                    className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                      selectedMessage.is_read
                        ? 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'
                        : 'border-primary/30 bg-primary/10 text-primary'
                    }`}
                    title={
                      selectedMessage.is_read
                        ? 'Mark as unread'
                        : 'Mark as read'
                    }
                  >
                    {selectedMessage.is_read ? (
                      <>
                        <Mail className="h-3.5 w-3.5" />
                        <span>Mark Unread</span>
                      </>
                    ) : (
                      <>
                        <MailOpen className="h-3.5 w-3.5" />
                        <span>Mark Read</span>
                      </>
                    )}
                  </button>

                  {/* Delete Button */}
                  {deleteConfirmId === selectedMessage.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedMessage.id)}
                        disabled={isPending}
                        className="min-h-[44px] px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-mono font-bold hover:bg-red-700 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="min-h-[44px] px-3 py-2 rounded-xl border border-border text-muted-foreground text-xs font-mono hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(selectedMessage.id)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-border text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-colors p-2"
                      aria-label="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Message Body */}
              <div className="p-4 rounded-xl bg-background/80 border border-border">
                <p className="text-xs sm:text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Direct Reply Bar */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Inquiry from Abdulhammed Portfolio`}
                  className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold hover:bg-primary/90 transition-colors shadow-xs"
                >
                  <Reply className="h-3.5 w-3.5" />
                  <span>Reply via Direct Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-card/40 border border-border border-dashed text-center space-y-2">
              <Mail className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-xs font-mono text-muted-foreground">
                Select an inquiry from the inbox list to inspect and reply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
