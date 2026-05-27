import { supabase } from '../config/supabase.js';

export const settingsService = {
  /**
   * Fetch the single hospital settings record
   */
  async get() {
    const { data, error } = await supabase
      .from('hospital_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      // Create and return default if none exists yet
      const defaultSettings = {
        name: 'Panacea Meridian Hospitals',
        tagline: 'Your Health, Our Mission.',
        emergency_phone: '+91 7337447446',
        contact_phone: '08455-241777',
        email: 'info@panaceameridianhospitals.com',
        address: 'Opp to Beeramguda Kaman, RC Puram, BHEL – 502032'
      };
      
      const { data: inserted, error: insertError } = await supabase
        .from('hospital_settings')
        .insert([defaultSettings])
        .select()
        .single();
        
      if (insertError) throw insertError;
      return inserted;
    }

    return data;
  },

  /**
   * Update the hospital settings record
   */
  async update(settings) {
    // Check if a settings record exists to update, otherwise insert
    const current = await this.get();
    
    const payload = {
      name: settings.name,
      tagline: settings.tagline,
      emergency_phone: settings.emergency || settings.emergency_phone,
      contact_phone: settings.phone || settings.contact_phone,
      email: settings.email,
      address: settings.address,
      updated_at: new Date().toISOString()
    };

    // Filter out undefined keys to prevent updating them
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('hospital_settings')
      .update(payload)
      .eq('id', current.id)
      .select()
      .single();

    if (error) throw error;
    
    // Map standard database names back to layout expectation format
    return {
      id: data.id,
      name: data.name,
      tagline: data.tagline,
      emergency: data.emergency_phone,
      phone: data.contact_phone,
      email: data.email,
      address: data.address
    };
  }
};
