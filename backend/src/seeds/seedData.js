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
  { slug: 'dermatology', name: 'Dermatology', icon: 'skin', desc: 'Skin, hair and cosmetic dermatology — on-call consultation.', doctors: 1 }
];

export const DOCTORS = [
  { id: 'shylakar', name: 'Dr. G. Shylakar Reddy', dept: 'Clinical Pathology', deptSlug: 'pathology', qual: 'MBBS, MD', spec: 'Consultant Anaesthesiologist & Intensivist', timing: '24/7 Available', avail: 'available', fee: 800 },
  { id: 'rajashekar', name: 'Dr. G. Rajashekar Reddy', dept: 'General Medicine', deptSlug: 'general-medicine', qual: 'MBBS, MD', spec: 'Consultant Anaesthesiologist & Intensivist', timing: '24/7 Available', avail: 'available', fee: 800 },
  { id: 'pavan', name: 'Dr. Pavan Kumar', dept: 'Neuro Surgery', deptSlug: 'neuro-surgery', qual: 'MD, DM (Neurology)', spec: 'Consultant Neurologist', timing: '8:30 AM – 10:00 AM', avail: 'available', fee: 800 },
  { id: 'muzhaid', name: 'Dr. Shaik Mohd. Muzhaid', dept: 'Neuro Surgery', deptSlug: 'neuro-surgery', qual: 'MBBS, MS, MCh', spec: 'Consultant Neuro Surgeon', timing: '3:00 PM – 5:00 PM', avail: 'available', fee: 1000 },
  { id: 'saikrishna', name: 'Dr. Sai Krishna C.S', dept: 'Orthopaedic', deptSlug: 'orthopaedics', qual: 'MS (Ortho), DNB (Ortho)', spec: 'Sr. Consultant Orthopaedic Surgeon', timing: '10:00 AM – 4:00 PM', avail: 'available', fee: 800 },
  { id: 'arun', name: 'Dr. Arun Kumar', dept: 'General Medicine', deptSlug: 'general-medicine', qual: 'MBBS', spec: 'Family Physician', timing: '10:00 AM – 6:00 PM', avail: 'available', fee: 500 },
  { id: 'aravind', name: 'Dr. Aravind Konduru', dept: 'General Surgery', deptSlug: 'general-surgery', qual: 'MBBS, DNB, FMAS', spec: 'General & Laparoscopic Surgeon', timing: '10:00 AM – 3:00 PM • 6:00 PM – 8:00 PM', avail: 'available', fee: 800 },
  { id: 'ramesh', name: 'Dr. Ramesh Vasa', dept: 'Nephrology', deptSlug: 'nephrology', qual: 'MBBS, MD Nephrology', spec: 'Consultant Nephrologist', timing: '4:00 PM – 6:00 PM', avail: 'available', fee: 1000 },
  { id: 'niranjan', name: 'Dr. N. Niranjan', dept: 'Pulmonology', deptSlug: 'pulmonology', qual: 'MBBS, DNB', spec: 'Consultant Pulmonologist', timing: '3:00 PM – 5:00 PM', avail: 'available', fee: 800 },
  { id: 'srikanth-ent', name: 'Dr. Srikanth Reddy', dept: 'ENT Surgery', deptSlug: 'ent-surgery', qual: 'MBBS, MS', spec: 'Oto-Rhino-Laryngology Consultant ENT Surgeon', timing: '4:00 PM – 5:00 PM', avail: 'available', fee: 800 },
  { id: 'neha', name: 'Dr. V. Neha', dept: 'Gynaecology & Obstetrics', deptSlug: 'gynaecology', qual: 'MBBS, MS OBG', spec: 'Sr. Consultant Gynaecologist', timing: '12:00 PM – 2:00 PM', avail: 'available', fee: 800 },
  { id: 'anusha', name: 'Dr. D. Anusha', dept: 'Paediatrics', deptSlug: 'paediatrics', qual: 'MBBS, DCH, PGPN', spec: 'Consultant Paediatrician', timing: '11:00 AM – 2:00 PM', avail: 'available', fee: 700 },
  { id: 'tejaswi', name: 'Dr. P. Tejaswi', dept: 'Clinical Pathology', deptSlug: 'pathology', qual: 'MD (Path)', spec: 'Consultant Pathologist', timing: '9:00 AM – 3:00 PM', avail: 'available', fee: 500 },
  { id: 'nagachaitanya', name: 'Dr. Nagachaitanya', dept: 'Cardiology', deptSlug: 'cardiology', qual: 'MD, DM (Card)', spec: 'Sr. Interventional Cardiologist', timing: '11:00 AM – 2:00 PM', avail: 'available', fee: 1000 },
  { id: 'anand', name: 'Dr. Anand', dept: 'Urology', deptSlug: 'urology', qual: 'MBBS, MCh', spec: 'Consultant Urologist', timing: 'On Call', avail: 'oncall', fee: 1000 },
  { id: 'srikanth-derm', name: 'Dr. Srikanth', dept: 'Dermatology', deptSlug: 'dermatology', qual: 'MBBS, MD, DVL', spec: 'Consultant Dermatologist', timing: 'On Call', avail: 'oncall', fee: 700 },
  { id: 'nirjhar', name: 'Dr. (Maj) Nirjhar Ghosh', dept: 'Plastic & Cosmetic Surgery', deptSlug: 'plastic-surgery', qual: 'MBBS, MS, MCh', spec: 'Plastic, Reconstructive, Microvascular & Aesthetic Surgeon', timing: '10:00 AM – 4:00 PM', avail: 'available', fee: 1500 },
  { id: 'priyank', name: 'Dr. Priyank Salecha', dept: 'Urology', deptSlug: 'urology', qual: 'MBBS, MS, DNB', spec: 'Consultant Urologist', timing: '2:00 PM – 6:00 PM', avail: 'available', fee: 1000 },
  { id: 'raghunath', name: 'Dr. Raghunath Babu G.V.S', dept: 'Gastroenterology', deptSlug: 'gastroenterology', qual: 'MBBS, DNB (Gen.Med), DNB (Med Gastro)', spec: 'Sr. Consultant Gastroenterologist', timing: '7:00 PM – 9:00 PM', avail: 'available', fee: 1000 },
  { id: 'kavitha', name: 'Dr. B. Kavitha Reddy', dept: 'Radiology', deptSlug: 'radiology', qual: 'MBBS, MDRD', spec: 'Consultant Radiologist', timing: '1:00 PM – 4:00 PM', avail: 'available', fee: 600 }
];

