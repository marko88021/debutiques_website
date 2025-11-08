export interface BlogPost {
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
  category: BlogCategory | null;
  tags: BlogTag[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

// Static blog data
const blogPosts = [
  {
    title: "How to Reduce Furniture Photoshoot Costs Without Compromising on Quality",
    slug: "reduce-furniture-photoshoot-costs",
    excerpt: "Furniture photoshoots are often time-consuming, expensive, and inflexible. Learn how 3D rendering and CGI can help furniture brands cut costs while maintaining high-quality visuals for their products.",
    author: "Debutiques Team",
    publishDate: "2025-11-08",
    category: "Tips & Guides",
    tags: ["3D Rendering", "Photography", "Cost Reduction", "CGI"],
    featuredImage: null,
    content: `Furniture photoshoots are often time-consuming, expensive, and inflexible. For brands working on tight schedules and budgets — especially during product launches or seasonal campaigns — the traditional photoshoot process can be a serious bottleneck.

At Debutiques, we help furniture brands completely rethink the way they produce product visuals by replacing or supporting photography with high-end CGI and 3D rendering.

## Why Traditional Photoshoots Get Expensive Fast

**Logistics:** Booking studios, transporting products, styling sets — all of this adds up quickly.

**Revisions:** Need to change a color or background after the shoot? You'll likely have to reshoot the entire scene.

**Time pressure:** Shoots often need to be locked in weeks in advance. Not ideal when you're launching multiple new products.

## A Better Approach: Photorealistic 3D Renders

We create realistic 3D product images and environments — without the need for a physical shoot. These are tailored to your brand, easy to revise, and ready in days, not weeks.

You can use CGI to:

- Show your furniture in different colors or finishes
- Place your product in custom-designed interiors  
- Create consistent lighting and styling across your whole collection
- Generate images for your website, social, catalog, or press with full control

## What Types of Visuals We Offer

**Studio Renders:** Simple white or colored background for e-commerce.

**Interior Renders:** Custom-designed spaces styled to match your brand.

**360° Spinning Animations:** Ideal for online product pages.

**Assembly Animations:** Show how your product works or comes together.

**Social Clips:** Short, minimal animations designed for campaigns.

## Cut Costs, Gain Control

With 3D rendering, there's no need to ship products or book a studio. You save money, but also gain flexibility: update colors, change angles, or reuse environments any time you need.

If you're a furniture brand looking to cut costs without compromising on quality — this is the smartest, most flexible approach.`
  }
];

const categories = [
  { id: '1', name: 'Tips & Guides', slug: 'tips-guides', description: 'Helpful tips and guides for furniture brands', created_at: '2025-11-08' }
];

const tags = [
  { id: '1', name: '3D Rendering', slug: '3d-rendering', created_at: '2025-11-08' },
  { id: '2', name: 'Photography', slug: 'photography', created_at: '2025-11-08' },
  { id: '3', name: 'Cost Reduction', slug: 'cost-reduction', created_at: '2025-11-08' },
  { id: '4', name: 'CGI', slug: 'cgi', created_at: '2025-11-08' }
];

// Helper functions to convert static data to BlogPost format
function mapToBlogPost(post: any): BlogPost {
  const category = categories.find(c => c.name === post.category) || null;
  const postTags = post.tags.map((tagName: string) => 
    tags.find(t => t.name === tagName)
  ).filter(Boolean);

  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    featured_image: post.featuredImage,
    author: post.author,
    publish_date: post.publishDate,
    status: 'published' as const,
    category_id: category?.id || null,
    created_at: post.publishDate,
    updated_at: post.publishDate,
    category,
    tags: postTags
  };
}

export async function getAllPosts(limit?: number): Promise<BlogPost[]> {
  const posts = blogPosts.map(mapToBlogPost);
  return limit ? posts.slice(0, limit) : posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find(p => p.slug === slug);
  return post ? mapToBlogPost(post) : null;
}

export async function getPostsByCategory(categorySlug: string, limit?: number): Promise<BlogPost[]> {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  
  const posts = blogPosts
    .filter(p => p.category === category.name)
    .map(mapToBlogPost);
  
  return limit ? posts.slice(0, limit) : posts;
}

export async function getPostsByTag(tagSlug: string, limit?: number): Promise<BlogPost[]> {
  const tag = tags.find(t => t.slug === tagSlug);
  if (!tag) return [];
  
  const posts = blogPosts
    .filter(p => p.tags.includes(tag.name))
    .map(mapToBlogPost);
  
  return limit ? posts.slice(0, limit) : posts;
}

export async function searchPosts(searchTerm: string): Promise<BlogPost[]> {
  const term = searchTerm.toLowerCase();
  const posts = blogPosts
    .filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term) ||
      p.excerpt.toLowerCase().includes(term)
    )
    .map(mapToBlogPost);
  
  return posts;
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  return categories;
}

export async function getAllTags(): Promise<BlogTag[]> {
  return tags;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}