import { supabase } from '../config/supabase.js';

export const feeService = {
  /**
   * Fetch all fees
   */
  async getAll() {
    const { data, error } = await supabase
      .from('fees')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Add a new fee item
   */
  async create(fee) {
    const payload = {
      category: fee.category,
      name: fee.name,
      price: fee.price
    };

    const { data, error } = await supabase
      .from('fees')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing fee item
   */
  async update(id, fee) {
    const payload = {
      category: fee.category,
      name: fee.name,
      price: fee.price
    };

    // Filter out undefined keys to prevent updating them
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('fees')
      .update(payload)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a fee item by ID
   */
  async delete(id) {
    const { error } = await supabase
      .from('fees')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
