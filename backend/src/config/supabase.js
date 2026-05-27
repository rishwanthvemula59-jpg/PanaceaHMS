import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('CRITICAL: SUPABASE_URL environment variable is missing.');
}

// Initialize Supabase Client
// We prefer using the service role key for the backend server to act as a trusted agent,
// but fall back to the anon key if the service role key is not configured.
const activeKey = supabaseServiceKey || supabaseAnonKey;

if (!activeKey) {
  console.error('CRITICAL: Supabase API Key (service role or anon) is missing.');
}

export const supabase = createClient(supabaseUrl, activeKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

console.log('Supabase client initialized successfully using %s key.', supabaseServiceKey ? 'service-role' : 'anon');