export const FEES = [
  // Consultant Doctors Charges
  { category: 'Consultant Doctors Charges', name: 'OP Specialist', price: '₹500' },
  { category: 'Consultant Doctors Charges', name: 'Super Specialist', price: '₹800' },
  { category: 'Consultant Doctors Charges', name: 'IP Specialist', price: '₹1,000' },
  { category: 'Consultant Doctors Charges', name: 'Super Specialist IP', price: '₹1,500' },

  // Accommodation Charges
  { category: 'Accommodation Charges', name: 'General Ward', price: '₹3,600' },
  { category: 'Accommodation Charges', name: 'Semi Private (A/C)', price: '₹4,800' },
  { category: 'Accommodation Charges', name: 'Private (A/C)', price: '₹6,000' },
  { category: 'Accommodation Charges', name: 'AMC / ICCU / NICU / PICU', price: '₹12,000' },

  // Dressing Charges
  { category: 'Dressing Charges', name: 'Minor Dressing', price: '₹200' },
  { category: 'Dressing Charges', name: 'Medium Dressing', price: '₹600' },
  { category: 'Dressing Charges', name: 'Major Dressing', price: '₹1,000' },

  // Other Charges
  { category: 'Other Charges', name: 'Oxygen Charges (per hour)', price: '₹150' },
  { category: 'Other Charges', name: 'Nebulization Charges', price: '₹200' },
  { category: 'Other Charges', name: 'Monitor Charges', price: '₹1,200' },
  { category: 'Other Charges', name: 'Ventilator Charges (per day)', price: '₹9,600' },

  // Surgery Charges
  { category: 'Surgery Charges', name: 'General Surgery', price: '₹20,000 – ₹80,000' },
  { category: 'Surgery Charges', name: 'Ortho Surgery', price: '₹60,000 – ₹1,00,000' },
  { category: 'Surgery Charges', name: 'Neuro Surgery', price: '₹80,000 – ₹2,00,000' },
  { category: 'Surgery Charges', name: 'Gynic Surgery', price: '₹45,000 – ₹80,000' },

  // Diagnostics Charges
  { category: 'Diagnostics Charges', name: 'CBP', price: '₹300' },
  { category: 'Diagnostics Charges', name: 'LFT', price: '₹960' },
  { category: 'Diagnostics Charges', name: 'FBS / PLBS', price: '₹150' },
  { category: 'Diagnostics Charges', name: 'Lipid Profile', price: '₹960' },
  { category: 'Diagnostics Charges', name: 'CUE', price: '₹140' },
  { category: 'Diagnostics Charges', name: 'Surgical Profile', price: '₹4,230' },
  { category: 'Diagnostics Charges', name: 'ICU Profile', price: '₹6,120' },
  { category: 'Diagnostics Charges', name: 'X-Ray Chest', price: '₹360' },
  { category: 'Diagnostics Charges', name: 'CT-Brain', price: '₹2,400' },

  // Surgeon Charges
  { category: 'Surgeon Charges', name: 'Supra Major Operation', price: '₹50,000 – ₹75,000' },
  { category: 'Surgeon Charges', name: 'Major Surgery', price: '₹18,000 – ₹25,000' },
  { category: 'Surgeon Charges', name: 'Minor Surgery', price: '₹10,000 – ₹15,000' },
  { category: 'Surgeon Charges', name: 'Assistant Surgeon', price: '30% on Surgery' },
  { category: 'Surgeon Charges', name: 'Anesthetist Charges', price: '30% on Surgery' },
  { category: 'Surgeon Charges', name: 'Operation Charges', price: '40% on Surgery' }
];

