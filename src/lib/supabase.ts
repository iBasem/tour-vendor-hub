
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kokkgedkjuhjvpxwemli.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtva2tnZWRranVoanZweHdlbWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMjA3OTksImV4cCI6MjA2NTU5Njc5OX0.QJse3EBLb_YZd7RrO2FxKKfGSbY1WhJoUrki8LCCMlU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
