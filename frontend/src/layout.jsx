import React from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { DeptIcon, UI } from './icons.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, Modal } from './pages-admin.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';


// Top bar, Navbar, Footer, MobileNav, Floating action buttons

export function TopBar() {
  return (
    <div className="hidden md:block bg-deep text-white text-[12.5px]">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10 h-9 flex items-center justify-between">
        <div className="flex items-center gap-5 text-white/80">
          <a href="#" className="inline-flex items-center gap-2 hover:text-white"><UI name="phone" className="w-3.5 h-3.5" /> {HOSPITAL.phone}</a>
          <a href="#" className="inline-flex items-center gap-2 hover:text-white"><UI name="mail" className="w-3.5 h-3.5" /> {HOSPITAL.email}</a>
          <a href={HOSPITAL.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><UI name="pin" className="w-3.5 h-3.5" /> {HOSPITAL.location}</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 text-emergency font-semibold whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-emergency animate-pulse"></span>Emergency · <a href={`tel:${HOSPITAL.emergency}`}>{HOSPITAL.emergency}</a></span>
        </div>
      </div>
    </div>
  );
}

export function Navbar({ route, navigate, openMobile, setOpenMobile }) {
  const items = [
    { label: 'Home', to: 'home' },
    { label: 'About Us', to: 'about' },
    { label: 'Departments', to: 'departments' },
    { label: 'Our Doctors', to: 'doctors' },
    { label: 'Facilities', to: 'facilities' },
    { label: 'Fee Structure', to: 'fees' },
    { label: 'Health Articles', to: 'blog' },
    { label: 'Contact', to: 'contact' },
  ];
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-[0_4px_24px_-12px_rgba(36,11,54,0.12)]' : ''} border-b border-soft-lavender/60`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10 h-[72px] flex items-center justify-between gap-4">
        <button onClick={() => navigate('home')} className="shrink-0"><Logo size={38} /></button>
        <nav className="hidden lg:flex items-center gap-1">
          {items.map(it => (
            <button key={it.to} onClick={() => navigate(it.to)} className={`whitespace-nowrap px-3.5 py-2 rounded-full text-[14.5px] font-medium transition ${route === it.to ? 'text-primary bg-soft-lavender/70' : 'text-deep/80 hover:text-primary hover:bg-soft-lavender/40'}`}>
              {it.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Btn onClick={() => navigate('appointment')} variant="primary" size="md" className="hidden sm:inline-flex" iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Book Appointment</Btn>
          <button onClick={() => setOpenMobile(true)} className="lg:hidden w-10 h-10 rounded-full bg-soft-lavender/50 flex items-center justify-center text-primary"><UI name="menu" /></button>
        </div>
      </div>
      {openMobile && <MobileNav navigate={navigate} close={() => setOpenMobile(false)} route={route} />}
    </header>
  );
}

function MobileNav({ navigate, close, route }) {
  const items = [
    ['Home', 'home'], ['About Us', 'about'], ['Departments', 'departments'], ['Our Doctors', 'doctors'],
    ['Doctor Profile', 'doctor'], ['Facilities', 'facilities'], ['Fee Structure', 'fees'], ['Health Articles', 'blog'],
    ['Contact', 'contact'], ['Book Appointment', 'appointment'], ['— Admin Login', 'admin-login'], ['— Admin Dashboard', 'admin'],
  ];
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-deep/60 backdrop-blur-sm" onClick={close}></div>
      <div className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-soft-lavender/60">
          <Logo size={34} />
          <button onClick={close} className="w-10 h-10 rounded-full bg-soft-lavender/50 flex items-center justify-center text-primary"><UI name="close" /></button>
        </div>
        <div className="overflow-y-auto p-5 flex-1">
          <nav className="flex flex-col gap-1">
            {items.map(([label, to]) => (
              <button key={to+label} onClick={() => { navigate(to); close(); }} className={`text-left px-4 py-3 rounded-xl text-[15px] font-medium ${route === to ? 'bg-soft-lavender text-primary' : 'text-deep hover:bg-soft-lavender/40'}`}>{label}</button>
            ))}
          </nav>
          <div className="mt-6 p-4 bg-deep text-white rounded-2xl">
            <div className="text-xs uppercase tracking-widest text-soft-lavender">24/7 Emergency</div>
            <a href={`tel:${HOSPITAL.emergency}`} className="display text-2xl font-bold mt-1 block">{HOSPITAL.emergency}</a>
            <Btn variant="emergency" size="sm" className="mt-3 w-full" icon={<UI name="phone" className="w-3.5 h-3.5" />}>Call Emergency</Btn>
          </div>
        </div>
        <div className="p-5 border-t border-soft-lavender/60">
          <Btn variant="primary" size="md" className="w-full" onClick={() => { navigate('appointment'); close(); }}>Book Appointment</Btn>
        </div>
      </div>
    </div>
  );
}

export function Footer({ navigate }) {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">

      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo variant="light" size={36} />
          <p className="text-white/60 text-sm leading-relaxed mt-5">A trusted multi-speciality hospital in Beeramguda offering expert care, modern treatments and round-the-clock support. We prioritise patient well-being and safety at every step.</p>
          <p className="text-white/40 text-xs mt-3 italic">{HOSPITAL.unit}</p>
          <div className="flex items-center gap-2 mt-5">
            {['f','x','ig','in'].map(s => <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-sm font-semibold transition">{s}</a>)}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-5">Contact Details</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3"><UI name="pin" className="w-4 h-4 text-accent shrink-0 mt-0.5" /><a href={HOSPITAL.maps} target="_blank" rel="noopener noreferrer" className="hover:text-white">{HOSPITAL.address}</a></li>
            <li className="flex items-start gap-3"><UI name="clock" className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span>Open 24/7 — Emergency, ICU & Dialysis</span></li>
            <li className="flex items-start gap-3"><UI name="phone" className="w-4 h-4 text-accent shrink-0 mt-0.5" /><a href={`tel:${HOSPITAL.phone}`} className="hover:text-white">{HOSPITAL.phone}</a></li>
            <li className="flex items-start gap-3"><UI name="mail" className="w-4 h-4 text-accent shrink-0 mt-0.5" /><a href={`mailto:${HOSPITAL.email}`} className="hover:text-white break-all">{HOSPITAL.email}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {[['Home','home'],['About Us','about'],['Departments','departments'],['Our Doctors','doctors'],['Facilities','facilities'],['Fee Structure','fees'],['Health Articles','blog'],['Contact','contact'],['Admin Portal','admin-login']].map(([l,t]) =>
              <li key={t}><button onClick={()=>navigate(t)} className="hover:text-accent inline-flex items-center gap-2"><UI name="chevRight" className="w-3 h-3" />{l}</button></li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-5">Book Appointment</h4>
          <p className="text-white/60 text-sm mb-4">Patient safety is our utmost priority.</p>
          <div className="rounded-2xl grad-purple p-5">
            <div className="text-soft-lavender text-xs uppercase tracking-widest">Appointments</div>
            <a href={`tel:${HOSPITAL.appointments[0]}`} className="display font-bold text-xl block mt-1">{HOSPITAL.appointments[0]}</a>
            <a href={`tel:${HOSPITAL.appointments[1]}`} className="display font-bold text-xl block">{HOSPITAL.appointments[1]}</a>
            <Btn variant="white" size="sm" className="mt-3 w-full" onClick={()=>navigate('appointment')} iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Book Now</Btn>
          </div>
          <div className="mt-3 rounded-2xl bg-emergency p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0"><UI name="phone" className="w-5 h-5" /></div>
            <div className="min-w-0">
              <div className="text-white/80 text-[11px] uppercase tracking-widest">24/7 Emergency</div>
              <a href={`tel:${HOSPITAL.emergency}`} className="display font-bold whitespace-nowrap">{HOSPITAL.emergency}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div className="text-center md:text-left">© 2026 {HOSPITAL.name}. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2"><a href="#" className="hover:text-white whitespace-nowrap">Privacy Policy</a><a href="#" className="hover:text-white whitespace-nowrap">Terms & Conditions</a><a href="#" className="hover:text-white whitespace-nowrap">Sitemap</a></div>
        </div>
      </div>
    </footer>
  );
}

// Floating buttons (mobile emergency + WhatsApp)
export function FloatingActions({ navigate }) {
  return (
    <>
      <a href={`https://wa.me/91${HOSPITAL.emergency.replace(/\D/g,'').slice(-10)}`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-success text-white shadow-lg shadow-success/30 flex items-center justify-center hover:scale-105 transition">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.4L2 22l4.7-1.5A11 11 0 0 0 20.5 3.5zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.3-.5-.3h-.4a.9.9 0 0 0-.6.3 2.6 2.6 0 0 0-.8 2 4.5 4.5 0 0 0 1 2.4 10 10 0 0 0 3.9 3.4c2.4 1 2.4.7 2.8.7a2.3 2.3 0 0 0 1.6-1.1 1.9 1.9 0 0 0 .1-1.1c0-.1-.2-.2-.5-.3z"/></svg>
      </a>
      {/* Mobile emergency CTA */}
      <a href={`tel:${HOSPITAL.emergency}`} className="md:hidden fixed bottom-6 left-6 z-30 inline-flex items-center gap-2 px-4 h-12 rounded-full bg-emergency text-white shadow-lg shadow-emergency/30 font-semibold text-sm">
        <UI name="phone" className="w-4 h-4" /> Emergency
      </a>
    </>
  );
}

// Page banner (used by all interior pages)
function PageHero({ eyebrow, title, sub, crumbs = [] }) {
  return (
    <section className="relative bg-medical-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lavender/40 to-transparent"></div>
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full grad-purple opacity-10"></div>
      <div className="absolute -left-16 bottom-0 w-56 h-56 rounded-full bg-accent/20 blur-2xl"></div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10 py-16 md:py-20">
        {crumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-muted mb-4">
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && <UI name="chevRight" className="w-3 h-3" />}
                <span className={i === crumbs.length - 1 ? 'text-primary font-semibold' : ''}>{c}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-extrabold text-deep leading-[1.05] max-w-3xl">{title}</h1>
        {sub && <p className="mt-5 text-muted text-lg max-w-2xl leading-relaxed">{sub}</p>}
      </div>
    </section>
  );
}

Object.assign(window, { TopBar, Navbar, MobileNav, Footer, FloatingActions, PageHero });