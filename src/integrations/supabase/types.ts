export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      consultation_availability: {
        Row: {
          active: boolean
          created_at: string
          end_time: string
          id: string
          start_time: string
          weekday: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          end_time: string
          id?: string
          start_time: string
          weekday: number
        }
        Update: {
          active?: boolean
          created_at?: string
          end_time?: string
          id?: string
          start_time?: string
          weekday?: number
        }
        Relationships: []
      }
      consultation_blocked_slots: {
        Row: {
          blocked_date: string
          created_at: string
          end_time: string | null
          id: string
          reason: string | null
          start_time: string | null
        }
        Insert: {
          blocked_date: string
          created_at?: string
          end_time?: string | null
          id?: string
          reason?: string | null
          start_time?: string | null
        }
        Update: {
          blocked_date?: string
          created_at?: string
          end_time?: string | null
          id?: string
          reason?: string | null
          start_time?: string | null
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          budget: string | null
          cancel_token: string
          city: string | null
          consent: boolean
          contact_method: string
          created_at: string
          email: string
          first_name: string
          id: string
          lang: string
          last_name: string
          phone: string
          postal_code: string | null
          project_description: string | null
          project_start: string | null
          project_type: string
          reminder_sent_at: string | null
          slot_end: string
          slot_start: string
          status: string
          updated_at: string
        }
        Insert: {
          budget?: string | null
          cancel_token?: string
          city?: string | null
          consent?: boolean
          contact_method?: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          lang?: string
          last_name: string
          phone: string
          postal_code?: string | null
          project_description?: string | null
          project_start?: string | null
          project_type: string
          reminder_sent_at?: string | null
          slot_end: string
          slot_start: string
          status?: string
          updated_at?: string
        }
        Update: {
          budget?: string | null
          cancel_token?: string
          city?: string | null
          consent?: boolean
          contact_method?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          lang?: string
          last_name?: string
          phone?: string
          postal_code?: string | null
          project_description?: string | null
          project_start?: string | null
          project_type?: string
          reminder_sent_at?: string | null
          slot_end?: string
          slot_start?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      consultation_callbacks: {
        Row: {
          consent: boolean
          created_at: string
          email: string
          first_name: string
          id: string
          lang: string
          last_name: string
          location: string | null
          phone: string
          project_description: string | null
          project_start: string | null
          project_type: string | null
        }
        Insert: {
          consent?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: string
          lang?: string
          last_name: string
          location?: string | null
          phone: string
          project_description?: string | null
          project_start?: string | null
          project_type?: string | null
        }
        Update: {
          consent?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          lang?: string
          last_name?: string
          location?: string | null
          phone?: string
          project_description?: string | null
          project_start?: string | null
          project_type?: string | null
        }
        Relationships: []
      }
      consultation_settings: {
        Row: {
          buffer_minutes: number
          horizon_days: number
          id: boolean
          lead_time_hours: number
          slot_minutes: number
          timezone: string
          updated_at: string
        }
        Insert: {
          buffer_minutes?: number
          horizon_days?: number
          id?: boolean
          lead_time_hours?: number
          slot_minutes?: number
          timezone?: string
          updated_at?: string
        }
        Update: {
          buffer_minutes?: number
          horizon_days?: number
          id?: boolean
          lead_time_hours?: number
          slot_minutes?: number
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consultation_free_slots: {
        Args: { target_date: string }
        Returns: {
          slot_start: string
        }[]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
