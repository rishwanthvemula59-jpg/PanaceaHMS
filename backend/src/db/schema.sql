-- HMS Database Schema for Supabase (PostgreSQL)

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
  slug VARCHAR(100) PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  icon VARCHAR(100) DEFAULT 'medicine',
  description TEXT,
  doctors_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on featured departments for public home page queries
CREATE INDEX IF NOT EXISTS idx_departments_featured ON departments(featured);

-- 2. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  dept_name VARCHAR(150) NOT NULL,
  dept_slug VARCHAR(100) REFERENCES departments(slug) ON UPDATE CASCADE ON DELETE SET NULL,
  qual VARCHAR(150),
  spec VARCHAR(200) NOT NULL,
  timing VARCHAR(200),
  avail VARCHAR(50) DEFAULT 'available' CHECK (avail IN ('available', 'oncall', 'busy', 'onleave')),
  fee NUMERIC(10, 2) NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on dept_slug for quick lookup
CREATE INDEX IF NOT EXISTS idx_doctors_dept_slug ON doctors(dept_slug);

-- 3. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ref_id VARCHAR(50) NOT NULL UNIQUE,
  patient_name VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(150),
  age INT NOT NULL,
  gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
  dept_name VARCHAR(150) NOT NULL,
  doctor_name VARCHAR(200) NOT NULL,
  appointment_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  visit_type VARCHAR(100) DEFAULT 'OP',
  message TEXT,
  source VARCHAR(50) DEFAULT 'website',
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled', 'Emergency')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes on ref_id, appointment_date, and status for dashboard quick views and search operations
CREATE INDEX IF NOT EXISTS idx_appointments_ref_id ON appointments(ref_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- 4. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(150),
  subject VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  date_submitted DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. FEES TABLE
CREATE TABLE IF NOT EXISTS fees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(150) NOT NULL,
  name VARCHAR(200) NOT NULL,
  price VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on fee category for list ordering
CREATE INDEX IF NOT EXISTS idx_fees_category ON fees(category);

-- 6. ARTICLES (BLOG) TABLE
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(250) NOT NULL,
  excerpt TEXT NOT NULL,
  published_date DATE DEFAULT CURRENT_DATE,
  reading_time VARCHAR(50) DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. HOSPITAL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS hospital_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL DEFAULT 'Panacea Meridian Hospitals',
  tagline VARCHAR(200) DEFAULT 'Your Health, Our Mission.',
  emergency_phone VARCHAR(50),
  contact_phone VARCHAR(50),
  email VARCHAR(150),
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. DATABASE RPC FUNCTIONS FOR COUNTING DOCTORS IN DEPARTMENTS
CREATE OR REPLACE FUNCTION increment_department_doctors(dept_slug VARCHAR)
RETURNS VOID AS $$
BEGIN
  UPDATE departments
  SET doctors_count = doctors_count + 1
  WHERE slug = dept_slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_department_doctors(dept_slug VARCHAR)
RETURNS VOID AS $$
BEGIN
  UPDATE departments
  SET doctors_count = GREATEST(doctors_count - 1, 0)
  WHERE slug = dept_slug;
END;
$$ LANGUAGE plpgsql;
