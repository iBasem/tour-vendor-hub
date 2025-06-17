export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      itineraries: {
        Row: {
          accommodation: string | null
          activities: string[] | null
          created_at: string | null
          day_number: number
          description: string | null
          id: string
          meals_included: string[] | null
          package_id: string
          title: string
          transportation: string | null
        }
        Insert: {
          accommodation?: string | null
          activities?: string[] | null
          created_at?: string | null
          day_number: number
          description?: string | null
          id?: string
          meals_included?: string[] | null
          package_id: string
          title: string
          transportation?: string | null
        }
        Update: {
          accommodation?: string | null
          activities?: string[] | null
          created_at?: string | null
          day_number?: number
          description?: string | null
          id?: string
          meals_included?: string[] | null
          package_id?: string
          title?: string
          transportation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_bookings: {
        Row: {
          booking_date: string
          created_at: string | null
          id: string
          package_id: string
          participants: number
          special_requests: string | null
          status: string
          total_price: number
          traveler_id: string
          updated_at: string | null
        }
        Insert: {
          booking_date: string
          created_at?: string | null
          id?: string
          package_id: string
          participants?: number
          special_requests?: string | null
          status?: string
          total_price: number
          traveler_id: string
          updated_at?: string | null
        }
        Update: {
          booking_date?: string
          created_at?: string | null
          id?: string
          package_id?: string
          participants?: number
          special_requests?: string | null
          status?: string
          total_price?: number
          traveler_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_bookings_traveler_id_fkey"
            columns: ["traveler_id"]
            isOneToOne: false
            referencedRelation: "travelers"
            referencedColumns: ["id"]
          },
        ]
      }
      package_media: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_primary: boolean | null
          media_type: string
          mime_type: string | null
          package_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_primary?: boolean | null
          media_type: string
          mime_type?: string | null
          package_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_primary?: boolean | null
          media_type?: string
          mime_type?: string | null
          package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_media_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          agency_id: string
          available_from: string | null
          available_to: string | null
          base_price: number
          cancellation_policy: string | null
          category: string
          created_at: string | null
          description: string | null
          destination: string
          difficulty_level: string | null
          duration_days: number
          duration_nights: number
          exclusions: string[] | null
          featured: boolean | null
          id: string
          inclusions: string[] | null
          max_participants: number | null
          requirements: string[] | null
          status: string
          terms_conditions: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          agency_id: string
          available_from?: string | null
          available_to?: string | null
          base_price: number
          cancellation_policy?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          destination: string
          difficulty_level?: string | null
          duration_days?: number
          duration_nights?: number
          exclusions?: string[] | null
          featured?: boolean | null
          id?: string
          inclusions?: string[] | null
          max_participants?: number | null
          requirements?: string[] | null
          status?: string
          terms_conditions?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          agency_id?: string
          available_from?: string | null
          available_to?: string | null
          base_price?: number
          cancellation_policy?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          destination?: string
          difficulty_level?: string | null
          duration_days?: number
          duration_nights?: number
          exclusions?: string[] | null
          featured?: boolean | null
          id?: string
          inclusions?: string[] | null
          max_participants?: number | null
          requirements?: string[] | null
          status?: string
          terms_conditions?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packages_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "travel_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_agencies: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          company_description: string | null
          company_name: string
          contact_person_first_name: string | null
          contact_person_last_name: string | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          is_verified: boolean | null
          license_number: string | null
          phone: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          company_description?: string | null
          company_name: string
          contact_person_first_name?: string | null
          contact_person_last_name?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id: string
          is_verified?: boolean | null
          license_number?: string | null
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          company_description?: string | null
          company_name?: string
          contact_person_first_name?: string | null
          contact_person_last_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_verified?: boolean | null
          license_number?: string | null
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      travelers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string | null
          id: string
          is_verified: boolean | null
          last_name: string | null
          nationality: string | null
          phone: string | null
          preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          id: string
          is_verified?: boolean | null
          last_name?: string | null
          nationality?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_verified?: boolean | null
          last_name?: string | null
          nationality?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      profiles: {
        Row: {
          avatar_url: string | null
          company_description: string | null
          company_name: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string | null
          is_verified: boolean | null
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "traveler" | "agency" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["traveler", "agency", "admin"],
    },
  },
} as const
