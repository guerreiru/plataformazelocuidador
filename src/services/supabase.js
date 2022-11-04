import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
  // autoRefreshToken: true,
  // persistSession: true
  // url: string,
  // headers?: { [key: string]: string },
};

const supabase = createClient(
  'https://vsblxlqdvbrmuvromivn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM1NTIwNTc3LCJleHAiOjE5NTEwOTY1Nzd9._R80Z3BrxwYv50LDxy_b6CwrzgBm4RAaUkOteFB9HsE',
  options,
);

export default supabase;
