import React from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { DeptIcon, UI } from './icons.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, Modal } from './pages-admin.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';


// Hospital data — Panacea Meridian Hospitals
export const HOSPITAL = {
  name: 'Panacea Meridian Hospitals',
  short: 'Panacea Meridian',
  tagline: 'Your Health, Our Mission.',
  unit: 'A Unit of Dhruva Vijaya Health Care Services',
  location: 'Beeramguda',
  address: 'Opp to Beeramguda Kaman, RC Puram, BHEL – 502032',
  phone: '08455-241777',
  appointments: ['+91 82973 75050', '+91 78937 57770'],
  emergency: '+91 7337447446',
  email: 'info@panaceameridianhospitals.com',
  maps: 'https://maps.app.goo.gl/1HfmJKYhZCKqTAQ68',
  hours: '24 / 7',
};

export const DEPARTMENTS = [
  { slug: 'neuro-surgery', name: 'Neuro Surgery', icon: 'brain', desc: 'Advanced surgical care for complex brain, spine and nerve disorders.', doctors: 1, featured: true },
  { slug: 'poly-trauma', name: 'Poly Trauma', icon: 'trauma', desc: 'Expert emergency care for multiple and complex traumatic injuries with rapid response.', doctors: 2, featured: true },
  { slug: 'general-medicine', name: 'General Medicine', icon: 'medicine', desc: 'Comprehensive diagnosis and treatment for a wide range of health conditions.', doctors: 2, featured: true },
  { slug: 'urology', name: 'Urology', icon: 'kidney', desc: 'Specialised care for urinary tract and male reproductive health.', doctors: 2 },
  { slug: 'cardiology', name: 'Cardiology', icon: 'heart', desc: 'Comprehensive heart care, from diagnosis to advanced interventional treatments.', doctors: 1, featured: true },
  { slug: 'orthopaedics', name: 'Orthopaedics & Joint Replacement', icon: 'bone', desc: 'Joint replacement, fracture care and sports-injury rehabilitation.', doctors: 1 },
  { slug: 'general-surgery', name: 'General Surgery', icon: 'scalpel', desc: 'General and laparoscopic surgical care across abdomen, GI and soft tissue.', doctors: 1 },
  { slug: 'paediatrics', name: 'Paediatrics', icon: 'baby', desc: 'Newborn, infant and adolescent care under one specialist team.', doctors: 1 },
  { slug: 'pulmonology', name: 'Pulmonology', icon: 'lung', desc: 'Respiratory medicine, asthma, COPD and critical pulmonary care.', doctors: 1 },
  { slug: 'psychiatry', name: 'Psychiatry', icon: 'mind', desc: 'Mental health, counselling and behavioural therapy in a supportive setting.', doctors: 0 },
  { slug: 'ent-surgery', name: 'ENT Surgery', icon: 'ent', desc: 'Ear, nose and throat — both medical and surgical management.', doctors: 1 },
  { slug: 'physiotherapy', name: 'Physiotherapy', icon: 'physio', desc: 'Post-surgical rehab, sports injury and chronic pain management.', doctors: 0 },
  { slug: 'gynaecology', name: 'Gynaecology & Obstetrics', icon: 'female', desc: 'Comprehensive care for women’s health, pregnancy and childbirth.', doctors: 1, featured: true },
  { slug: 'plastic-surgery', name: 'Plastic & Cosmetic Surgery', icon: 'plastic', desc: 'Restoring form and function through advanced reconstructive techniques.', doctors: 1, featured: true },
  { slug: 'anaesthesiology', name: 'Anaesthesiology', icon: 'anesthesia', desc: 'Safe peri-operative and pain-management anaesthesia for every surgery.', doctors: 2 },
  { slug: 'radiology', name: 'Radiology', icon: 'xray', desc: 'CT, X-Ray and ultrasound imaging with consultant radiologist reads.', doctors: 1 },
  { slug: 'diabetology', name: 'Diabetology', icon: 'glucose', desc: 'Endocrine and diabetes care with lifestyle counselling.', doctors: 0 },
  { slug: 'dietetics', name: 'Dietetics & Nutrition', icon: 'apple', desc: 'Clinical nutrition support across in-patient and out-patient care.', doctors: 0 },
  { slug: 'bio-chemistry', name: 'Bio-Chemistry', icon: 'flask', desc: 'Laboratory bio-chemistry profiling and routine panels.', doctors: 0 },
  { slug: 'pathology', name: 'Clinical Pathology', icon: 'microscope', desc: 'On-site clinical pathology with rapid turn-around reporting.', doctors: 1 },
  { slug: 'haematology', name: 'Haematology', icon: 'blood', desc: 'Blood-disorder diagnostics, anaemia work-ups and transfusion support.', doctors: 0 },
  { slug: 'daycare', name: 'Daycare Procedures', icon: 'daycare', desc: 'Minor procedures and short-stay treatment with same-day discharge.', doctors: 0 },
  { slug: 'gastroenterology', name: 'Gastroenterology', icon: 'stomach', desc: 'GI medicine, endoscopy and liver-care from a senior consultant.', doctors: 1 },
  { slug: 'nephrology', name: 'Nephrology', icon: 'kidney', desc: 'Kidney disease management with dialysis support 24/7.', doctors: 1 },
  { slug: 'dermatology', name: 'Dermatology', icon: 'skin', desc: 'Skin, hair and cosmetic dermatology — on-call consultation.', doctors: 1 },
];

