import { supabase } from '../config/supabase.js';

export const doctorService = {
  /**
   * Fetch all doctors
   */
  async getAll() {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    // Map DB fields to camelCase frontend expectations
    return (data || []).map(d => ({
      id: d.id,
      docId: d.id,
      name: d.name,
      dept: d.dept_name,
      deptSlug: d.dept_slug,
      qual: d.qual,
      spec: d.spec,
      timing: d.timing,
      avail: d.avail,
      fee: d.fee,
      photo: d.photo_url
    }));
  },

  /**
   * Fetch a single doctor by ID
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      docId: data.id,
      name: data.name,
      dept: data.dept_name,
      deptSlug: data.dept_slug,
      qual: data.qual,
      spec: data.spec,
      timing: data.timing,
      avail: data.avail,
      fee: data.fee,
      photo: data.photo_url
    };
  },

  /**
   * Resolve department slug based on department name
   */
  async resolveDeptSlug(deptName) {
    if (!deptName) return null;
    const { data, error } = await supabase
      .from('departments')
      .select('slug')
      .eq('name', deptName)
      .maybeSingle();

    if (error) return null;
    return data ? data.slug : null;
  },

  /**
   * Create a new doctor record
   */
  async create(doc) {
    const deptSlug = doc.deptSlug || await this.resolveDeptSlug(doc.dept);
    const payload = {
      name: doc.name,
      dept_name: doc.dept,
      dept_slug: deptSlug,
      qual: doc.qual || '',
      spec: doc.spec,
      timing: doc.timing || 'On Call',
      avail: doc.avail || 'available',
      fee: parseFloat(doc.fee),
      photo_url: doc.photo || doc.photo_url || null
    };

    const { data, error } = await supabase
      .from('doctors')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    // After adding/deleting a doctor, increment department doctors_count
    if (deptSlug) {
      await supabase.rpc('increment_department_doctors', { dept_slug: deptSlug });
      // Fallback in case RPC is not defined: update count via service if needed
    }

    return data;
  },

  /**
   * Update doctor details
   */
  async update(id, doc) {
    const oldDoc = await this.getById(id);
    const deptSlug = doc.deptSlug || (doc.dept ? await this.resolveDeptSlug(doc.dept) : undefined);
    const payload = {
      name: doc.name,
      dept_name: doc.dept,
      dept_slug: deptSlug,
      qual: doc.qual,
      spec: doc.spec,
      timing: doc.timing,
      avail: doc.avail,
      fee: doc.fee ? parseFloat(doc.fee) : undefined,
      photo_url: doc.photo || doc.photo_url
    };

    // Filter out undefined keys to prevent updating them
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('doctors')
      .update(payload)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;

    // Sync department doctors counts if the department has changed
    if (data && oldDoc && deptSlug && oldDoc.deptSlug !== deptSlug) {
      if (oldDoc.deptSlug) {
        await supabase.rpc('decrement_department_doctors', { dept_slug: oldDoc.deptSlug });
      }
      await supabase.rpc('increment_department_doctors', { dept_slug: deptSlug });
    }

    return data;
  },

  /**
   * Delete a doctor record
   */
  async delete(id) {
    // Get doc details first to know the dept_slug for updating counts
    const doc = await this.getById(id);

    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Dec doctors count if slug exists
    if (doc && doc.deptSlug) {
      await supabase.rpc('decrement_department_doctors', { dept_slug: doc.deptSlug });
    }
    return true;
  }
};
