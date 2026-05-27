import { supabase } from '../config/supabase.js';

export const adminService = {
  /**
   * Find admin record by email address
   */
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Register a new admin account
   */
  async createAdmin(email, passwordHash) {
    const { data, error } = await supabase
      .from('admins')
      .insert([{ email: email.toLowerCase(), password_hash: passwordHash }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update the password of an administrator account
   */
  async updatePassword(email, passwordHash) {
    const { data, error } = await supabase
      .from('admins')
      .update({ password_hash: passwordHash })
      .eq('email', email.toLowerCase())
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};