export const DOCTORS = [
  { id: 'shylakar', name: 'Dr. G. Shylakar Reddy', dept: 'Critical Care', deptSlug: 'general-medicine', qual: 'MBBS, MD', spec: 'Consultant Anaesthesiologist & Intensivist', timing: '24/7 Available', avail: 'available', fee: 800 },
  { id: 'rajashekar', name: 'Dr. G. Rajashekar Reddy', dept: 'Critical Care', deptSlug: 'general-medicine', qual: 'MBBS, MD', spec: 'Consultant Anaesthesiologist & Intensivist', timing: '24/7 Available', avail: 'available', fee: 800 },
  { id: 'pavan', name: 'Dr. Pavan Kumar', dept: 'Neuro Physician', deptSlug: 'neuro-surgery', qual: 'MD, DM (Neurology)', spec: 'Consultant Neurologist', timing: '8:30 AM – 10:00 AM', avail: 'available', fee: 800 },
  { id: 'muzhaid', name: 'Dr. Shaik Mohd. Muzhaid', dept: 'Neuro Surgery', deptSlug: 'neuro-surgery', qual: 'MBBS, MS, MCh', spec: 'Consultant Neuro Surgeon', timing: '3:00 PM – 5:00 PM', avail: 'available', fee: 1000 },
  { id: 'saikrishna', name: 'Dr. Sai Krishna C.S', dept: 'Orthopaedic', deptSlug: 'orthopaedics', qual: 'MS (Ortho), DNB (Ortho)', spec: 'Sr. Consultant Orthopaedic Surgeon', timing: '10:00 AM – 4:00 PM', avail: 'available', fee: 800 },
  { id: 'arun', name: 'Dr. Arun Kumar', dept: 'Family Physician', deptSlug: 'general-medicine', qual: 'MBBS', spec: 'Family Physician', timing: '10:00 AM – 6:00 PM', avail: 'available', fee: 500 },
  { id: 'aravind', name: 'Dr. Aravind Konduru', dept: 'General Surgery', deptSlug: 'general-surgery', qual: 'MBBS, DNB, FMAS', spec: 'General & Laparoscopic Surgeon', timing: '10:00 AM – 3:00 PM • 6:00 PM – 8:00 PM', avail: 'available', fee: 800 },
  { id: 'ramesh', name: 'Dr. Ramesh Vasa', dept: 'Nephrology', deptSlug: 'nephrology', qual: 'MBBS, MD Nephrology', spec: 'Consultant Nephrologist', timing: '4:00 PM – 6:00 PM', avail: 'available', fee: 1000 },
  { id: 'niranjan', name: 'Dr. N. Niranjan', dept: 'Pulmonology', deptSlug: 'pulmonology', qual: 'MBBS, DNB', spec: 'Consultant Pulmonologist', timing: '3:00 PM – 5:00 PM', avail: 'available', fee: 800 },
  { id: 'srikanth-ent', name: 'Dr. Srikanth Reddy', dept: 'ENT', deptSlug: 'ent-surgery', qual: 'MBBS, MS', spec: 'Oto-Rhino-Laryngology Consultant ENT Surgeon', timing: '4:00 PM – 5:00 PM', avail: 'available', fee: 800 },
  { id: 'neha', name: 'Dr. V. Neha', dept: 'Gynaecology', deptSlug: 'gynaecology', qual: 'MBBS, MS OBG', spec: 'Sr. Consultant Gynaecologist', timing: '12:00 PM – 2:00 PM', avail: 'available', fee: 800 },
  { id: 'anusha', name: 'Dr. D. Anusha', dept: 'Paediatrics', deptSlug: 'paediatrics', qual: 'MBBS, DCH, PGPN', spec: 'Consultant Paediatrician', timing: '11:00 AM – 2:00 PM', avail: 'available', fee: 700 },
  { id: 'tejaswi', name: 'Dr. P. Tejaswi', dept: 'Pathology', deptSlug: 'pathology', qual: 'MD (Path)', spec: 'Consultant Pathologist', timing: '9:00 AM – 3:00 PM', avail: 'available', fee: 500 },
  { id: 'nagachaitanya', name: 'Dr. Nagachaitanya', dept: 'Cardiology', deptSlug: 'cardiology', qual: 'MD, DM (Card)', spec: 'Sr. Interventional Cardiologist', timing: '11:00 AM – 2:00 PM', avail: 'available', fee: 1000 },
  { id: 'anand', name: 'Dr. Anand', dept: 'Urology', deptSlug: 'urology', qual: 'MBBS, MCh', spec: 'Consultant Urologist', timing: 'On Call', avail: 'oncall', fee: 1000 },
  { id: 'srikanth-derm', name: 'Dr. Srikanth', dept: 'Dermatology', deptSlug: 'dermatology', qual: 'MBBS, MD, DVL', spec: 'Consultant Dermatologist', timing: 'On Call', avail: 'oncall', fee: 700 },
  { id: 'nirjhar', name: 'Dr. (Maj) Nirjhar Ghosh', dept: 'Plastic Surgery', deptSlug: 'plastic-surgery', qual: 'MBBS, MS, MCh', spec: 'Plastic, Reconstructive, Microvascular & Aesthetic Surgeon', timing: '10:00 AM – 4:00 PM', avail: 'available', fee: 1500 },
  { id: 'priyank', name: 'Dr. Priyank Salecha', dept: 'Urology', deptSlug: 'urology', qual: 'MBBS, MS, DNB', spec: 'Consultant Urologist', timing: '2:00 PM – 6:00 PM', avail: 'available', fee: 1000 },
  { id: 'raghunath', name: 'Dr. Raghunath Babu G.V.S', dept: 'Gastroenterology', deptSlug: 'gastroenterology', qual: 'MBBS, DNB (Gen.Med), DNB (Med Gastro)', spec: 'Sr. Consultant Gastroenterologist', timing: '7:00 PM – 9:00 PM', avail: 'available', fee: 1000 },
  { id: 'kavitha', name: 'Dr. B. Kavitha Reddy', dept: 'Radiology', deptSlug: 'radiology', qual: 'MBBS, MDRD', spec: 'Consultant Radiologist', timing: '1:00 PM – 4:00 PM', avail: 'available', fee: 600 },
];

