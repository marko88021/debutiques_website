import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock auth object for when Supabase is not configured
const mockAuth = {
  signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
  signOut: async () => ({ error: new Error('Supabase not configured') }),
  getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
  onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
};

// Create a mock from method for database operations
const mockFrom = () => ({
  select: () => ({ data: [], error: null }),
  insert: () => ({ data: null, error: null }),
  update: () => ({ data: null, error: null }),
  delete: () => ({ data: null, error: null }),
  eq: function() { return this; },
  maybeSingle: () => ({ data: null, error: null })
});

let supabase: any;

// Only initialize Supabase if credentials are available
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client that won't crash if missing credentials
  console.warn('Supabase credentials not found. Blog and admin features will be disabled.');
  supabase = {
    auth: mockAuth,
    from: mockFrom,
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
        list: async () => ({ data: [], error: null }),
        remove: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
}

export { supabase };

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          featured_image: string | null;
          author: string;
          publish_date: string;
          status: 'draft' | 'published';
          category_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          featured_image?: string | null;
          author: string;
          publish_date?: string;
          status?: 'draft' | 'published';
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string;
          featured_image?: string | null;
          author?: string;
          publish_date?: string;
          status?: 'draft' | 'published';
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      blog_tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
      };
      blog_post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
