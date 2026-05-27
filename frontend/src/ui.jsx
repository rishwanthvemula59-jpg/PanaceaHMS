import React from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { DeptIcon, UI } from './icons.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, Modal } from './pages-admin.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';


// UI primitives — buttons, badges, image placeholders, sections, inputs

export function Btn({ as = 'button', variant = 'primary', size = 'md', children, icon, iconRight, className = '', ...props }) {
  const sizes = { sm: 'px-3 py-2 text-[13px]', md: 'px-5 py-2.5 text-[14px]', lg: 'px-6 py-3.5 text-[15px]' };
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    emergency: 'btn-emergency',
    dark: 'bg-deep text-white hover:bg-navy',
    white: 'bg-white text-deep hover:bg-soft-lavender border border-soft-lavender',
    softPurple: 'bg-soft-lavender text-primary hover:bg-lavender',
  };
  const Tag = as;
  return (
    <Tag {...props} className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none whitespace-nowrap ${sizes[size]} ${variants[variant]} ${className}`}>
      {icon && <span className="-ml-0.5">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="-mr-0.5">{iconRight}</span>}
    </Tag>
  );
}

export function Badge({ children, tone = 'purple', className = '' }) {
  const tones = {
    purple: 'bg-soft-lavender text-primary',
    deep: 'bg-deep text-white',
    navy: 'bg-navy text-white',
    success: 'bg-success/10 text-success border border-success/20',
    danger: 'bg-emergency/10 text-emergency border border-emergency/20',
    warn: 'bg-amber-100 text-amber-700 border border-amber-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-100',
    neutral: 'bg-gray-100 text-gray-700',
    outline: 'border border-soft-lavender text-primary',
  };
  return <span className={`chip ${tones[tone]} ${className}`}>{children}</span>;
}

export function StatusBadge({ status }) {
  const map = {
    Pending: 'warn', Confirmed: 'info', Completed: 'success', Cancelled: 'danger', Emergency: 'danger',
    New: 'info', Contacted: 'warn', Closed: 'success', Active: 'success', Inactive: 'neutral',
  };
  return <Badge tone={map[status] || 'neutral'}>{status}</Badge>;
}

// Img — real photo with graceful fallback to striped placeholder if URL fails
export function Img({ src, alt = '', label, className = '', aspect = '4 / 3', tone = 'light', overlay = false }) {
  const [err, setErr] = React.useState(false);
  if (err || !src) return <PH label={label || alt} aspect={aspect} className={className} tone={tone} />;
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-soft-lavender ${className}`} style={{aspectRatio: aspect}}>
      <img src={src} alt={alt} loading="lazy" onError={()=>setErr(true)}
           className="absolute inset-0 w-full h-full object-cover" />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-deep/10 to-transparent"></div>}
    </div>
  );
}

// Image placeholders — striped, with a caption explaining what should go here
export function PH({ label, className = '', aspect = '4 / 3', tone = 'light' }) {
  const bg = tone === 'dark' ? 'bg-deep ph-stripe-dark text-white/70' : 'ph-stripe text-primary/70';
  return (
    <div className={`relative overflow-hidden rounded-2xl ${bg} ${className}`} style={{aspectRatio: aspect}}>
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <span className="font-mono text-[11px] tracking-widest uppercase opacity-80">{label}</span>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 rounded-2xl"></div>
    </div>
  );
}

// Section wrapper
export function Section({ children, className = '', bg = 'white', id }) {
  const bgs = { white: 'bg-white', lavender: 'bg-lavender', soft: 'bg-soft-lavender/30', medical: 'bg-medical-pattern', deep: 'bg-deep text-white', navy: 'bg-navy text-white' };
  return <section id={id} className={`${bgs[bg]} ${className}`}>{children}</section>;
}
export function Container({ children, className = '' }) {
  return <div className={`mx-auto max-w-7xl px-5 sm:px-7 lg:px-10 ${className}`}>{children}</div>;
}
export function SectionEyebrow({ children }) {
  return <div className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{children}</div>;
}
export function SectionTitle({ children, className = '' }) {
  return <h2 className={`display text-3xl md:text-4xl lg:text-[44px] font-bold text-deep leading-[1.1] ${className}`}>{children}</h2>;
}
export function SectionSub({ children, className = '' }) {
  return <p className={`text-muted text-base md:text-lg leading-relaxed max-w-2xl ${className}`}>{children}</p>;
}

// Form inputs
export function Field({ label, error, hint, children, required }) {
  return (
    <div>
      {label && <label className="label">{label}{required && <span className="text-emergency"> *</span>}</label>}
      {children}
      {hint && !error && <p className="text-xs text-muted mt-1.5">{hint}</p>}
      {error && <p className="text-xs text-emergency mt-1.5">{error}</p>}
    </div>
  );
}
export function Input(props) { return <input {...props} className={`field ${props.className||''}`} />; }
export function Textarea(props) { return <textarea {...props} className={`field min-h-[110px] resize-none ${props.className||''}`} />; }
export function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select {...props} className={`field pr-9 appearance-none ${props.className||''}`}>{children}</select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"><UI name="chevDown" className="w-4 h-4" /></div>
    </div>
  );
}

// Stat card (admin)
export function StatCard({ label, value, delta, icon, tone = 'purple' }) {
  const tones = {
    purple: 'bg-soft-lavender/60 text-primary',
    navy: 'bg-navy/10 text-navy',
    success: 'bg-success/10 text-success',
    danger: 'bg-emergency/10 text-emergency',
    warn: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-50 text-blue-700',
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-muted font-semibold">{label}</div>
          <div className="display text-3xl font-bold text-deep mt-1.5">{value}</div>
          {delta && <div className={`text-xs mt-1.5 font-semibold ${delta.startsWith('+') ? 'text-success' : 'text-emergency'}`}>{delta} vs last week</div>}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tones[tone]}`}>{icon}</div>
      </div>
    </div>
  );
}