export const FACILITIES = [
  { name: '24 / 7 Emergency', icon: 'emergency', desc: 'Round-the-clock emergency room staffed by trained physicians and critical-care nurses.', tag: '24/7' },
  { name: 'Intensive Care Unit (ICU)', icon: 'icu', desc: 'AMC, ICCU, NICU & PICU beds with advanced monitoring and ventilator support.', tag: '24/7' },
  { name: 'CT Scan', icon: 'ct', desc: 'Multi-slice CT for brain, chest and whole-body imaging with rapid reporting.', tag: '24/7' },
  { name: 'Dialysis', icon: 'dialysis', desc: 'Daily haemodialysis with dedicated nephrology supervision.', tag: '24/7' },
  { name: 'Laboratory', icon: 'lab', desc: 'In-house biochemistry, pathology and microbiology with same-day reports.', tag: 'In-house' },
  { name: 'Pharmacy', icon: 'pharmacy', desc: 'On-campus pharmacy stocked with critical and lifestyle medications.', tag: '24/7' },
  { name: 'Operation Theatre', icon: 'ot', desc: 'Modular OTs equipped for general, ortho, neuro, gynaecology and plastic surgery.', tag: 'Modular' },
  { name: 'Radiology', icon: 'xray', desc: 'Digital X-Ray, ultrasound and CT under consultant radiologist supervision.', tag: 'Digital' },
  { name: 'Diagnostics', icon: 'diagnostic', desc: 'ECG, 2D Echo, TMT and Holter monitoring done on-site.', tag: 'On-site' },
  { name: 'Ambulance Support', icon: 'ambulance', desc: 'Equipped ambulances on stand-by for emergency response and inter-facility transfer.', tag: '24/7' },
];

