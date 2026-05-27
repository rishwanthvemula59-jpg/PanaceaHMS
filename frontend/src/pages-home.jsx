import React from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { DeptIcon, UI } from './icons.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, Modal } from './pages-admin.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';


// Home page
export function HomePage({ navigate }) {
  return (
    <>
      <Hero navigate={navigate} />
      <TrustStrip />
      <QuickServiceCards navigate={navigate} />
      <EmergencyStrip />
      <AboutPreview navigate={navigate} />
      <DepartmentsPreview navigate={navigate} />
      <PatientJourney />
      <FacilitiesPreview navigate={navigate} />
      <DoctorsPreview navigate={navigate} />
      <FeePreview navigate={navigate} />
      <Testimonials />
      <BlogPreview navigate={navigate} />
      <ContactCTA navigate={navigate} />
    </>
  );
}

export function Hero({ navigate }) {
  return (
    <section className="relative bg-medical-pattern overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-accent/15 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-primary/15 blur-3xl"></div>
      <Container className="relative py-16 md:py-20 lg:py-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-white shadow-card px-4 py-2 rounded-full text-xs font-semibold text-primary">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Now accepting appointments · {HOSPITAL.location}
          </div>
          <h1 className="display mt-5 text-[40px] md:text-6xl lg:text-[76px] font-extrabold text-deep leading-[0.98] tracking-tight">
            Advanced Care,<br/>
            <span className="text-grad">Compassionate Touch.</span>
          </h1>
          <p className="mt-6 text-muted text-lg max-w-xl leading-relaxed">
            A multi-speciality hospital in Beeramguda offering expert consultants, 24/7 emergency care, ICU, CT scan, dialysis and patient-first treatment — all under one roof.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Btn size="lg" onClick={()=>navigate('appointment')} iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Book Appointment</Btn>
            <Btn size="lg" variant="emergency" as="a" href={`tel:${HOSPITAL.emergency}`} icon={<UI name="phone" className="w-4 h-4" />}>Call Emergency</Btn>
            <Btn size="lg" variant="ghost" as="a" href={HOSPITAL.maps} target="_blank" icon={<UI name="pin" className="w-4 h-4" />}>Directions</Btn>
          </div>

          {/* Trust pills */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {[
              { label: '24/7 Emergency', icon: 'emergency' },
              { label: 'Expert Doctors', icon: 'doctor' },
              { label: 'ICU', icon: 'icu' },
              { label: 'CT Scan', icon: 'ct' },
              { label: 'Dialysis', icon: 'dialysis' },
            ].map((b, i) => (
              <div key={i} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-soft-lavender/60 rounded-full pl-2 pr-4 py-1.5">
                <span className="w-7 h-7 rounded-full bg-soft-lavender flex items-center justify-center text-primary"><DeptIcon name={b.icon} className="w-3.5 h-3.5" /></span>
                <span className="text-[12.5px] font-semibold text-deep">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Inline stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[['12,400+','Patients cared for'],['20+','Specialities'],['50+','Consultants']].map(([v,l]) => (
              <div key={l}>
                <div className="display text-2xl md:text-3xl font-extrabold text-deep">{v}</div>
                <div className="text-[12px] text-muted mt-1 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative">
            <div className="absolute -inset-3 grad-purple-soft rounded-[2.25rem] -z-0"></div>
            <Img src={PHOTOS.heroDoctor} alt="Doctor at Panacea Meridian Hospitals" aspect="4/5" className="relative z-10 rounded-[2rem] shadow-cardHover" label="Hospital · doctor portrait" />
            {/* Floating credentials card — bottom */}
            <div className="absolute -left-5 -bottom-6 z-20 bg-white rounded-2xl shadow-cardHover p-4 w-60 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full grad-purple flex items-center justify-center text-white"><UI name="shield" className="w-5 h-5" /></div>
                <div>
                  <div className="display font-bold text-deep text-sm">ISO 9001 Certified</div>
                  <div className="text-[11px] text-muted">Quality & safety standards</div>
                </div>
              </div>
            </div>
            {/* Floating live stat — top right */}
            <div className="absolute -right-4 top-6 z-20 bg-deep text-white rounded-2xl p-4 w-56 shadow-cardHover hidden md:block">
              <div className="text-[10px] uppercase tracking-widest text-soft-lavender flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>Live · Emergency Room</div>
              <div className="display text-base font-bold mt-2 leading-snug">Open & accepting cases</div>
              <a href={`tel:${HOSPITAL.emergency}`} className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent font-semibold whitespace-nowrap">Call ER now <UI name="arrowRight" className="w-3 h-3" /></a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function TrustStrip() {
  return (
    <div className="border-y border-soft-lavender/70 bg-white">
      <div className="overflow-hidden">
        <div className="marquee py-5">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-14 px-7 text-deep/70 text-sm font-semibold shrink-0">
              {['ISO 9001 Certified','24/7 Emergency Room','NABL Lab Partner','Cashless Insurance','Modular Operation Theatres','In-house Pharmacy','Dedicated NICU','Multi-slice CT Scan'].map(t => (
                <span key={t} className="inline-flex items-center gap-2.5 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EmergencyStrip() {
  return (
    <div className="bg-emergency relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 ph-stripe-dark"></div>
      <Container className="relative py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0"><UI name="emergency" className="w-6 h-6" /></div>
          <div>
            <div className="font-bold text-lg display">24/7 Emergency Care Available</div>
            <div className="text-white/80 text-sm">Trauma, ICU, ambulance & specialist support — every hour of the day.</div>
          </div>
        </div>
        <Btn as="a" href={`tel:${HOSPITAL.emergency}`} variant="white" size="lg" icon={<UI name="phone" className="w-4 h-4" />}>{HOSPITAL.emergency}</Btn>
      </Container>
    </div>
  );
}

export function QuickServiceCards({ navigate }) {
  const cards = [
    {
      title: 'Expert Doctors',
      desc: 'Highly skilled and experienced consultants dedicated to your care and recovery — across 20+ specialities.',
      icon: 'doctor',
      cta: { label: 'Meet our doctors', go: 'doctors' },
      tone: 'lavender',
    },
    {
      title: 'Emergency Service',
      desc: 'For immediate medical assistance, our emergency team is available 24/7 — just a call away.',
      icon: 'heart',
      cta: { label: HOSPITAL.emergency, href: `tel:${HOSPITAL.emergency}` },
      tone: 'deep',
    },
    {
      title: 'Make an Appointment',
      desc: 'Schedule your consultation with our specialists at your convenience, online or by phone.',
      icon: 'calendar',
      cta: { label: 'Get started', go: 'appointment' },
      tone: 'purple',
    },
  ];
  return (
    <Section bg="white" className="py-16 md:py-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const isLavender = c.tone === 'lavender';
            const isDeep = c.tone === 'deep';
            const isPurple = c.tone === 'purple';
            return (
              <div key={i} className={`rounded-3xl p-7 md:p-8 shadow-card transition hover:shadow-cardHover hover:-translate-y-1 ${isLavender ? 'bg-soft-lavender' : isDeep ? 'bg-deep text-white' : 'grad-purple text-white'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLavender ? 'bg-white text-primary' : 'bg-white/15 text-white'}`}>
                  <DeptIcon name={c.icon} className="w-6 h-6" />
                </div>
                <h3 className={`display text-2xl font-bold mt-5 ${isLavender ? 'text-deep' : ''}`}>{c.title}</h3>
                <p className={`text-[15px] mt-2 leading-relaxed ${isLavender ? 'text-muted' : 'text-white/80'}`}>{c.desc}</p>
                <div className="mt-5">
                  {c.cta.href ? (
                    <a href={c.cta.href} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-deep font-semibold text-sm"><UI name="phone" className="w-4 h-4" />{c.cta.label}</a>
                  ) : (
                    <button onClick={()=>navigate(c.cta.go)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isLavender ? 'text-primary' : 'text-white'}`}>{c.cta.label} <UI name="arrowRight" className="w-4 h-4" /></button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export function AboutPreview({ navigate }) {
  const bullets = [
    { title: 'Excellence in Patient Care', desc: 'Compassionate, reliable, expert care you can trust.', icon: 'heart' },
    { title: 'Leading with Clinical Precision', desc: 'Trusted, ethical, expert care with proven standards.', icon: 'medicine' },
    { title: 'Clean Care. Trusted Standards.', desc: 'Strict hygiene practices to prevent infections.', icon: 'shield' },
    { title: 'Always Open. Always Caring. 24/7', desc: 'Round-the-clock care ensuring help anytime.', icon: 'clock' },
  ];
  return (
    <Section bg="white" className="py-20 md:py-28">
      <Container className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <div className="absolute -inset-3 grad-purple-soft rounded-[2.25rem] -z-0"></div>
          <Img src={PHOTOS.surgeon} alt="Surgeon at work" aspect="4/5" className="relative z-10 rounded-[2rem]" label="Surgeon at work" />
          <div className="absolute -bottom-8 -right-6 z-20 w-[58%] hidden md:block">
            <Img src={PHOTOS.surgeryTeam} alt="Operating team" aspect="4/3" className="border-4 border-white shadow-cardHover" label="Operating team" />
          </div>
        </div>
        <div>
          <SectionEyebrow>About Panacea Meridian</SectionEyebrow>
          <SectionTitle>Comprehensive Medical Services for Your Wellbeing</SectionTitle>
          <SectionSub className="mt-5">At Panacea Meridian Hospitals, we offer a full range of medical specialities under one roof. Our expert team ensures timely diagnosis, effective treatment and compassionate care for every stage of life.</SectionSub>

          <div className="mt-9 grid sm:grid-cols-2 gap-5">
            {bullets.map(b => (
              <div key={b.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-soft-lavender flex items-center justify-center text-primary shrink-0">
                  {ICONS[b.icon] ? <UI name={b.icon} className="w-5 h-5" /> : <DeptIcon name={b.icon} className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-deep">{b.title}</div>
                  <div className="text-sm text-muted mt-1">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-8 space-y-2.5">
            {['24 Hours emergency assistance — call us anytime','Committed to providing healthcare service','Really know the true needs and expectations of patients'].map(p => (
              <li key={p} className="flex items-center gap-3 text-deep/80"><span className="w-5 h-5 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0"><UI name="check" className="w-3 h-3" /></span>{p}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Btn variant="primary" size="lg" onClick={()=>navigate('about')}>More About Us</Btn>
            <Btn variant="ghost" size="lg" onClick={()=>navigate('appointment')} icon={<UI name="calendar" className="w-4 h-4" />}>Book a Visit</Btn>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function DepartmentsPreview({ navigate }) {
  const featured = DEPARTMENTS.filter(d => d.featured).slice(0, 6);
  return (
    <Section bg="medical" className="py-20 md:py-28">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Medical Services</SectionEyebrow>
          <SectionTitle className="mx-auto">Our Healthcare Specialities</SectionTitle>
          <SectionSub className="mt-4 mx-auto">Providing personalised, high-quality medical care across every speciality — with compassion and commitment.</SectionSub>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((d, i) => {
            // Make the centre card on row 2 the dark accent for rhythm — no awkward translate
            const dark = i === 4;
            return (
              <div key={d.slug} className={`card p-7 ${dark ? '!bg-deep text-white' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dark ? 'bg-white/10 text-accent' : 'bg-soft-lavender text-primary'}`}>
                  <DeptIcon name={d.icon} className="w-7 h-7" />
                </div>
                <h3 className={`display text-xl font-bold mt-5 ${dark ? 'text-white' : 'text-deep'}`}>{d.name}</h3>
                <p className={`text-[14px] mt-2 leading-relaxed ${dark ? 'text-white/70' : 'text-muted'}`}>{d.desc}</p>
                <button onClick={()=>navigate('departments')} className={`inline-flex items-center gap-1.5 mt-5 text-sm font-semibold ${dark ? 'text-accent' : 'text-primary'}`}>Read More <UI name="arrowRight" className="w-4 h-4" /></button>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Btn variant="primary" size="lg" onClick={()=>navigate('departments')} iconRight={<UI name="arrowRight" className="w-4 h-4" />}>View All Departments</Btn>
        </div>
      </Container>
    </Section>
  );
}

export function PatientJourney() {
  const steps = [
    { n: 1, title: 'Book Appointment', desc: 'Phone, WhatsApp or online — pick what suits you.', icon: 'calendar' },
    { n: 2, title: 'Consult Doctor', desc: 'In-person consult with the right specialist.', icon: 'doctor' },
    { n: 3, title: 'Diagnostics', desc: 'In-house lab, imaging and CT under one roof.', icon: 'lab' },
    { n: 4, title: 'Treatment', desc: 'IP, OP, day-care or surgical care as needed.', icon: 'medicine' },
    { n: 5, title: 'Prescription & Payment', desc: 'Transparent billing — pharmacy on campus.', icon: 'money' },
    { n: 6, title: 'Follow-up', desc: 'Recovery, rehab and continued specialist care.', icon: 'checkCircle' },
  ];
  return (
    <Section bg="white" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <SectionEyebrow>Patient Journey</SectionEyebrow>
            <SectionTitle>Care, simplified — from first call to follow-up.</SectionTitle>
          </div>
          <SectionSub>Six steps designed to make hospital visits less stressful and more transparent for every patient and family.</SectionSub>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-7 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-soft-lavender to-transparent"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="w-14 h-14 rounded-2xl grad-purple text-white flex items-center justify-center shadow-card relative z-10">
                  <UI name={s.icon} className="w-6 h-6" />
                </div>
                <div className="absolute top-1.5 left-12 text-5xl font-extrabold display text-primary/10 select-none">{s.n}</div>
                <div className="mt-4 font-bold text-deep">{s.title}</div>
                <div className="text-sm text-muted mt-1 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function FacilitiesPreview({ navigate }) {
  const items = FACILITIES.slice(0, 8);
  const iconToPhoto = { emergency: PHOTOS.emergency, icu: PHOTOS.icu, ct: PHOTOS.ct, dialysis: PHOTOS.dialysis, lab: PHOTOS.lab, pharmacy: PHOTOS.pharmacy, ot: PHOTOS.ot, xray: PHOTOS.radiology, diagnostic: PHOTOS.ct, ambulance: PHOTOS.ambulance };
  return (
    <Section bg="soft" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <SectionEyebrow>Facilities</SectionEyebrow>
            <SectionTitle>Every facility you need, on one campus.</SectionTitle>
          </div>
          <Btn variant="ghost" onClick={()=>navigate('facilities')} iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Explore Facilities</Btn>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(f => (
            <div key={f.name} className="card overflow-hidden group">
              <div className="relative">
                <Img src={iconToPhoto[f.icon]} alt={f.name} aspect="4/3" className="rounded-none" label={f.name} />
                <div className="absolute top-3 right-3"><Badge tone="success" className="!bg-white !text-success">{f.tag}</Badge></div>
                <div className="absolute -bottom-5 left-4 w-10 h-10 rounded-xl bg-white shadow-card flex items-center justify-center text-primary"><DeptIcon name={f.icon} className="w-5 h-5" /></div>
              </div>
              <div className="p-4 pt-7">
                <div className="font-bold text-deep text-[15px] leading-tight">{f.name}</div>
                <div className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function DoctorsPreview({ navigate }) {
  const featured = DOCTORS.slice(0, 4);
  return (
    <Section bg="white" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <SectionEyebrow>Meet our team</SectionEyebrow>
            <SectionTitle>Senior consultants. Around-the-clock care.</SectionTitle>
          </div>
          <Btn variant="ghost" onClick={()=>navigate('doctors')} iconRight={<UI name="arrowRight" className="w-4 h-4" />}>See all doctors</Btn>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(d => <DoctorCard key={d.id} d={d} navigate={navigate} />)}
        </div>
      </Container>
    </Section>
  );
}

export function DoctorCard({ d, navigate }) {
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative">
        <Img src={d.photo} alt={d.name} aspect="1/1" className="rounded-none" label={d.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3">
          {d.avail === 'available'
            ? <span className="inline-flex items-center gap-1.5 bg-white text-success text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-success"></span>Available</span>
            : <span className="inline-flex items-center gap-1.5 bg-white text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>On Call</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="text-[10px] uppercase tracking-widest text-soft-lavender/90 font-semibold">{d.dept}</div>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="display text-[17px] font-bold text-deep leading-tight">{d.name}</div>
        <div className="text-xs text-muted mt-1.5">{d.qual}</div>
        <div className="flex items-start gap-1.5 text-xs text-muted mt-3"><UI name="clock" className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span className="leading-snug">{d.timing}</span></div>
        <div className="mt-auto pt-4 border-t border-soft-lavender/60 flex flex-col sm:flex-row sm:items-center gap-2.5">
          <button onClick={()=>navigate('doctor', { id: d.docId || d.id })} className="text-sm font-semibold text-primary whitespace-nowrap text-left">View Profile</button>
          <Btn size="sm" className="sm:ml-auto" onClick={()=>navigate('appointment', { doctorId: d.docId || d.id })}>Book</Btn>
        </div>
      </div>
    </div>
  );
}

export function FeePreview({ navigate }) {
  const items = [
    { label: 'OP Specialist', price: '₹500', sub: 'Consultation', icon: 'doctor' },
    { label: 'Super Specialist', price: '₹800', sub: 'Consultation', icon: 'doctor' },
    { label: 'General Ward', price: '₹3,600', sub: 'Per day', icon: 'icu' },
    { label: 'CT Brain', price: '₹2,400', sub: 'Diagnostic', icon: 'ct' },
  ];
  return (
    <Section bg="lavender" className="py-20 md:py-28">
      <Container className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <SectionEyebrow>Transparent Pricing</SectionEyebrow>
          <SectionTitle>No hidden costs.<br/>Just honest care.</SectionTitle>
          <SectionSub className="mt-5">Our published fee structure covers consultation, accommodation, diagnostics and surgical packages — so you always know what to expect.</SectionSub>
          <div className="mt-7 flex flex-wrap gap-3">
            <Btn variant="primary" size="lg" onClick={()=>navigate('fees')}>View Full Fee Structure</Btn>
            <Btn variant="ghost" size="lg" onClick={()=>navigate('contact')}>Ask About Cashless</Btn>
          </div>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {items.map((i, k) => (
            <div key={k} className="bg-white rounded-2xl p-5 shadow-card flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-soft-lavender text-primary flex items-center justify-center shrink-0"><DeptIcon name={i.icon} className="w-5 h-5" /></div>
                <div className="min-w-0">
                  <div className="font-bold text-deep truncate">{i.label}</div>
                  <div className="text-xs text-muted">{i.sub}</div>
                </div>
              </div>
              <div className="display text-2xl font-bold text-primary shrink-0">{i.price}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function Testimonials() {
  return (
    <Section bg="white" className="py-20 md:py-28">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionEyebrow>Patient Stories</SectionEyebrow>
          <SectionTitle className="mx-auto">Trusted by families across Beeramguda.</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`card p-7 ${i === 1 ? '!bg-deep text-white' : ''}`}>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({length:t.rating}).map((_,k) => <svg key={k} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>)}
              </div>
              <p className={`mt-4 text-[15px] leading-relaxed ${i === 1 ? 'text-white/85' : 'text-deep/80'}`}>"{t.text}"</p>
              <div className="mt-6 pt-6 border-t border-soft-lavender/40 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full overflow-hidden ring-2 ${i === 1 ? 'ring-accent/60' : 'ring-soft-lavender'}`}>
                  <Img src={[PHOTOS.av1, PHOTOS.av2, PHOTOS.av3][i]} alt={t.name} aspect="1/1" className="rounded-none" />
                </div>
                <div>
                  <div className={`font-bold ${i === 1 ? 'text-white' : 'text-deep'}`}>{t.name}</div>
                  <div className={`text-xs ${i === 1 ? 'text-white/60' : 'text-muted'}`}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function BlogPreview({ navigate }) {
  const covers = { radiology: PHOTOS.blogRadiology, urology: PHOTOS.blogUrology, polytrauma: PHOTOS.blogTrauma };
  return (
    <Section bg="soft" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <SectionEyebrow>Health Articles</SectionEyebrow>
            <SectionTitle>Stories, tips and updates from our doctors.</SectionTitle>
          </div>
          <Btn variant="ghost" onClick={()=>navigate('blog')} iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Read all articles</Btn>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ARTICLES.map(a => (
            <button key={a.slug} onClick={()=>navigate('blog')} className="card text-left overflow-hidden flex flex-col">
              <Img src={covers[a.slug]} alt={a.title} aspect="16/10" className="rounded-none" label={a.category} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-[11px] uppercase tracking-widest text-primary font-bold">{a.category}</div>
                <h3 className="display text-lg font-bold text-deep mt-2 leading-snug">{a.title}</h3>
                <p className="text-sm text-muted mt-2 line-clamp-3">{a.excerpt}</p>
                <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted">
                  <span>{a.date} · {a.read}</span>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold">Read More <UI name="arrowRight" className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ContactCTA({ navigate }) {
  return (
    <Section bg="deep" className="relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl"></div>
      <Container className="relative py-16 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-soft-lavender text-sm font-semibold tracking-widest uppercase mb-3">Need Help?</div>
          <h2 className="display text-3xl md:text-5xl font-bold leading-[1.1]">Need medical assistance?<br/>Book your appointment today.</h2>
          <p className="text-white/70 mt-5 max-w-xl">Our team is available round the clock to help with appointments, second opinions, ambulance dispatch and insurance queries.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a href={`tel:${HOSPITAL.phone}`} className="rounded-2xl bg-white/8 hover:bg-white/15 border border-white/10 p-5 transition">
            <UI name="phone" className="w-5 h-5 text-accent" />
            <div className="text-xs uppercase tracking-widest text-white/60 mt-3">Call Now</div>
            <div className="font-bold mt-1">{HOSPITAL.phone}</div>
          </a>
          <a href={`https://wa.me/91${HOSPITAL.emergency.replace(/\D/g,'').slice(-10)}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-success/20 hover:bg-success/30 border border-success/30 p-5 transition">
            <UI name="whatsapp" className="w-5 h-5 text-success" />
            <div className="text-xs uppercase tracking-widest text-white/60 mt-3">WhatsApp</div>
            <div className="font-bold mt-1">Chat with us</div>
          </a>
          <a href={HOSPITAL.maps} target="_blank" rel="noreferrer" className="rounded-2xl grad-purple p-5">
            <UI name="pin" className="w-5 h-5 text-white" />
            <div className="text-xs uppercase tracking-widest text-soft-lavender mt-3">Directions</div>
            <div className="font-bold mt-1">Get on map</div>
          </a>
        </div>
      </Container>
    </Section>
  );
}