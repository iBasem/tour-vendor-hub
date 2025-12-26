
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okqgtbzdftkssqswfybn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcWd0YnpkZnRrc3Nxc3dmeWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2OTEzMTUsImV4cCI6MjA4MjI2NzMxNX0.uL5TvMm7Sa11lZroAWXNPBQChjizfLBe4WMo4OdFUls'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
