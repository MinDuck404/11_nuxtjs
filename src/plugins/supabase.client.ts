import { createClient } from '@supabase/supabase-js';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Supabase initialization failed: supabaseUrl (${supabaseUrl}) or supabaseKey (${supabaseKey}) is missing`);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  });

  return {
    provide: {
      supabase
    }
  };
});