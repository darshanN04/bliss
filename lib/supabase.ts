import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rzhirhuwhubbgebngcic.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6aGlyaHV3aHViYmdlYm5nY2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwODc3NjYsImV4cCI6MjA1MzY2Mzc2Nn0.5knwf8CyNJUc9_iRaBpy92Zv8FdA4B7mLezErExX0ZI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true, 
    persistSession: true,
    detectSessionInUrl: false,
  },
})