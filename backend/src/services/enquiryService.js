import { supabase } from '../config/supabase.js';

export const enquiryService = {
  /**
   * Fetch all enquiries
   */
  async getAll() {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Submit an enquiry
   */
  async create(enq) {
    const payload = {
      name: enq.name,
      phone: enq.phone,
      email: enq.email || null,
      subject: enq.subject,
      message: enq.message,
      status: enq.status || 'New',
      date_submitted: enq.date || new Date().toISOString().split('T')[0]
    };

    const { data, error } = await supabase
      .from('enquiries')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update the status of an enquiry (New, Contacted, Closed)
   */
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Delete an enquiry record
   */
  async delete(id) {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