export const FEES = {
  'Consultant Doctors Charges': [
    { name: 'OP Specialist', price: '₹500' },
    { name: 'Super Specialist', price: '₹800' },
    { name: 'IP Specialist', price: '₹1,000' },
    { name: 'Super Specialist IP', price: '₹1,500' },
  ],
  'Accommodation Charges': [
    { name: 'General Ward', price: '₹3,600' },
    { name: 'Semi Private (A/C)', price: '₹4,800' },
    { name: 'Private (A/C)', price: '₹6,000' },
    { name: 'AMC / ICCU / NICU / PICU', price: '₹12,000' },
  ],
  'Dressing Charges': [
    { name: 'Minor Dressing', price: '₹200' },
    { name: 'Medium Dressing', price: '₹600' },
    { name: 'Major Dressing', price: '₹1,000' },
  ],
  'Other Charges': [
    { name: 'Oxygen Charges (per hour)', price: '₹150' },
    { name: 'Nebulization Charges', price: '₹200' },
    { name: 'Monitor Charges', price: '₹1,200' },
    { name: 'Ventilator Charges (per day)', price: '₹9,600' },
  ],
  'Surgery Charges': [
    { name: 'General Surgery', price: '₹20,000 – ₹80,000' },
    { name: 'Ortho Surgery', price: '₹60,000 – ₹1,00,000' },
    { name: 'Neuro Surgery', price: '₹80,000 – ₹2,00,000' },
    { name: 'Gynic Surgery', price: '₹45,000 – ₹80,000' },
  ],
  'Diagnostics Charges': [
    { name: 'CBP', price: '₹300' },
    { name: 'LFT', price: '₹960' },
    { name: 'FBS / PLBS', price: '₹150' },
    { name: 'Lipid Profile', price: '₹960' },
    { name: 'CUE', price: '₹140' },
    { name: 'Surgical Profile', price: '₹4,230' },
    { name: 'ICU Profile', price: '₹6,120' },
    { name: 'X-Ray Chest', price: '₹360' },
    { name: 'CT-Brain', price: '₹2,400' },
  ],
  'Surgeon Charges': [
    { name: 'Supra Major Operation', price: '₹50,000 – ₹75,000' },
    { name: 'Major Surgery', price: '₹18,000 – ₹25,000' },
    { name: 'Minor Surgery', price: '₹10,000 – ₹15,000' },
    { name: 'Assistant Surgeon', price: '30% on Surgery' },
    { name: 'Anesthetist Charges', price: '30% on Surgery' },
    { name: 'Operation Charges', price: '40% on Surgery' },
  ],
};

export const ARTICLES = [
  {
    slug: 'radiology',
    category: 'Radiology',
    title: 'Advanced Radiology Services at Panacea Meridian Hospitals',
    excerpt: 'Precision diagnosis, compassionate care. At Panacea Meridian Hospitals, we believe that timely and accurate imaging is the foundation of effective treatment.',
    date: 'Mar 14, 2026',
    read: '5 min read',
  },
  {
    slug: 'urology',
    category: 'Urology',
    title: 'Understanding Urology: Expert Care for Your Urinary Health',
    excerpt: 'When it comes to your urinary and reproductive health, choosing the right specialist matters. Our urology team brings decades of focused experience.',
    date: 'Feb 28, 2026',
    read: '6 min read',
  },
  {
    slug: 'polytrauma',
    category: 'Poly Trauma',
    title: 'PolyTrauma Treatment You Can Trust in Beeramguda',
    excerpt: 'When every second counts, Panacea Meridian Hospitals stands at the forefront of critical care with its advanced polytrauma response protocol.',
    date: 'Feb 12, 2026',
    read: '7 min read',
  },
];

