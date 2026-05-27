import { supabase } from '../config/supabase.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export const departmentService = {
  /**
   * Fetch all departments
   */
  async getAll() {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return (data || []).map(d => ({
      ...d,
      doctors: d.doctors_count || 0,
      desc: d.description || ''
    }));
  },

  /**
   * Fetch a single department by slug
   */
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data ? {
      ...data,
      doctors: data.doctors_count || 0,
      desc: data.description || ''
    } : null;
  },

  /**
   * Create a new department
   */
  async create(dept) {
    const slug = dept.slug || slugify(dept.name);
    const payload = {
      slug,
      name: dept.name,
      icon: dept.icon || 'medicine',
      description: dept.desc || dept.description || '',
      doctors_count: parseInt(dept.doctors || dept.doctors_count || 0, 10),
      featured: dept.featured === true || dept.featured === 'true'
    };

    const { data, error } = await supabase
      .from('departments')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data ? {
      ...data,
      doctors: data.doctors_count || 0,
      desc: data.description || ''
    } : null;
  },

  /**
   * Update department details
   */
  async update(slug, dept) {
    const payload = {
      name: dept.name,
      icon: dept.icon,
      description: dept.desc || dept.description,
      doctors_count: dept.doctors !== undefined ? parseInt(dept.doctors, 10) : undefined,
      featured: dept.featured !== undefined ? (dept.featured === true || dept.featured === 'true') : undefined
    };

    // Filter out undefined keys to prevent updating them
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('departments')
      .update(payload)
      .eq('slug', slug)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data ? {
      ...data,
      doctors: data.doctors_count || 0,
      desc: data.description || ''
    } : null;
  },

  /**
   * Delete a department by slug
   */
  async delete(slug) {
    const { error } = await supabase
      .from('departments')
      .delete()
      .eq('slug', slug);

    if (error) throw error;
    return true;
  }
};
