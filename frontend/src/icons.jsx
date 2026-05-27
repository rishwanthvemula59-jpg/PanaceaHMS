import React from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, Modal } from './pages-admin.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';
import logoImg from './assets/logo.png';


// Inline SVG icons — medical + UI. Two sets:
//   <DeptIcon name="..." />  — outlined medical glyphs for departments
//   <UI name="..." />        — UI iconography (chevron, search, etc)
const stroke = (path, vb = '0 0 24 24', sw = 1.6) => ({className = 'w-6 h-6', color = 'currentColor'} = {}) => (
  <svg viewBox={vb} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{path}</svg>
);

const ICONS = {
  brain: stroke(<><path d="M9 5a3 3 0 0 0-3 3v.5A2.5 2.5 0 0 0 4 11v2a2.5 2.5 0 0 0 2 2.45V16a3 3 0 0 0 3 3h0a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM15 5a3 3 0 0 1 3 3v.5A2.5 2.5 0 0 1 20 11v2a2.5 2.5 0 0 1-2 2.45V16a3 3 0 0 1-3 3h0a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M11 9.5h2M11 13.5h2"/></>),
  heart: stroke(<><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z"/><path d="M3 12h3l1.5-2L10 14l2-4 1.5 2H21"/></>),
  medicine: stroke(<><rect x="6" y="3" width="12" height="6" rx="2"/><path d="M9 9v11a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9"/><path d="M12 12v6M9 15h6"/></>),
  trauma: stroke(<><path d="M12 2v6M12 22v-6M2 12h6M22 12h-6"/><circle cx="12" cy="12" r="3"/><path d="M5 5l3 3M19 5l-3 3M5 19l3-3M19 19l-3-3"/></>),
  kidney: stroke(<><path d="M8 4c-3 0-5 2-5 6s3 10 9 10 9-4 9-9-3-7-7-7c-2 0-3 1-3 2.5S8 4 8 4z"/><path d="M10 12c1.5-1 3.5-1 5 0"/></>),
  bone: stroke(<><path d="M6 4a2.5 2.5 0 0 1 4 1.5L18 14a2.5 2.5 0 1 1-1.5 4L8 9.5A2.5 2.5 0 1 1 6 4z"/></>),
  scalpel: stroke(<><path d="M3 21l8-8 5 5-8 8H3v-5z"/><path d="M14 10l7-7-2 5-5 2z"/></>),
  baby: stroke(<><circle cx="12" cy="8" r="4"/><path d="M6 22c0-3.5 2.5-6 6-6s6 2.5 6 6"/><path d="M10 8h0M14 8h0"/><path d="M10.5 10.5c.8.6 2.2.6 3 0"/></>),
  lung: stroke(<><path d="M12 4v8"/><path d="M12 12c-1-3-4-4-5.5-3S4 12 4 16c0 3 2 5 4 5 1.7 0 3-1 4-3"/><path d="M12 12c1-3 4-4 5.5-3S20 12 20 16c0 3-2 5-4 5-1.7 0-3-1-4-3"/></>),
  mind: stroke(<><path d="M12 21a8 8 0 0 0 8-8 7 7 0 0 0-10-6.5A6 6 0 0 0 4 12c0 2 .5 3 1.5 4l-.5 2 2-.5c1 .8 3 1 5 1.5"/><path d="M9 11h6M10 8h4M9.5 14h5"/></>),
  ent: stroke(<><path d="M9 4a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4 3 3 0 0 1-3-3"/><path d="M13 8h3l3-3M13 12h6M13 16h3l3 3"/></>),
  physio: stroke(<><circle cx="9" cy="5" r="2"/><path d="M9 7v6l-3 8M9 13l5 1 3 6M14 14l5-2"/></>),
  female: stroke(<><circle cx="12" cy="9" r="5"/><path d="M12 14v8M9 19h6"/></>),
  plastic: stroke(<><path d="M4 12c0-5 4-8 8-8s8 3 8 8c0 4-2 6-4 7l-2-2c1.5-1 3-2 3-5a5 5 0 1 0-10 0c0 3 1.5 4 3 5l-2 2c-2-1-4-3-4-7z"/><circle cx="12" cy="12" r="1.5"/></>),
  anesthesia: stroke(<><path d="M8 3h8M10 3v5M14 3v5"/><rect x="8" y="8" width="8" height="12" rx="2"/><path d="M11 13h2"/></>),
  xray: stroke(<><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M9 11h6M9 14l3 3 3-3"/></>),
  glucose: stroke(<><path d="M12 3l5 7a5 5 0 1 1-10 0z"/><path d="M9 16h6"/></>),
  apple: stroke(<><path d="M12 7c-1-2-3-3-5-2s-3 4-2 7 3 6 5 6 3-1 4-1 2 1 4 1 4-3 5-6-1-6-3-7-3.5 0-5 1z"/><path d="M12 7s0-3 3-4"/></>),
  flask: stroke(<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 14h8"/></>),
  microscope: stroke(<><path d="M6 21h14M9 21v-3M9 18a4 4 0 0 0 9-3M12 4l3 1-2 4-3-1z"/><path d="M9 9l3 1"/></>),
  blood: stroke(<><path d="M12 3s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12z"/><path d="M9 14a3 3 0 0 0 3 3"/></>),
  daycare: stroke(<><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M7 6V4M17 6V4M3 10h18"/><path d="M12 13v3M10.5 14.5h3"/></>),
  stomach: stroke(<><path d="M7 4v4a5 5 0 0 0 5 5h2a4 4 0 0 1 0 8H9"/><path d="M9 13l-1 4"/></>),
  skin: stroke(<><path d="M4 12c0-5 4-8 8-8s8 3 8 8-4 8-8 8-8-3-8-8z"/><path d="M8 11c1-1 2-1 3 0M13 11c1-1 2-1 3 0M9 16c1 1 4 1 6 0"/></>),
  // Facilities
  emergency: stroke(<><path d="M12 2v6M12 22v-4M2 12h6M22 12h-4"/><circle cx="12" cy="12" r="4"/><path d="M12 10v4M10 12h4"/></>),
  icu: stroke(<><rect x="3" y="8" width="18" height="11" rx="2"/><path d="M3 14h4l1-2 2 4 2-4 1 2h8"/><path d="M7 8V5h10v3"/></>),
  ct: stroke(<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M3 12h3M18 12h3M12 3v3M12 18v3"/></>),
  dialysis: stroke(<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/><circle cx="17" cy="16" r="2"/></>),
  lab: stroke(<><path d="M9 3h6v6l4 9a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-9z"/><path d="M9 13h6"/><circle cx="11" cy="16" r="1"/></>),
  pharmacy: stroke(<><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 7v10M7 12h10"/></>),
  ot: stroke(<><rect x="3" y="9" width="18" height="10" rx="2"/><path d="M5 9V6h14v3"/><path d="M8 13h2M14 13h2M8 16h8"/></>),
  diagnostic: stroke(<><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 12h2l1-2 2 4 2-4 1 2h4"/></>),
  ambulance: stroke(<><rect x="2" y="8" width="14" height="9" rx="2"/><path d="M16 11h3l2 3v3h-5"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M8 12v-2M7 11h2"/></>),
  // UI
  phone: stroke(<><path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z"/></>),
  mail: stroke(<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>),
  pin: stroke(<><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></>),
  clock: stroke(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  search: stroke(<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></>),
  chevDown: stroke(<><path d="M6 9l6 6 6-6"/></>),
  chevRight: stroke(<><path d="M9 6l6 6-6 6"/></>),
  arrowRight: stroke(<><path d="M5 12h14M13 6l6 6-6 6"/></>),
  check: stroke(<><path d="M5 12l4 4 10-10"/></>),
  checkCircle: stroke(<><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>),
  star: stroke(<><path d="M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></>),
  whatsapp: stroke(<><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.1-5.3A8.5 8.5 0 1 1 21 11.5z"/><path d="M8 9c0 4 3 7 7 7l1.5-1.5-2-1L13 14a4 4 0 0 1-3-3l.5-1.5-1-2L8 8z"/></>),
  menu: stroke(<><path d="M4 6h16M4 12h16M4 18h16"/></>),
  close: stroke(<><path d="M6 6l12 12M18 6L6 18"/></>),
  shield: stroke(<><path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></>),
  user: stroke(<><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>),
  doctor: stroke(<><circle cx="12" cy="8" r="3.5"/><path d="M6 21v-2a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2"/><path d="M9 15.5V18a3 3 0 0 0 6 0v-2.5"/><path d="M12 18v3"/></>),
  calendar: stroke(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>),
  filter: stroke(<><path d="M4 5h16l-6 8v6l-4-2v-4z"/></>),
  bell: stroke(<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></>),
  dashboard: stroke(<><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/></>),
  settings: stroke(<><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.4l2-1.4-2-3.5-2.3.9a7 7 0 0 0-2.4-1.4L13.5 3h-3l-.7 2.2a7 7 0 0 0-2.4 1.4l-2.3-.9-2 3.5 2 1.4A7 7 0 0 0 5 12c0 .5 0 1 .1 1.4l-2 1.4 2 3.5 2.3-.9a7 7 0 0 0 2.4 1.4l.7 2.2h3l.7-2.2a7 7 0 0 0 2.4-1.4l2.3.9 2-3.5-2-1.4c.1-.4.1-.9.1-1.4z"/></>),
  logout: stroke(<><path d="M9 4h-3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/><path d="M16 17l5-5-5-5M21 12H9"/></>),
  eye: stroke(<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>),
  edit: stroke(<><path d="M4 21h4l11-11-4-4L4 17v4z"/><path d="M14 6l4 4"/></>),
  trash: stroke(<><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><path d="M10 11v7M14 11v7"/></>),
  plus: stroke(<><path d="M12 5v14M5 12h14"/></>),
  appointments: stroke(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><path d="M8 13h3M8 17h6"/></>),
  inbox: stroke(<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 14h5l1 2h6l1-2h5"/></>),
  money: stroke(<><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v5M18 9.5v5"/></>),
  article: stroke(<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>),
  building: stroke(<><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/></>),
};

export function DeptIcon({ name, className = 'w-7 h-7', color = 'currentColor' }) {
  const C = ICONS[name] || ICONS.medicine;
  return <C className={className} color={color} />;
}
export function UI({ name, className = 'w-5 h-5', color = 'currentColor' }) {
  const C = ICONS[name];
  if (!C) return null;
  return <C className={className} color={color} />;
}

// Logo — recreates the PMH mark + wordmark in inline SVG
function Logo({ variant = 'dark', size = 36 }) {
  const wordColor = variant === 'light' ? '#fff' : '#5B1A7A';
  const subColor = variant === 'light' ? '#EAD7FF' : '#7C2BA3';
  return (
    <div className="flex items-center gap-3 shrink-0">
      <img src={logoImg} alt="Panacea Meridian Hospitals Logo" style={{ width: size, height: size }} className="shrink-0 object-contain" />
      <div className="leading-none whitespace-nowrap">
        <div className="display font-extrabold tracking-tight" style={{color: wordColor, fontSize: Math.round(size * 0.40), letterSpacing: '-0.01em'}}>PANACEA MERIDIAN</div>
        <div className="display font-bold" style={{color: subColor, fontSize: Math.round(size * 0.26), letterSpacing: '0.32em', marginTop: 4}}>HOSPITALS</div>
      </div>
    </div>
  );
}

Object.assign(window, { DeptIcon, UI, Logo, ICONS });