export const ARTICLES = [
  {
    slug: 'radiology',
    category: 'Radiology',
    title: 'Advanced Radiology Services at Panacea Meridian Hospitals',
    excerpt: 'Precision diagnosis, compassionate care. At Panacea Meridian Hospitals, we believe that timely and accurate imaging is the foundation of effective treatment.',
    date: '2026-03-14',
    read: '5 min read'
  },
  {
    slug: 'urology',
    category: 'Urology',
    title: 'Understanding Urology: Expert Care for Your Urinary Health',
    excerpt: 'When it comes to your urinary and reproductive health, choosing the right specialist matters. Our urology team brings decades of focused experience.',
    date: '2026-02-28',
    read: '6 min read'
  },
  {
    slug: 'polytrauma',
    category: 'Poly Trauma',
    title: 'PolyTrauma Treatment You Can Trust in Beeramguda',
    excerpt: 'When every second counts, Panacea Meridian Hospitals stands at the forefront of critical care with its advanced polytrauma response protocol.',
    date: '2026-02-12',
    read: '7 min read'
  }
];

export const APPOINTMENTS_SEED = [
  { ref: 'PMH-24890', patient: 'Ravi Kumar', phone: '+91 98765 43210', dept: 'Cardiology', doctor: 'Dr. Nagachaitanya', visit: 'OP', date: '2026-05-26', time: '11:30 AM', status: 'Pending' },
  { ref: 'PMH-24891', patient: 'Sunitha M.', phone: '+91 90087 22310', dept: 'Gynaecology & Obstetrics', doctor: 'Dr. V. Neha', visit: 'Follow-up', date: '2026-05-26', time: '12:30 PM', status: 'Confirmed' },
  { ref: 'PMH-24892', patient: 'Imran Khan', phone: '+91 99811 67542', dept: 'Orthopaedics & Joint Replacement', doctor: 'Dr. Sai Krishna C.S', visit: 'OP', date: '2026-05-26', time: '2:00 PM', status: 'Confirmed' },
  { ref: 'PMH-24893', patient: 'Aarav Reddy', phone: '+91 80012 88934', dept: 'Paediatrics', doctor: 'Dr. D. Anusha', visit: 'OP', date: '2026-05-26', time: '11:00 AM', status: 'Completed' },
  { ref: 'PMH-24894', patient: 'Lakshmi P.', phone: '+91 78934 21100', dept: 'Neuro Surgery', doctor: 'Dr. Shaik Mohd. Muzhaid', visit: 'Report Review', date: '2026-05-26', time: '3:45 PM', status: 'Pending' }
];

export const ENQUIRIES_SEED = [
  { name: 'Rajesh T.', phone: '+91 90000 11223', email: 'rajesh.t@gmail.com', subject: 'Insurance acceptance', message: 'Wanted to know which insurance providers are accepted for cashless treatment for cardiology…', status: 'New', date: '2026-05-26' },
  { name: 'Priya Reddy', phone: '+91 78900 11243', email: 'priya.r@yahoo.in', subject: 'Maternity package', message: 'Could you share the maternity package options and accommodation options for delivery…', status: 'Contacted', date: '2026-05-25' }
];
