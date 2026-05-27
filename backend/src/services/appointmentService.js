import { supabase } from '../config/supabase.js';

export const appointmentService = {
  /**
   * Fetch all appointments (admin view)
   */
  async getAll() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Fetch a single appointment by ID
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Generate next sequential reference ID (e.g. PMH-25001)
   */
  async generateRefId() {
    const { data, error } = await supabase
      .from('appointments')
      .select('ref_id')
      .order('ref_id', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching latest reference ID:', error);
    }

    let nextNumber = 25001;

    if (data && data.ref_id) {
      const match = data.ref_id.match(/PMH-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    return `PMH-${nextNumber}`;
  },

  /**
   * Create an appointment booking
   */
  async create(apt) {
    const ref = await this.generateRefId();

    const payload = {
      ref_id: ref,
      patient_name: apt.patient || apt.name,
      phone: apt.phone,
      email: apt.email || null,
      age: parseInt(apt.age || 0, 10),
      gender: apt.gender || 'Male',
      dept_name: apt.dept,
      doctor_name: apt.doctor || 'No preference',
      appointment_date: apt.date,
      time_slot: apt.time,
      visit_type: apt.visit || apt.reason || 'OP',
      message: apt.message || null,
      source: apt.source || 'website',
      status: apt.status || 'Pending'
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    // Return mapped object matching frontend expectation
    return {
      _id: data.id,
      id: data.id,
      ref: data.ref_id,
      patient: data.patient_name,
      phone: data.phone,
      email: data.email,
      age: data.age,
      gender: data.gender,
      dept: data.dept_name,
      doctor: data.doctor_name,
      date: data.appointment_date,
      time: data.time_slot,
      reason: data.visit_type,
      message: data.message,
      source: data.source,
      status: data.status
    };
  },

  /**
   * Update appointment details (e.g. status)
   */
  async update(id, apt) {
    const payload = {
      patient_name: apt.patient || apt.name,
      phone: apt.phone,
      email: apt.email,
      age: apt.age ? parseInt(apt.age, 10) : undefined,
      gender: apt.gender,
      dept_name: apt.dept,
      doctor_name: apt.doctor,
      appointment_date: apt.date,
      time_slot: apt.time,
      visit_type: apt.visit || apt.reason,
      message: apt.message,
      status: apt.status
    };

    // Filter out undefined keys to prevent updating them
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('appointments')
      .update(payload)
      // Accept either UUID (id) or ref_id (ref)
      .or(`id.eq.${id},ref_id.eq.${id}`)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      _id: data.id,
      id: data.id,
      ref: data.ref_id,
      patient: data.patient_name,
      phone: data.phone,
      email: data.email,
      age: data.age,
      gender: data.gender,
      dept: data.dept_name,
      doctor: data.doctor_name,
      date: data.appointment_date,
      time: data.time_slot,
      reason: data.visit_type,
      message: data.message,
      source: data.source,
      status: data.status
    };
  },

  /**
   * Delete appointment record
   */
  async delete(id) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .or(`id.eq.${id},ref_id.eq.${id}`);

    if (error) throw error;
    return true;
  },

  /**
   * Calculate live metrics summary
   */
  async getStats() {
    const { data, error } = await supabase
      .from('appointments')
      .select('status, appointment_date');

    if (error) throw error;

    const appointments = data || [];
    const todayDateStr = new Date().toISOString().split('T')[0];

    const stats = {
      total: appointments.length,
      today: appointments.filter(a => a.appointment_date === todayDateStr).length,
      pending: appointments.filter(a => a.status === 'Pending').length,
      emergency: appointments.filter(a => a.status === 'Emergency').length,
      confirmed: appointments.filter(a => a.status === 'Confirmed').length,
      completed: appointments.filter(a => a.status === 'Completed').length,
      cancelled: appointments.filter(a => a.status === 'Cancelled').length
    };

    return stats;
  }
};
