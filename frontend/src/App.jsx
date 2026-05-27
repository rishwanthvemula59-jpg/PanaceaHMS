import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { DeptIcon, UI } from './icons.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, AdminMessagesPage, Modal } from './pages-admin.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';

// Premium Toast component
function Toast({ message, type, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-[#4C1D95] text-white border-[#6D28D9]',
    error: 'bg-[#DC2626] text-white border-[#B91C1C]',
    info: 'bg-[#2E1065] text-white border-[#4C1D95]',
  };

  const icons = {
    success: 'checkCircle',
    error: 'close',
    info: 'bell',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl fade-up max-w-sm ${styles[type] || styles.success}`}>
      <span className="flex-shrink-0"><UI name={icons[type]} className="w-5 h-5 text-white" /></span>
      <span className="text-[13.5px] font-semibold flex-1 leading-snug">{message}</span>
      <button onClick={onClose} className="hover:opacity-75 p-0.5"><UI name="close" className="w-4 h-4 text-white" /></button>
    </div>
  );
}

// Premium Confirm Dialog component
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-[#0F0A1A]/70 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-white rounded-3xl shadow-cardHover w-full max-w-sm p-6 text-center fade-up">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-soft-lavender text-primary flex items-center justify-center mb-4">
          <UI name="shield" className="w-6 h-6" />
        </div>
        <h3 className="display text-[18px] font-bold text-deep mb-2">Confirm Action</h3>
        <p className="text-muted text-sm leading-relaxed mb-6">{message}</p>
        <div className="flex justify-center gap-2">
          <Btn variant="ghost" size="sm" onClick={onCancel}>Cancel</Btn>
          <Btn variant="primary" size="sm" onClick={onConfirm}>Confirm</Btn>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [openMobile, setOpenMobile] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = React.useState(null);
  const [confirm, setConfirm] = React.useState(null);

  React.useEffect(() => {
    window.toast = (message, type = 'success') => {
      setToast({ message, type });
    };
    window.showConfirm = (message, onConfirm) => {
      setConfirm({ message, onConfirm });
    };
    return () => {
      delete window.toast;
      delete window.showConfirm;
    };
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const isAdmin = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  const isAdminLogin = location.pathname === '/admin/login';

  // Custom navigate wrapper to support old navigate('home', { id: 1 }) signature safely
  const customNavigate = React.useCallback((to, p = {}) => {
    setOpenMobile(false);
    let path = '/';
    if (to === 'home') path = '/';
    else if (to === 'doctor' && p.id) path = '/doctor/' + p.id;
    else if (to === 'appointment' && p.doctorId) path = '/appointment?doctorId=' + p.doctorId;
    else if (to === 'admin-login') path = '/admin/login';
    else if (to === 'admin') path = '/admin';
    else if (to.startsWith('admin-')) path = '/admin/' + to.replace('admin-', '');
    else path = '/' + to;
    navigate(path);
  }, [navigate]);

  React.useEffect(() => {
    if (isAdmin && !localStorage.getItem('admin_token')) {
      customNavigate('admin-login');
    }
  }, [location.pathname, isAdmin, customNavigate]);

  if (isAdmin || isAdminLogin) {
    return (
      <>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage navigate={customNavigate} />} />
          <Route path="/admin" element={<AdminDashboard navigate={customNavigate} />} />
          <Route path="/admin/appointments" element={<AdminAppointmentsPage navigate={customNavigate} />} />
          <Route path="/admin/doctors" element={<AdminDoctorsPage navigate={customNavigate} />} />
          <Route path="/admin/departments" element={<AdminDepartmentsPage navigate={customNavigate} />} />
          <Route path="/admin/fees" element={<AdminFeesPage navigate={customNavigate} />} />
          <Route path="/admin/settings" element={<AdminSettingsPage navigate={customNavigate} />} />
          <Route path="/admin/blog" element={<AdminBlogPage navigate={customNavigate} />} />
          <Route path="/admin/messages" element={<AdminMessagesPage navigate={customNavigate} />} />
        </Routes>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        {confirm && (
          <ConfirmDialog
            message={confirm.message}
            onConfirm={() => {
              confirm.onConfirm();
              setConfirm(null);
            }}
            onCancel={() => setConfirm(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar route={location.pathname.slice(1) || 'home'} navigate={customNavigate} openMobile={openMobile} setOpenMobile={setOpenMobile} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage navigate={customNavigate} />} />
          <Route path="/about" element={<AboutPage navigate={customNavigate} />} />
          <Route path="/departments" element={<DepartmentsPage navigate={customNavigate} />} />
          <Route path="/doctors" element={<DoctorsPage navigate={customNavigate} />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage navigate={customNavigate} />} />
          <Route path="/appointment" element={<AppointmentPage navigate={customNavigate} />} />
          <Route path="/fees" element={<FeesPage navigate={customNavigate} />} />
          <Route path="/facilities" element={<FacilitiesPage navigate={customNavigate} />} />
          <Route path="/contact" element={<ContactPage navigate={customNavigate} />} />
          <Route path="/blog" element={<BlogPage navigate={customNavigate} />} />
        </Routes>
      </main>
      <Footer navigate={customNavigate} />
      <FloatingActions navigate={customNavigate} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={() => {
            confirm.onConfirm();
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}

export default App;