export const TESTIMONIALS = [
  { name: 'Sandhya R.', role: 'Patient, Beeramguda', text: 'The emergency team responded within minutes. My father received exceptional care in the ICU and the doctors kept us informed at every step.', rating: 5 },
  { name: 'Krishna Murthy', role: 'Family, RC Puram', text: 'Clean facility, transparent pricing and very polite staff. Dr. Sai Krishna handled my knee surgery flawlessly — I was walking the next day.', rating: 5 },
  { name: 'Anuradha S.', role: 'Patient, BHEL', text: 'Dr. Neha and the gynaec team were patient and compassionate throughout my delivery. The private rooms are very comfortable.', rating: 5 },
];

export const APPOINTMENTS_SEED = [
  { ref: 'PMH-24890', patient: 'Ravi Kumar', phone: '+91 98765 43210', dept: 'Cardiology', doctor: 'Dr. Nagachaitanya', visit: 'OP', date: '2026-05-26', time: '11:30 AM', status: 'Pending' },
  { ref: 'PMH-24891', patient: 'Sunitha M.', phone: '+91 90087 22310', dept: 'Gynaecology', doctor: 'Dr. V. Neha', visit: 'Follow-up', date: '2026-05-26', time: '12:30 PM', status: 'Confirmed' },
  { ref: 'PMH-24892', patient: 'Imran Khan', phone: '+91 99811 67542', dept: 'Orthopaedic', doctor: 'Dr. Sai Krishna C.S', visit: 'OP', date: '2026-05-26', time: '2:00 PM', status: 'Confirmed' },
  { ref: 'PMH-24893', patient: 'Aarav Reddy', phone: '+91 80012 88934', dept: 'Paediatrics', doctor: 'Dr. D. Anusha', visit: 'OP', date: '2026-05-26', time: '11:00 AM', status: 'Completed' },
  { ref: 'PMH-24894', patient: 'Lakshmi P.', phone: '+91 78934 21100', dept: 'Neuro Surgery', doctor: 'Dr. Shaik Mohd. Muzhaid', visit: 'Report Review', date: '2026-05-26', time: '3:45 PM', status: 'Pending' },
  { ref: 'PMH-24895', patient: 'Mohan Rao', phone: '+91 96120 88991', dept: 'Critical Care', doctor: 'Dr. G. Shylakar Reddy', visit: 'Emergency', date: '2026-05-26', time: '4:12 AM', status: 'Emergency' },
  { ref: 'PMH-24896', patient: 'Pooja Verma', phone: '+91 70123 55672', dept: 'Pulmonology', doctor: 'Dr. N. Niranjan', visit: 'OP', date: '2026-05-25', time: '3:30 PM', status: 'Completed' },
  { ref: 'PMH-24897', patient: 'Vikram S.', phone: '+91 99004 33287', dept: 'Urology', doctor: 'Dr. Priyank Salecha', visit: 'OP', date: '2026-05-25', time: '4:00 PM', status: 'Cancelled' },
  { ref: 'PMH-24898', patient: 'Geeta Iyer', phone: '+91 88555 12090', dept: 'ENT', doctor: 'Dr. Srikanth Reddy', visit: 'OP', date: '2026-05-25', time: '4:30 PM', status: 'Completed' },
  { ref: 'PMH-24899', patient: 'Hari Prasad', phone: '+91 96007 71250', dept: 'General Surgery', doctor: 'Dr. Aravind Konduru', visit: 'OP', date: '2026-05-24', time: '11:15 AM', status: 'Completed' },
];

export const ENQUIRIES_SEED = [
  { name: 'Rajesh T.', phone: '+91 90000 11223', email: 'rajesh.t@gmail.com', subject: 'Insurance acceptance', message: 'Wanted to know which insurance providers are accepted for cashless treatment for cardiology…', status: 'New', date: '2026-05-26' },
  { name: 'Priya Reddy', phone: '+91 78900 11243', email: 'priya.r@yahoo.in', subject: 'Maternity package', message: 'Could you share the maternity package options and accommodation options for delivery…', status: 'Contacted', date: '2026-05-25' },
  { name: 'Anil M.', phone: '+91 89710 11900', email: 'anil@finetech.in', subject: 'Corporate tie-up', message: 'We are a 200-person company in BHEL area. Interested in setting up a corporate tie-up…', status: 'New', date: '2026-05-25' },
  { name: 'Sasidhar R.', phone: '+91 96000 28811', email: 'sasi@gmail.com', subject: 'Second opinion', message: 'Looking for a second opinion on a neuro surgery recommendation made elsewhere…', status: 'Closed', date: '2026-05-23' },
];

