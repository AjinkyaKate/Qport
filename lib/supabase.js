import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if credentials are provided
const hasCredentials = supabaseUrl && supabaseAnonKey

// Create client with fallback for missing credentials
export const supabase = hasCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// For server-side operations (API routes)
export const supabaseAdmin = hasCredentials && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null