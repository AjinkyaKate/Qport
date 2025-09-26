# Supabase Setup Guide for Qport

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Sign in with your account
3. Click "New Project"
4. Name: "Qport Demo Requests"
5. Choose any organization
6. Generate a strong password (save it)
7. Choose region closest to you
8. Click "Create new project"

## Step 2: Get Your API Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Find these values:

   - **Project URL** (something like `https://abcdefgh.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)
   - **Service role key** (starts with `eyJ...`)

## Step 3: Update Environment Variables

Edit `/Users/a917751/Desktop/Qport/.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
```

## Step 4: Create Database Table

In your Supabase project:

1. Go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL:

```sql
-- Create demo_requests table
CREATE TABLE public.demo_requests (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    source TEXT NOT NULL DEFAULT 'website',
    selected_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert/select
CREATE POLICY "Enable insert for service role" ON public.demo_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable select for service role" ON public.demo_requests
    FOR SELECT USING (true);
```

4. Click **RUN**

## Step 5: Test the Setup

1. Restart your dev server: `yarn dev`
2. Go to http://localhost:3000
3. Fill out and submit the "Book Demo" form
4. Check your Supabase table editor to see if the data was saved

## Troubleshooting

- Make sure all environment variables are correct
- Check that the table was created successfully
- Look at browser console and server logs for errors
- Verify RLS policies are correctly set

## Security Notes

- Never commit your service role key to public repositories
- The anon key is safe for client-side use
- Service role key should only be used on the server