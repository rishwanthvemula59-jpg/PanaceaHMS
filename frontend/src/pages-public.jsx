import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { DeptIcon, UI } from './icons.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, Modal } from './pages-admin.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';


// Public interior pages: About, Departments, Doctors, DoctorDetail, Appointment, Fees, Facilities, Contact, Blog

/* -------------------- ABOUT -------------------- */
export function AboutPage({ navigate }) {
  const values = [
    { name: 'Compassion', desc: 'Empathy in every interaction — listening as much as treating.', icon: 'heart' },
    { name: 'Commitment', desc: 'Following through with patients and families through every stage.', icon: 'shield' },
    { name: 'Excellence', desc: 'Evidence-led practice and continuous improvement in clinical outcomes.', icon: 'star' },
    { name: 'Team-based Care', desc: 'Specialists, nurses and support working as one unit around the patient.', icon: 'user' },
  ];
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Bringing trusted, quality care closer to Beeramguda."
        sub="Panacea Meridian Hospitals is a multi-speciality hospital serving Beeramguda, RC Puram and the surrounding BHEL region — committed to patient safety, transparency and round-the-clock care."
        crumbs={['Home','About Us']}
      />

      <Section bg="white" className="py-20">
        <Container className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <Img src={PHOTOS.reception} alt="Hospital reception" aspect="4/3" label="Hospital reception" />
            <div className="absolute -bottom-6 -right-6 w-2/3 hidden md:block">
              <Img src={PHOTOS.team} alt="Care team" aspect="4/3" className="border-4 border-white shadow-cardHover" label="Care team" />
            </div>
          </div>
          <div>
            <SectionEyebrow>Who we are</SectionEyebrow>
            <SectionTitle>A hospital built around the patient.</SectionTitle>
            <SectionSub className="mt-5">{HOSPITAL.unit}. We bring senior consultants, modern infrastructure and reliable critical-care services to a part of Hyderabad that has long needed a hospital you can fully trust.</SectionSub>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-9">
              {[
                { v: '20+', l: 'Specialities' },
                { v: '50+', l: 'Consultants' },
                { v: '24/7', l: 'Emergency' },
              ].map(s => (
                <div key={s.l} className="rounded-2xl bg-lavender p-5 text-center">
                  <div className="display text-3xl font-extrabold text-primary">{s.v}</div>
                  <div className="text-xs uppercase tracking-widest text-muted mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Principle */}
      <Section bg="deep" className="py-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl"></div>
        <Container className="relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-2">
            <div className="w-16 h-16 rounded-2xl grad-purple flex items-center justify-center"><UI name="emergency" className="w-8 h-8 text-white" /></div>
          </div>
          <div className="lg:col-span-7 text-white">
            <div className="text-soft-lavender text-sm font-semibold tracking-widest uppercase mb-2">Our Core Principle</div>
            <h2 className="display text-3xl md:text-4xl font-bold leading-tight">"Death can be prevented if given efficient treatment within the first 10 minutes in any emergency."</h2>
            <p className="text-white/70 mt-5">This belief shapes every protocol — from how our ER is staffed to how ambulances are dispatched, to how surgical teams are kept on standby.</p>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-emergency text-white p-5">
              <div className="text-xs uppercase tracking-widest text-white/80">24/7 Emergency</div>
              <a href={`tel:${HOSPITAL.emergency}`} className="display text-2xl font-bold mt-1 block">{HOSPITAL.emergency}</a>
              <Btn variant="white" size="sm" className="mt-3 w-full" icon={<UI name="phone" className="w-3.5 h-3.5" />}>Call Now</Btn>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section bg="white" className="py-20">
        <Container className="grid md:grid-cols-2 gap-6">
          <div className="card p-9 bg-medical-pattern">
            <Badge tone="purple">Our Mission</Badge>
            <h3 className="display text-3xl font-bold text-deep mt-4 leading-tight">To provide patient care service with the best of quality & safety.</h3>
            <p className="text-muted mt-4">A simple promise that shapes every shift, every protocol, every consult.</p>
          </div>
          <div className="card p-9 bg-deep text-white">
            <Badge tone="deep" className="!bg-white/10 !text-soft-lavender">Our Vision</Badge>
            <h3 className="display text-3xl font-bold mt-4 leading-tight">Bridging the gap between urban and rural healthcare.</h3>
            <p className="text-white/70 mt-4">Penetrating deep into the villages to provide comprehensive health care — bringing tertiary-grade medicine close to home.</p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section bg="lavender" className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionEyebrow>Our Values</SectionEyebrow>
            <SectionTitle className="mx-auto">The four words we measure ourselves by.</SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={v.name} className={`card p-7 text-center ${i % 2 === 1 ? 'md:translate-y-4' : ''}`}>
                <div className="w-14 h-14 mx-auto rounded-2xl grad-purple text-white flex items-center justify-center"><UI name={v.icon} className="w-7 h-7" /></div>
                <h4 className="display text-xl font-bold text-deep mt-5">{v.name}</h4>
                <p className="text-sm text-muted mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why choose us */}
      <Section bg="white" className="py-20">
        <Container className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionEyebrow>Why Choose Us</SectionEyebrow>
            <SectionTitle>Quality & safety, built into every detail.</SectionTitle>
            <ul className="mt-7 space-y-3">
              {[
                'ISO 9001 certified processes and clinical governance',
                'Strict infection-prevention and bio-medical waste protocols',
                'Daily clinical audits and outcome reviews',
                'Patient & family counselling at every admission',
                'Transparent, published fee structure for all services',
                'Round-the-clock CT scan, dialysis and ICU availability',
              ].map(p => (
                <li key={p} className="flex items-start gap-3 text-deep/85"><span className="w-6 h-6 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0 mt-0.5"><UI name="check" className="w-3.5 h-3.5" /></span>{p}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn variant="primary" size="lg" onClick={()=>navigate('appointment')}>Book a Visit</Btn>
              <Btn variant="ghost" size="lg" onClick={()=>navigate('facilities')}>See Facilities</Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Img src={PHOTOS.ot} alt="Operation Theatre" aspect="4/5" label="Modular OT interior" />
            <div className="space-y-4 pt-10">
              <Img src={PHOTOS.icu} alt="ICU monitoring" aspect="1/1" label="ICU monitoring bay" />
              <Img src={PHOTOS.consult} alt="Doctor with patient" aspect="4/3" label="Doctor with patient" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- DEPARTMENTS -------------------- */
export function DepartmentsPage({ navigate }) {
  
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('all');
  
  const [deptList, setDeptList] = React.useState(DEPARTMENTS);
  React.useEffect(() => {
    axios.get('http://localhost:5000/api/departments').then(res => setDeptList(res.data)).catch(console.error);
  }, []);
  const filtered = deptList.filter(d => (d.name.toLowerCase().includes(q.toLowerCase())) && (cat === 'all' || (cat === 'surgical' && /Surgery|Trauma|Orthop/.test(d.name)) || (cat === 'medical' && !/Surgery|Trauma|Orthop|Anaesth|Plastic/.test(d.name)) || (cat === 'diagnostic' && /Radiology|Pathology|Bio|Haemato/.test(d.name))));
  return (
    <>
      <PageHero eyebrow="Departments" title="Our Medical Specialities" sub="Comprehensive care across 25+ departments — including critical care, surgery, women & child, diagnostics and rehabilitation." crumbs={['Home','Departments']} />
      <Section bg="white" className="py-12">
        <Container>
          <div className="card p-5 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <UI name="search" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search department, condition or speciality…" className="field pl-12" />
            </div>
            <Select value={cat} onChange={e=>setCat(e.target.value)} className="md:w-56">
              <option value="all">All Categories</option>
              <option value="medical">Medical</option>
              <option value="surgical">Surgical</option>
              <option value="diagnostic">Diagnostic</option>
            </Select>
            <Btn variant="ghost" size="md" icon={<UI name="filter" className="w-4 h-4" />}>More Filters</Btn>
          </div>
        </Container>
      </Section>
      <Section bg="soft" className="py-16">
        <Container>
          <div className="text-sm text-muted mb-6">Showing <span className="font-semibold text-deep">{filtered.length}</span> of {deptList.length} departments</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(d => (
              <div key={d.slug} className="card p-7 flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-soft-lavender text-primary flex items-center justify-center"><DeptIcon name={d.icon} className="w-7 h-7" /></div>
                  <Badge tone="outline">{d.doctors || '—'} doctors</Badge>
                </div>
                <h3 className="display text-xl font-bold text-deep mt-5">{d.name}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed flex-1">{d.desc}</p>
                <div className="flex items-center gap-2 mt-5 pt-5 border-t border-soft-lavender/60">
                  <Btn variant="softPurple" size="sm" onClick={()=>navigate('doctors', { dept: d.slug })}>View Doctors</Btn>
                  <Btn size="sm" onClick={()=>navigate('appointment', { dept: d.slug })}>Book Appointment</Btn>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- DOCTORS -------------------- */
export function DoctorsPage({ navigate }) {
  const [searchParams] = useSearchParams();

  
  const [q, setQ] = React.useState('');
  const [dept, setDept] = React.useState(searchParams.get('dept') || 'all');
  const [avail, setAvail] = React.useState('all');
  
  const [doctorsList, setDoctorsList] = React.useState(DOCTORS);
  React.useEffect(() => {
    axios.get('http://localhost:5000/api/doctors').then(res => setDoctorsList(res.data)).catch(console.error);
  }, []);
  const filtered = doctorsList.filter(d => (d.name.toLowerCase().includes(q.toLowerCase()) || d.spec.toLowerCase().includes(q.toLowerCase())) && (dept === 'all' || d.deptSlug === dept) && (avail === 'all' || d.avail === avail));
  return (
    <>
      <PageHero eyebrow="Our Doctors" title="Meet Our Expert Doctors" sub="Senior consultants and super-specialists, available across OPD timings and on-call. Book directly with the doctor of your choice." crumbs={['Home','Our Doctors']} />
      <Section bg="white" className="py-12">
        <Container>
          <div className="card p-5 grid md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <UI name="search" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by doctor name or specialisation…" className="field pl-12" />
            </div>
            <Select value={dept} onChange={e=>setDept(e.target.value)}>
              <option value="all">All Departments</option>
              {DEPARTMENTS.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            </Select>
            <Select value={avail} onChange={e=>setAvail(e.target.value)}>
              <option value="all">Any Availability</option>
              <option value="available">Available now</option>
              <option value="oncall">On Call</option>
            </Select>
          </div>
        </Container>
      </Section>
      <Section bg="soft" className="py-16">
        <Container>
          <div className="text-sm text-muted mb-6">Showing <span className="font-semibold text-deep">{filtered.length}</span> doctors</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(d => <DoctorCard key={d.id} d={d} navigate={navigate} />)}
            {filtered.length === 0 && <div className="col-span-full text-center py-20 text-muted">No doctors match these filters.</div>}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- DOCTOR DETAIL -------------------- */
export function DoctorDetailPage({ navigate }) {
  const { id: routeId } = useParams();
  
  const [doctorsList, setDoctorsList] = React.useState(DOCTORS);
  React.useEffect(() => {
    axios.get('http://localhost:5000/api/doctors').then(res => setDoctorsList(res.data)).catch(console.error);
  }, []);

  const d = doctorsList.find(x => (x.docId || x.id) === routeId) || doctorsList[0];
  if (!d) return null;
  const related = doctorsList.filter(x => x.deptSlug === d.deptSlug && (x.docId || x.id) !== (d.docId || d.id)).slice(0,3);
  if (related.length < 3) related.push(...doctorsList.filter(x => (x.docId || x.id) !== (d.docId || d.id) && !related.includes(x)).slice(0, 3 - related.length));
  return (
    <>
      <PageHero eyebrow={d.dept} title={d.name} sub={d.spec} crumbs={['Home','Our Doctors', d.name]} />
      <Section bg="white" className="py-16">
        <Container className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-6 md:p-8 flex flex-col md:flex-row gap-7 items-start">
              <Img src={d.photo} alt={d.name} aspect="1/1" className="w-full max-w-[240px] mx-auto md:mx-0 md:w-56 shrink-0" label={d.name} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {d.avail === 'available' ? <Badge tone="success">● Available</Badge> : <Badge tone="warn">On Call</Badge>}
                  <Badge tone="purple">{d.dept}</Badge>
                </div>
                <h2 className="display text-2xl md:text-3xl font-bold text-deep mt-3">{d.name}</h2>
                <div className="text-primary font-semibold mt-1">{d.spec}</div>
                <div className="text-sm text-muted mt-2">{d.qual}</div>
                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-lavender">
                    <UI name="clock" className="w-4 h-4 text-primary" />
                    <div className="text-sm"><div className="text-xs text-muted">OPD Timing</div><div className="font-semibold text-deep">{d.timing}</div></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-lavender">
                    <UI name="money" className="w-4 h-4 text-primary" />
                    <div className="text-sm"><div className="text-xs text-muted">Consultation Fee</div><div className="font-semibold text-deep">₹{d.fee}</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 md:p-8">
              <h3 className="display text-xl font-bold text-deep">About {d.name.split(' ').slice(0,2).join(' ')}</h3>
              <p className="text-muted mt-3 leading-relaxed">{d.name} is a {d.spec.toLowerCase()} at Panacea Meridian Hospitals with extensive experience in managing both routine and complex cases. Trained at leading institutions, the doctor brings a patient-first approach with an emphasis on accurate diagnosis and evidence-based treatment plans.</p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                <div>
                  <h4 className="font-bold text-deep">Available Days</h4>
                  <p className="text-sm text-muted mt-1">Mon, Tue, Wed, Thu, Fri, Sat</p>
                </div>
                <div>
                  <h4 className="font-bold text-deep">Languages</h4>
                  <p className="text-sm text-muted mt-1">English, Telugu, Hindi</p>
                </div>
                <div>
                  <h4 className="font-bold text-deep">Procedures</h4>
                  <p className="text-sm text-muted mt-1">Consultation, OPD review, in-patient care, second opinion.</p>
                </div>
                <div>
                  <h4 className="font-bold text-deep">Hospital Affiliation</h4>
                  <p className="text-sm text-muted mt-1">Panacea Meridian Hospitals, Beeramguda</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="display text-2xl font-bold text-deep mb-5">Related Doctors</h3>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map(r => <DoctorCard key={r.id} d={r} navigate={navigate} />)}
              </div>
            </div>
          </div>

          {/* Sticky book card */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="card p-6 md:p-7">
              <h3 className="display text-xl font-bold text-deep">Book an Appointment</h3>
              <p className="text-sm text-muted mt-1">with {d.name}</p>
              <div className="space-y-4 mt-5">
                <Field label="Patient Name" required><Input placeholder="Full name" /></Field>
                <Field label="Phone Number" required><Input placeholder="+91" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Preferred Date" required><Input type="date" /></Field>
                  <Field label="Time" required><Select><option>Morning</option><option>Afternoon</option><option>Evening</option></Select></Field>
                </div>
                <Btn variant="primary" size="lg" className="w-full" onClick={()=>navigate('appointment', { doctorId: d.id })}>Continue to Booking</Btn>
                <a href={`tel:${HOSPITAL.appointments[0]}`} className="block text-center text-sm font-semibold text-primary">or call {HOSPITAL.appointments[0]}</a>
              </div>
            </div>
            <div className="card p-5 mt-4 bg-emergency text-white">
              <div className="text-xs uppercase tracking-widest text-white/80">24/7 Emergency</div>
              <a href={`tel:${HOSPITAL.emergency}`} className="display text-xl font-bold block mt-1">{HOSPITAL.emergency}</a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- APPOINTMENT -------------------- */
export function AppointmentPage({ navigate }) {
  const [searchParams] = useSearchParams();
  const paramDept = searchParams.get('dept');
  const paramDoctorId = searchParams.get('doctorId');

  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '', phone: '', email: '', age: '', gender: 'Male',
    dept: paramDept || '', doctor: paramDoctorId || '',
    date: '', time: '', visit: 'OP', message: '', consent: false,
  });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const ref = 'PMH-' + (24000 + Math.floor(Math.random()*999));

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Appointment" title="Appointment Request Submitted" sub="Our hospital team will contact you shortly to confirm the slot." crumbs={['Home','Appointment','Confirmation']} />
        <Section bg="white" className="py-16">
          <Container className="max-w-2xl">
            <div className="card p-10 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-success/15 text-success flex items-center justify-center"><UI name="checkCircle" className="w-10 h-10" /></div>
              <h2 className="display text-3xl font-bold text-deep mt-6">Thank you, {form.name || 'Patient'}!</h2>
              <p className="text-muted mt-3 max-w-md mx-auto">We've received your appointment request. A member of our team will call you on <span className="font-semibold text-deep">{form.phone || 'your registered number'}</span> within 30 minutes to confirm.</p>
              <div className="mt-7 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-lavender">
                <div className="text-xs uppercase tracking-widest text-muted">Reference ID</div>
                <div className="display text-xl font-bold text-primary">{ref}</div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Btn variant="primary" onClick={()=>navigate('home')}>Back to Home</Btn>
                <Btn variant="ghost" onClick={()=>{setSubmitted(false); setForm({name:'',phone:'',email:'',age:'',gender:'Male',dept:'',doctor:'',date:'',time:'',visit:'OP',message:'',consent:false});}}>Book Another</Btn>
              </div>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Book Appointment" title="Schedule your consultation in 60 seconds." sub="Fill in your details and our team will confirm the slot with the doctor of your choice." crumbs={['Home','Book Appointment']} />
      <Section bg="soft" className="py-16">
        <Container className="grid lg:grid-cols-3 gap-8">
          <form className="lg:col-span-2 card p-6 md:p-9 space-y-6" onSubmit={async (e)=>{
              e.preventDefault(); 
              try {
                const res = await axios.post('http://localhost:5000/api/appointments', { ...form, patient: form.name });
                setSubmitted(true);
              } catch(err) {
                console.error(err);
                window.toast("Failed to submit appointment. Please try again.", "error");
              }
            }}>
            <div>
              <h3 className="display text-xl font-bold text-deep">Patient Information</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <Field label="Patient Name" required><Input value={form.name} onChange={e=>set('name', e.target.value)} placeholder="Full name" required /></Field>
                <Field label="Phone Number" required><Input value={form.phone} onChange={e=>set('phone', e.target.value)} placeholder="+91 9xxxxxxxxx" required /></Field>
                <Field label="Email (optional)"><Input type="email" value={form.email} onChange={e=>set('email', e.target.value)} placeholder="name@example.com" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Age" required><Input type="number" value={form.age} onChange={e=>set('age', e.target.value)} placeholder="32" required /></Field>
                  <Field label="Gender" required>
                    <Select value={form.gender} onChange={e=>set('gender', e.target.value)}><option>Male</option><option>Female</option><option>Other</option></Select>
                  </Field>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-soft-lavender/60">
              <h3 className="display text-xl font-bold text-deep">Appointment Details</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <Field label="Department" required>
                  <Select value={form.dept} onChange={e=>set('dept', e.target.value)} required>
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
                  </Select>
                </Field>
                <Field label="Preferred Doctor">
                  <Select value={form.doctor} onChange={e=>set('doctor', e.target.value)}>
                    <option value="">No preference</option>
                    {DOCTORS.filter(d => !form.dept || d.deptSlug === form.dept).map(d => <option key={d.id} value={d.id}>{d.name} — {d.dept}</option>)}
                  </Select>
                </Field>
                <Field label="Appointment Date" required><Input type="date" value={form.date} onChange={e=>set('date', e.target.value)} required /></Field>
                <Field label="Appointment Time" required>
                  <Select value={form.time} onChange={e=>set('time', e.target.value)} required>
                    <option value="">Pick a slot</option>
                    {['9:00 AM','10:30 AM','12:00 PM','2:00 PM','3:30 PM','5:00 PM'].map(t => <option key={t}>{t}</option>)}
                  </Select>
                </Field>
              </div>
              <div className="mt-4">
                <div className="label">Visit Type</div>
                <div className="flex flex-wrap gap-2">
                  {['OP','Emergency','Follow-up','Report Review'].map(v => (
                    <button type="button" key={v} onClick={()=>set('visit', v)} className={`px-4 py-2.5 rounded-full text-sm font-semibold border transition ${form.visit === v ? 'bg-primary text-white border-primary' : 'bg-white text-deep border-soft-lavender hover:border-primary'}`}>{v}</button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Field label="Symptoms / Message"><Textarea value={form.message} onChange={e=>set('message', e.target.value)} placeholder="Briefly describe symptoms, history or any specific request…" /></Field>
              </div>
              <label className="flex items-start gap-3 mt-5 text-sm">
                <input type="checkbox" checked={form.consent} onChange={e=>set('consent', e.target.checked)} className="mt-1 w-4 h-4 accent-primary" required />
                <span className="text-muted">I consent to Panacea Meridian Hospitals contacting me regarding this appointment, and acknowledge the privacy policy.</span>
              </label>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Btn type="submit" variant="primary" size="lg" iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Request Appointment</Btn>
                <a href={`tel:${HOSPITAL.appointments[0]}`} className="text-sm text-primary font-semibold">or call us at {HOSPITAL.appointments[0]}</a>
              </div>
            </div>
          </form>

          <aside className="space-y-4">
            <div className="card p-6 bg-emergency text-white">
              <div className="text-xs uppercase tracking-widest text-white/80">In an emergency?</div>
              <div className="display text-xl font-bold mt-1">Don't fill the form. Call immediately.</div>
              <a href={`tel:${HOSPITAL.emergency}`} className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-white text-emergency font-bold rounded-full px-4 py-3"><UI name="phone" className="w-4 h-4" />{HOSPITAL.emergency}</a>
            </div>
            <div className="card p-6">
              <h4 className="font-bold text-deep">Hospital Contact</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3"><UI name="phone" className="w-4 h-4 text-primary mt-0.5" /><div><div className="text-muted">Reception</div><a href={`tel:${HOSPITAL.phone}`} className="font-semibold text-deep">{HOSPITAL.phone}</a></div></li>
                <li className="flex items-start gap-3"><UI name="phone" className="w-4 h-4 text-primary mt-0.5" /><div><div className="text-muted">Appointments</div>{HOSPITAL.appointments.map(p => <a key={p} href={`tel:${p}`} className="block font-semibold text-deep">{p}</a>)}</div></li>
                <li className="flex items-start gap-3"><UI name="mail" className="w-4 h-4 text-primary mt-0.5" /><div><div className="text-muted">Email</div><a href={`mailto:${HOSPITAL.email}`} className="font-semibold text-deep break-all">{HOSPITAL.email}</a></div></li>
                <li className="flex items-start gap-3"><UI name="pin" className="w-4 h-4 text-primary mt-0.5" /><div><div className="text-muted">Address</div><span className="font-semibold text-deep">{HOSPITAL.address}</span></div></li>
              </ul>
            </div>
            <div className="card p-6 bg-deep text-white">
              <h4 className="font-bold text-white">OPD Timings</h4>
              <ul className="mt-3 text-sm space-y-2 text-white/80">
                <li className="flex justify-between"><span>Mon – Sat</span><span className="font-semibold text-white">8:30 AM – 8:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="font-semibold text-white">9:00 AM – 1:00 PM</span></li>
                <li className="flex justify-between"><span>Emergency, ICU, Dialysis</span><span className="font-semibold text-accent">24 / 7</span></li>
              </ul>
            </div>
            <div className="card p-6">
              <h4 className="font-bold text-deep">Trust badges</h4>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {['ISO 9001','NABL Lab','Cashless','In-house Pharmacy'].map(b => <div key={b} className="px-3 py-2 rounded-xl bg-soft-lavender/60 text-primary text-xs font-semibold text-center">{b}</div>)}
              </div>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- FEES -------------------- */
export function FeesPage({ navigate }) {
  const [fees, setFees] = React.useState({});

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/fees')
      .then(res => {
        // Group the flat fee array by category
        const grouped = res.data.reduce((acc, item) => {
          const cat = item.category;
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({ name: item.name, price: item.price });
          return acc;
        }, {});
        setFees(grouped);
      })
      .catch(err => {
        console.error('Failed to load fees:', err);
        // Fall back to seed FEES imported if API fails
        setFees(FEES);
      });
  }, []);

  const categories = Object.keys(fees);
  return (
    <>
      <PageHero eyebrow="Fee Structure" title="Transparent, published pricing." sub="Approximate charges for consultations, accommodation, diagnostics and surgeries. Pharmacy, lab, implants and stents may attract additional charges." crumbs={['Home','Fee Structure']} />
      <Section bg="soft" className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <div key={cat} className={`card p-6 md:p-7 ${idx === 0 ? 'md:col-span-2' : ''}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl grad-purple text-white flex items-center justify-center">
                    <UI name={cat.includes('Surgery')||cat.includes('Surgeon')?'scalpel':cat.includes('Accommodation')?'icu':cat.includes('Diagnostic')?'ct':cat.includes('Dressing')?'medicine':cat.includes('Consultant')?'doctor':'money'} className="w-5 h-5" />
                  </div>
                  <h3 className="display text-xl md:text-2xl font-bold text-deep">{cat}</h3>
                </div>
                <div className="rounded-2xl overflow-hidden border border-soft-lavender/60">
                  <table className="tbl">
                    <thead>
                      <tr><th>Service</th><th className="text-right">Price (₹)</th></tr>
                    </thead>
                    <tbody>
                      {fees[cat].map(f => (
                        <tr key={f.name}>
                          <td>{f.name}</td>
                          <td className="text-right font-bold text-deep">{f.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 card p-6 bg-deep text-white">
            <h4 className="display font-bold text-lg">Important notes</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>• Accommodation charges exclude pharmacy and lab.</li>
              <li>• Surgery packages exclude pharmacy, lab, implants, stents and balloons.</li>
              <li>• Packages include 30%–50% professional charges.</li>
              <li>• Final charges may vary based on patient condition. Please confirm with the hospital billing desk before admission.</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Btn variant="white" onClick={()=>navigate('contact')}>Ask about Cashless</Btn>
              <Btn variant="emergency" as="a" href={`tel:${HOSPITAL.phone}`} icon={<UI name="phone" className="w-4 h-4" />}>Call Billing Desk</Btn>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- FACILITIES -------------------- */
export function FacilitiesPage({ navigate }) {
  return (
    <>
      <PageHero eyebrow="Facilities" title="A complete care campus, ready 24/7." sub="From diagnostics to surgery to recovery — every facility a multi-speciality hospital should have, under one roof." crumbs={['Home','Facilities']} />
      <Section bg="soft" className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACILITIES.map(f => {
              const iconToPhoto = { emergency: PHOTOS.emergency, icu: PHOTOS.icu, ct: PHOTOS.ct, dialysis: PHOTOS.dialysis, lab: PHOTOS.lab, pharmacy: PHOTOS.pharmacy, ot: PHOTOS.ot, xray: PHOTOS.radiology, diagnostic: PHOTOS.ct, ambulance: PHOTOS.ambulance };
              return (
              <div key={f.name} className="card overflow-hidden">
                <Img src={iconToPhoto[f.icon]} alt={f.name} aspect="16/10" className="rounded-none" label={f.name} />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-soft-lavender text-primary flex items-center justify-center"><DeptIcon name={f.icon} className="w-6 h-6" /></div>
                    <Badge tone="success">{f.tag}</Badge>
                  </div>
                  <h3 className="display text-xl font-bold text-deep mt-4">{f.name}</h3>
                  <p className="text-sm text-muted mt-2">{f.desc}</p>
                </div>
              </div>
            );})}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- CONTACT -------------------- */
export function ContactPage({ navigate }) {
  return (
    <>
      <PageHero eyebrow="Contact" title="We're here, every hour of the day." sub="Reach us by phone, WhatsApp or in person. Our team responds within minutes." crumbs={['Home','Contact']} />
      <Section bg="soft" className="py-16">
        <Container className="grid lg:grid-cols-5 gap-8">
          <form className="lg:col-span-3 card p-8 space-y-5" onSubmit={async (e)=>{
            e.preventDefault();
            const data = {
              name: e.target.name.value,
              phone: e.target.phone.value,
              email: e.target.email.value,
              subject: e.target.subject.value,
              message: e.target.message.value
            };
            try {
              await axios.post('http://localhost:5000/api/enquiries', data);
              window.toast('Message sent. We will get back to you shortly.', 'success');
              e.target.reset();
            } catch(err) {
              console.error(err);
              window.toast('Failed to send message. Please try again.', 'error');
            }
          }}>
            <h3 className="display text-2xl font-bold text-deep">Send us a message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" required><Input name="name" placeholder="Your name" required /></Field>
              <Field label="Phone Number" required><Input name="phone" placeholder="+91" required /></Field>
              <Field label="Email"><Input name="email" type="email" placeholder="name@example.com" /></Field>
              <Field label="Subject" required>
                <Select name="subject" required defaultValue=""><option value="">Select a subject</option><option>General enquiry</option><option>Appointment</option><option>Insurance</option><option>Corporate tie-up</option><option>Feedback</option></Select>
              </Field>
            </div>
            <Field label="Message" required><Textarea name="message" placeholder="How can we help you?" required /></Field>
            <Btn type="submit" variant="primary" size="lg" iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Send Message</Btn>
          </form>

          <aside className="lg:col-span-2 space-y-4">
            {[
              { icon: 'phone', title: 'Call Hospital', value: HOSPITAL.phone, href: `tel:${HOSPITAL.phone}`, sub: 'Mon–Sun · 24/7' },
              { icon: 'calendar', title: 'Book Appointment', value: HOSPITAL.appointments.join(' · '), href: `tel:${HOSPITAL.appointments[0]}`, sub: 'WhatsApp available' },
              { icon: 'emergency', title: 'Emergency', value: HOSPITAL.emergency, href: `tel:${HOSPITAL.emergency}`, sub: 'Always answered first', tone: 'emergency' },
              { icon: 'mail', title: 'Email Us', value: HOSPITAL.email, href: `mailto:${HOSPITAL.email}`, sub: 'Response in 24 hrs' },
              { icon: 'pin', title: 'Address', value: HOSPITAL.address, href: HOSPITAL.maps, sub: 'Open in Google Maps' },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith('http')?'_blank':''} className={`card p-5 flex items-start gap-4 hover:translate-y-[-2px] transition ${c.tone === 'emergency' ? '!bg-emergency text-white' : ''}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${c.tone === 'emergency' ? 'bg-white/15' : 'bg-soft-lavender text-primary'}`}><UI name={c.icon} className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className={`text-xs uppercase tracking-widest ${c.tone === 'emergency' ? 'text-white/80' : 'text-muted'}`}>{c.title}</div>
                  <div className={`font-bold mt-0.5 break-all ${c.tone === 'emergency' ? 'text-white' : 'text-deep'}`}>{c.value}</div>
                  <div className={`text-xs mt-1 ${c.tone === 'emergency' ? 'text-white/80' : 'text-muted'}`}>{c.sub}</div>
                </div>
              </a>
            ))}
            <a href={`https://wa.me/91${HOSPITAL.emergency.replace(/\D/g,'').slice(-10)}`} target="_blank" rel="noreferrer" className="block rounded-2xl bg-success text-white p-5 hover:translate-y-[-2px] transition">
              <div className="flex items-center gap-3"><UI name="whatsapp" className="w-6 h-6" /><div className="font-bold">Chat on WhatsApp</div></div>
              <div className="text-white/85 text-sm mt-1">Send us a quick message — we'll reply during working hours.</div>
            </a>
          </aside>
        </Container>
      </Section>

      {/* Map */}
      <Section bg="white" className="py-16">
        <Container>
          <div className="card overflow-hidden">
            <div className="relative ph-stripe" style={{aspectRatio: '21 / 9'}}>
              <div className="absolute inset-0 grad-purple-soft opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-cardHover p-5 max-w-sm text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl grad-purple text-white flex items-center justify-center"><UI name="pin" className="w-6 h-6" /></div>
                  <div className="display text-lg font-bold text-deep mt-3">{HOSPITAL.name}</div>
                  <div className="text-sm text-muted mt-1">{HOSPITAL.address}</div>
                  <Btn variant="primary" size="sm" className="mt-4" as="a" href={HOSPITAL.maps} target="_blank" iconRight={<UI name="arrowRight" className="w-3.5 h-3.5" />}>Open in Google Maps</Btn>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 text-xs font-mono text-primary/60 tracking-widest uppercase">map embed placeholder</div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------- BLOG -------------------- */
export function BlogPage({ navigate }) {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(res => {
        // Map database fields to front-end camelCase expectations
        const mapped = res.data.map(a => ({
          id: a.id,
          slug: a.slug,
          category: a.category,
          title: a.title,
          excerpt: a.excerpt,
          date: a.published_date,
          read: a.reading_time
        }));
        setArticles(mapped);
      })
      .catch(err => {
        console.error('Failed to load articles:', err);
        // Fall back to seed ARTICLES
        setArticles(ARTICLES);
      });
  }, []);

  const featured = articles[0] || ARTICLES[0];
  const list = articles.length > 0 ? articles : ARTICLES;

  return (
    <>
      <PageHero eyebrow="Health Articles" title="Doctor-written, patient-friendly." sub="Stories, tips and explainers — written and reviewed by our consultants." crumbs={['Home','Health Articles']} />
      <Section bg="soft" className="py-16">
        <Container>
          {/* Featured */}
          {featured && (
            <div className="card overflow-hidden grid md:grid-cols-2 mb-10">
              <Img src={PHOTOS.blogRadiology} alt={featured.title} aspect="4/3" className="rounded-none" label={featured.category} />
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <Badge tone="purple">Featured · {featured.category}</Badge>
                <h2 className="display text-2xl md:text-3xl font-bold text-deep mt-4 leading-tight">{featured.title}</h2>
                <p className="text-muted mt-3">{featured.excerpt}</p>
                <div className="text-xs text-muted mt-4">{featured.date} · {featured.read}</div>
                <Btn variant="primary" size="md" className="mt-5 self-start" iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Read Article</Btn>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {list.map(a => {
              const covers = { radiology: PHOTOS.blogRadiology, urology: PHOTOS.blogUrology, polytrauma: PHOTOS.blogTrauma };
              return (
              <div key={a.slug} className="card overflow-hidden flex flex-col">
                <Img src={covers[a.slug] || PHOTOS.blogRadiology} alt={a.title} aspect="16/10" className="rounded-none" label={a.category} />
                <div className="p-6 flex-1 flex flex-col">
                  <Badge tone="outline" className="self-start">{a.category}</Badge>
                  <h3 className="display text-lg font-bold text-deep mt-3 leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted mt-2 line-clamp-3">{a.excerpt}</p>
                  <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted">
                    <span>{a.date}</span>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold">Read More <UI name="arrowRight" className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </div>
            );})}
          </div>
        </Container>
      </Section>
    </>
  );}

Object.assign(window, { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage });