export const API_URL = import.meta.env.VITE_API_URL;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

if (!API_URL) {
  throw new Error('VITE_API_URL is not set. Define it in client/.env');
}
