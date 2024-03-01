import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zdewtlmuxberrnzxgwpi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZXd0bG11eGJlcnJuenhnd3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjQ1NjUsImV4cCI6MjAyNDcwMDU2NX0.S_jkzoXA8dHdLBdJFAP6rV-M2TdztW6VA5UQHdKPZSg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})