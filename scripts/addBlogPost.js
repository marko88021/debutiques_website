import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function addBlogPost() {
  try {
    // Blog post data
    const title = "How to Reduce Furniture Photoshoot Costs Without Compromising on Quality";
    const slug = generateSlug(title);
    const excerpt = "Furniture photoshoots are often time-consuming, expensive, and inflexible. Learn how 3D rendering and CGI can help furniture brands cut costs while maintaining high-quality visuals for their products.";
    
    const content = `Furniture photoshoots are often time-consuming, expensive, and inflexible. For brands working on tight schedules and budgets — especially during product launches or seasonal campaigns — the traditional photoshoot process can be a serious bottleneck.

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

If you're a furniture brand looking to cut costs without compromising on quality — this is the smartest, most flexible approach.`;

    // First, let's check if we have a suitable category
    console.log('Checking existing categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('blog_categories')
      .select('*');
    
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return;
    }
    
    console.log('Existing categories:', categories);
    
    // Find or create a suitable category
    let categoryId = null;
    const serviceCategory = categories.find(cat => 
      cat.name.toLowerCase().includes('service') || 
      cat.name.toLowerCase().includes('tip') ||
      cat.name.toLowerCase().includes('guide')
    );
    
    if (serviceCategory) {
      categoryId = serviceCategory.id;
      console.log('Using existing category:', serviceCategory.name);
    } else {
      // Create a new category
      console.log('Creating new category: Tips & Guides');
      const { data: newCategory, error: categoryError } = await supabase
        .from('blog_categories')
        .insert({
          name: 'Tips & Guides',
          slug: 'tips-guides',
          description: 'Helpful tips and guides for furniture brands'
        })
        .select()
        .single();
      
      if (categoryError) {
        console.error('Error creating category:', categoryError);
        return;
      }
      
      categoryId = newCategory.id;
      console.log('Created new category:', newCategory);
    }
    
    // Insert the blog post
    console.log('Adding blog post...');
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        content,
        excerpt,
        author: 'Debutiques Team',
        status: 'published',
        category_id: categoryId,
        publish_date: new Date().toISOString(),
        featured_image: null // We'll add this later
      })
      .select()
      .single();
    
    if (postError) {
      console.error('Error creating blog post:', postError);
      return;
    }
    
    console.log('Blog post created successfully!');
    console.log('Post ID:', post.id);
    console.log('Post slug:', post.slug);
    console.log('View at: https://lightvity.com/blog/' + post.slug);
    
    // Add some relevant tags
    console.log('Adding tags...');
    const tagNames = ['3D Rendering', 'Photography', 'Cost Reduction', 'CGI'];
    
    for (const tagName of tagNames) {
      const tagSlug = generateSlug(tagName);
      
      // Insert or get existing tag
      const { data: existingTag } = await supabase
        .from('blog_tags')
        .select('id')
        .eq('slug', tagSlug)
        .single();
      
      let tagId;
      if (existingTag) {
        tagId = existingTag.id;
      } else {
        const { data: newTag, error: tagError } = await supabase
          .from('blog_tags')
          .insert({
            name: tagName,
            slug: tagSlug
          })
          .select('id')
          .single();
        
        if (tagError) {
          console.error('Error creating tag:', tagError);
          continue;
        }
        
        tagId = newTag.id;
      }
      
      // Link tag to post
      const { error: linkError } = await supabase
        .from('blog_post_tags')
        .insert({
          post_id: post.id,
          tag_id: tagId
        });
      
      if (linkError) {
        console.error('Error linking tag:', linkError);
      } else {
        console.log('Added tag:', tagName);
      }
    }
    
    console.log('\n✅ Blog post added successfully!');
    console.log('🌐 View it at: https://lightvity.com/blog/' + post.slug);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

addBlogPost();