export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      portfolio_profile: {
        Row: {
          id: string
          name: string
          role: string
          tagline: string
          description: string
          location: string
          email: string
          phone: string
          available_for_work: boolean
          show_email: boolean
          show_phone: boolean
          socials: {
            github: string
            linkedin: string
            twitter: string
            [key: string]: string
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string
          role?: string
          tagline: string
          description: string
          location?: string
          email?: string
          phone?: string
          available_for_work?: boolean
          show_email?: boolean
          show_phone?: boolean
          socials?: {
            github: string
            linkedin: string
            twitter: string
            [key: string]: string
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          tagline?: string
          description?: string
          location?: string
          email?: string
          phone?: string
          available_for_work?: boolean
          show_email?: boolean
          show_phone?: boolean
          socials?: {
            github: string
            linkedin: string
            twitter: string
            [key: string]: string
          }
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          legacy_id: string | null
          title: string
          slug: string
          featured: boolean
          is_published: boolean
          display_order: number
          role: string
          duration: string | null
          team: string | null
          problem: string
          solution: string
          impact: {
            metric: string
            detail: string
          }
          tech: string[]
          features: string[]
          image: string
          gallery: string[]
          live_url: string | null
          github_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          legacy_id?: string | null
          title: string
          slug: string
          featured?: boolean
          is_published?: boolean
          display_order?: number
          role: string
          duration?: string | null
          team?: string | null
          problem: string
          solution: string
          impact?: {
            metric: string
            detail: string
          }
          tech?: string[]
          features?: string[]
          image: string
          gallery?: string[]
          live_url?: string | null
          github_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          legacy_id?: string | null
          title?: string
          slug?: string
          featured?: boolean
          is_published?: boolean
          display_order?: number
          role?: string
          duration?: string | null
          team?: string | null
          problem?: string
          solution?: string
          impact?: {
            metric: string
            detail: string
          }
          tech?: string[]
          features?: string[]
          image?: string
          gallery?: string[]
          live_url?: string | null
          github_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          icon_name: string
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          icon_name?: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          icon_name?: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          category_id: string
          name: string
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'skills_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'skill_categories'
            referencedColumns: ['id']
          }
        ]
      }
      experiences: {
        Row: {
          id: string
          company: string
          role: string
          period: string
          location: string
          description: string
          achievements: string[]
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company: string
          role: string
          period: string
          location?: string
          description: string
          achievements?: string[]
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company?: string
          role?: string
          period?: string
          location?: string
          description?: string
          achievements?: string[]
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      current_work: {
        Row: {
          id: string
          title: string
          description: string
          tech: string[]
          status: string
          progress: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          tech?: string[]
          status?: string
          progress?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          tech?: string[]
          status?: string
          progress?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          admin_email: string
          site_title: string
          site_description: string
          keywords: string[]
          og_image_url: string | null
          canonical_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          admin_email?: string
          site_title?: string
          site_description?: string
          keywords?: string[]
          og_image_url?: string | null
          canonical_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          admin_email?: string
          site_title?: string
          site_description?: string
          keywords?: string[]
          og_image_url?: string | null
          canonical_url?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_portfolio_owner: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
