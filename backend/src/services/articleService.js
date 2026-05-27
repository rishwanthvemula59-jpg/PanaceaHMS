import { supabase } from '../config/supabase.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export const articleService = {
  /**
   * Fetch all articles
   */
  async getAll() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Fetch a single article by slug
   */
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Create an article
   */
  async create(art) {
    const slug = art.slug || slugify(art.title);
    const payload = {
      slug,
      category: art.category,
      title: art.title,
      excerpt: art.excerpt,
      published_date: art.date || art.published_date || new Date().toISOString().split('T')[0],
      reading_time: art.read || art.reading_time || '5 min read'
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an article
   */
  async update(id, art) {
    const payload = {
      category: art.category,
      title: art.title,
      excerpt: art.excerpt,
      published_date: art.date || art.published_date,
      reading_time: art.read || art.reading_time
    };

    // Filter out undefined keys to prevent updating them
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('articles')
      .update(payload)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Delete an article by ID
   */
  async delete(id) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
