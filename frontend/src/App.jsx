import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { DeptIcon, UI } from './icons.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage, Modal } from './pages-admin.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';

function App() {
  const [openMobile, setOpenMobile] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        </Routes>
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
    </>
  );
}

export default App;
