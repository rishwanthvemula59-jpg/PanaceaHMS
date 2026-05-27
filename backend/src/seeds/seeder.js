import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { supabase } from '../config/supabase.js';
import { DEPARTMENTS, DOCTORS, FEES, ARTICLES, APPOINTMENTS_SEED, ENQUIRIES_SEED } from './seedData.js';

dotenv.config();

async function runSeeder() {
  console.log('--- HMS Database Seeder Started ---');

  try {
    // 1. CLEAN EXISTING DATA
    console.log('Cleaning existing tables...');
    
    // Clear child tables first to avoid key constraints
    await supabase.from('doctors').delete().neq('name', '');
    await supabase.from('appointments').delete().neq('patient_name', '');
    await supabase.from('enquiries').delete().neq('name', '');
    await supabase.from('departments').delete().neq('name', '');
    await supabase.from('fees').delete().neq('name', '');
    await supabase.from('articles').delete().neq('title', '');
    await supabase.from('hospital_settings').delete().neq('name', '');
    await supabase.from('admins').delete().neq('email', '');
    
    console.log('Tables cleaned successfully.');

    // 2. SEED DEFAULT ADMIN
    console.log('Seeding default administrator account...');
    const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@panaceameridian.com').toLowerCase();
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const { error: adminError } = await supabase
      .from('admins')
      .insert([{ email: adminEmail, password_hash: passwordHash }]);

    if (adminError) throw adminError;
    console.log(`Default administrator seeded successfully (${adminEmail} / ${adminPassword}).`);

    // 3. SEED DEPARTMENTS
    console.log('Seeding departments...');
    const mappedDepts = DEPARTMENTS.map(d => ({
      slug: d.slug,
      name: d.name,
      icon: d.icon,
      description: d.desc,
      doctors_count: d.doctors,
      featured: d.featured || false
    }));

    const { error: deptError } = await supabase
      .from('departments')
      .insert(mappedDepts);

    if (deptError) throw deptError;
    console.log(`Seeded ${mappedDepts.length} departments.`);

    // 4. SEED DOCTORS
    console.log('Seeding doctors...');
    const mappedDocs = DOCTORS.map(d => ({
      name: d.name,
      dept_name: d.dept || 'General Medicine',
      dept_slug: d.deptSlug,
      qual: d.qual,
      spec: d.spec,
      timing: d.timing,
      avail: d.avail || 'available',
      fee: d.fee,
      photo_url: null
    }));

    const { error: docError } = await supabase
      .from('doctors')
      .insert(mappedDocs);

    if (docError) throw docError;
    console.log(`Seeded ${mappedDocs.length} doctors.`);

    // 5. SEED FEES
    console.log('Seeding fee list...');
    const { error: feeError } = await supabase
      .from('fees')
      .insert(FEES);

    if (feeError) throw feeError;
    console.log(`Seeded ${FEES.length} service fee items.`);

    // 6. SEED ARTICLES
    console.log('Seeding health articles...');
    const mappedArticles = ARTICLES.map(a => ({
      slug: a.slug,
      category: a.category,
      title: a.title,
      excerpt: a.excerpt,
      published_date: a.date,
      reading_time: a.read
    }));

    const { error: articleError } = await supabase
      .from('articles')
      .insert(mappedArticles);

    if (articleError) throw articleError;
    console.log(`Seeded ${mappedArticles.length} blog articles.`);

    // 7. SEED APPOINTMENTS
    console.log('Seeding demo appointments...');
    const mappedAppointments = APPOINTMENTS_SEED.map(a => ({
      ref_id: a.ref,
      patient_name: a.patient,
      phone: a.phone,
      email: null,
      age: 32,
      gender: 'Male',
      dept_name: a.dept,
      doctor_name: a.doctor,
      appointment_date: a.date,
      time_slot: a.time,
      visit_type: a.visit,
      message: 'Initial seed booking record.',
      source: 'reception',
      status: a.status
    }));

    const { error: aptError } = await supabase
      .from('appointments')
      .insert(mappedAppointments);

    if (aptError) throw aptError;
    console.log(`Seeded ${mappedAppointments.length} demo appointments.`);

    // 8. SEED ENQUIRIES
    console.log('Seeding demo enquiries...');
    const mappedEnquiries = ENQUIRIES_SEED.map(e => ({
      name: e.name,
      phone: e.phone,
      email: e.email,
      subject: e.subject,
      message: e.message,
      status: e.status || 'New',
      date_submitted: e.date
    }));

    const { error: enqError } = await supabase
      .from('enquiries')
      .insert(mappedEnquiries);

    if (enqError) throw enqError;
    console.log(`Seeded ${mappedEnquiries.length} demo enquiries.`);

    // 9. SEED DEFAULT SETTINGS
    console.log('Seeding default settings profile...');
    const defaultSettings = {
      name: 'Panacea Meridian Hospitals',
      tagline: 'Your Health, Our Mission.',
      emergency_phone: '+91 7337447446',
      contact_phone: '08455-241777',
      email: 'info@panaceameridianhospitals.com',
      address: 'Opp to Beeramguda Kaman, RC Puram, BHEL – 502032'
    };

    const { error: settingsError } = await supabase
      .from('hospital_settings')
      .insert([defaultSettings]);

    if (settingsError) throw settingsError;
    console.log('Hospital settings profile seeded successfully.');

    console.log('--- HMS Seeder Completed Successfully ---');
    process.exit(0);
  } catch (error) {
    console.error('CRITICAL: Database Seeding Failed.', error);
    process.exit(1);
  }
}

runSeeder();
