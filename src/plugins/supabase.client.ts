import { createClient } from '@supabase/supabase-js'
import { defineNuxtPlugin } from 'nuxt/app'

const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY as string

export default defineNuxtPlugin(() => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  })
  return {
    provide: {
      supabase
    }
  }
})