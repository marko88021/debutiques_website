# Admin Scripts

This folder contains administrative scripts for managing the Debutiques website.

## Security Notice

⚠️ **Important:** These scripts use the Supabase **service role key** which bypasses Row Level Security and has full database access. This key should:

- **NEVER** be committed to git
- **NEVER** be exposed in client-side code
- **ONLY** be used in secure server contexts or local development

## Setup

1. Copy `.env.example` to `.env` in the project root
2. Get your service role key from Supabase Dashboard:
   - Go to Project Settings > API
   - Copy the `service_role` key (NOT the `anon` key)
3. Add it to your `.env` file:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
   ```

## Available Scripts

### addBlogPost.js

Adds a new blog post to the Supabase database.

**Usage:**
```bash
node scripts/addBlogPost.js
```

**Requirements:**
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (from .env)

### convertTranslations.js

Converts CSV translation files to JSON format.

**Usage:**
```bash
node scripts/convertTranslations.js
```

## Why Service Role Key?

Previously, these scripts used the `anon` key, which is meant for client-side use and has Row Level Security (RLS) restrictions. The service role key is required for:

- Bypassing RLS for administrative operations
- Bulk data operations
- Database maintenance tasks

This is a **security improvement** because:
1. The service role key is kept out of the repository
2. It's only used in controlled server/CLI contexts
3. It's never exposed to the browser or client-side code