// Photography — curated Unsplash medical / hospital photography
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
export const PHOTOS = {
  heroDoctor: U('1612349317150-e413f6a5b16d', 1100),
  heroSurgeon: U('1612531822264-04bbdeed1006', 1100),
  reception: U('1631217872822-1c2546d6b864', 1000),
  hospital: U('1586773860418-d37222d8fce3', 1000),
  surgeon: U('1666214280557-f1b5022eb634', 900),
  surgeryTeam: U('1551076805-e1869033e561', 900),
  nicu: U('1631815589968-fdb09a223b1e', 900),
  icu: U('1551601651-bc60f254d532', 900),
  ct: U('1581595220892-b0739db3ba8c', 900),
  pharmacy: U('1587854692152-cbe660dbde88', 900),
  lab: U('1532187863486-abf9dbad1b69', 900),
  ambulance: U('1597764690523-15bdcdff077e', 900),
  consult: U('1576091160550-2173dba999ef', 900),
  nurse: U('1638202993928-7267aad84c31', 900),
  team: U('1551076805-e1869033e561', 900),
  emergency: U('1631815589968-fdb09a223b1e', 900),
  ot: U('1581595220892-b0739db3ba8c', 900),
  radiology: U('1576091160550-2173dba999ef', 900),
  dialysis: U('1559757175-5700dde675bc', 900),
  // Doctor portraits — rotate through these for the 16 seed doctors
  docM1: U('1622253692010-333f2da6031d', 600),
  docM2: U('1559839734-2b71ea197ec2', 600),
  docM3: U('1582750433449-648ed127bb54', 600),
  docM4: U('1612349317150-e413f6a5b16d', 600),
  docM5: U('1559757148-5c350d0d3c56', 600),
  docM6: U('1537368910025-700350fe46c7', 600),
  docF1: U('1594824476967-48c8b964273f', 600),
  docF2: U('1573496359142-b8d87734a5a2', 600),
  docF3: U('1607990281513-2c110a25bd8c', 600),
  docF4: U('1584516150909-c43483ee7932', 600),
  docF5: U('1638202993928-7267aad84c31', 600),
  docF6: U('1551601651-bc60f254d532', 600),
  // Blog
  blogRadiology: U('1530497610245-94d3c16cda28', 900),
  blogUrology: U('1559757175-5700dde675bc', 900),
  blogTrauma: U('1551076805-e1869033e561', 900),
  // testimonial avatars
  av1: U('1544005313-94ddf0286df2', 200),
  av2: U('1500648767791-00dcc994a43e', 200),
  av3: U('1573496359142-b8d87734a5a2', 200),
  // banners
  newsletter: U('1505751172876-fa1923c5c528', 1400),
};

// Assign portrait photos to each doctor by id
const _docPhotos = {
  shylakar: PHOTOS.docM1, rajashekar: PHOTOS.docM3, pavan: PHOTOS.docM2,
  muzhaid: PHOTOS.docM4, saikrishna: PHOTOS.docM5, arun: PHOTOS.docM6,
  aravind: PHOTOS.docM1, ramesh: PHOTOS.docM2, niranjan: PHOTOS.docM3,
  'srikanth-ent': PHOTOS.docM4, neha: PHOTOS.docF1, anusha: PHOTOS.docF2,
  tejaswi: PHOTOS.docF3, nagachaitanya: PHOTOS.docM5, anand: PHOTOS.docM6,
  'srikanth-derm': PHOTOS.docM2, nirjhar: PHOTOS.docM1, priyank: PHOTOS.docM3,
  raghunath: PHOTOS.docM4, kavitha: PHOTOS.docF4,
};
DOCTORS.forEach(d => { d.photo = _docPhotos[d.id] || PHOTOS.docM1; });

// // Object.assign(window, {
  
// });