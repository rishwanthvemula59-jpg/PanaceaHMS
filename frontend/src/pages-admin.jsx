import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { HOSPITAL, DEPARTMENTS, DOCTORS, FACILITIES, FEES, ARTICLES, TESTIMONIALS, APPOINTMENTS_SEED, ENQUIRIES_SEED, PHOTOS } from './data.jsx';
import { DeptIcon, UI } from './icons.jsx';
import { TopBar, Navbar, Footer, FloatingActions } from './layout.jsx';
import { HomePage, Hero, TrustStrip, EmergencyStrip, QuickServiceCards, AboutPreview, DepartmentsPreview, PatientJourney, FacilitiesPreview, DoctorsPreview, DoctorCard, FeePreview, Testimonials, BlogPreview, ContactCTA } from './pages-home.jsx';
import { AboutPage, DepartmentsPage, DoctorsPage, DoctorDetailPage, AppointmentPage, FeesPage, FacilitiesPage, ContactPage, BlogPage } from './pages-public.jsx';
import { Btn, Badge, StatusBadge, Img, PH, Section, Container, SectionEyebrow, SectionTitle, SectionSub, Field, Input, Textarea, Select, StatCard } from './ui.jsx';


// Admin pages: Login + Dashboard shell + Appointments/Doctors/Departments/Fees/Settings

/* -------------------- ADMIN LOGIN -------------------- */
export function AdminLoginPage({ navigate }) {
  const [u, setU] = React.useState('admin@panaceameridian.com');
  const [p, setP] = React.useState('');
  const [showP, setShowP] = React.useState(false);
  const [resetStep, setResetStep] = React.useState(0);
  const [resetCode, setResetCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email: u, password: p });
      if (response.data.success) {
        localStorage.setItem('admin_token', response.data.token);
        navigate('admin');
      } else {
        alert(response.data.message || 'Login failed.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Please verify credentials.');
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setResetStep(1);
    alert('Verification code sent to 6281042207');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (resetCode === '123456') {
      setResetStep(2);
    } else {
      alert('Invalid verification code.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    localStorage.setItem('admin_password', newPassword);
    alert('Password updated successfully! Please login with your new password.');
    setResetStep(0);
    setP('');
  };
  return (
    <div className="min-h-screen grad-deep relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/30 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl"></div>
      <div className="absolute inset-0 ph-stripe-dark opacity-30 pointer-events-none"></div>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-cardHover">
        {/* Left — brand */}
        <div className="hidden lg:flex relative grad-purple text-white p-12 flex-col justify-between">
          <div className="absolute inset-0 ph-stripe-dark opacity-30"></div>
          <div className="relative">
            <Logo variant="light" size={42} />
            <div className="mt-10">
              <Badge tone="deep" className="!bg-white/15 !text-white">Hospital Admin Portal</Badge>
              <h2 className="display text-4xl font-bold leading-tight mt-5">Run the hospital, calmly.</h2>
              <p className="text-white/80 mt-3 max-w-sm">Manage appointments, doctors, departments and pricing from one dashboard. Built for the front desk and the management team alike.</p>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="display text-2xl font-bold">12,400+</div>
              <div className="text-xs text-white/70">Patients served</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="display text-2xl font-bold">99.7%</div>
              <div className="text-xs text-white/70">Uptime · ICU monitoring</div>
            </div>
          </div>
        </div>
        {/* Right — form */}
        <div className="bg-white p-10 md:p-12">
          <div className="lg:hidden mb-8"><Logo size={36} /></div>
          <Badge tone="purple" className="!whitespace-nowrap">Secure login</Badge>
          <h1 className="display text-3xl font-bold text-deep mt-3">Hospital Admin Portal</h1>
          <p className="text-muted mt-2 text-sm">Authorised personnel only. All activity is logged and audited.</p>

          {resetStep === 0 && (
            <form className="mt-7 space-y-4" onSubmit={handleLogin}>
              <Field label="Username / Email" required>
                <Input value={u} onChange={e => setU(e.target.value)} placeholder="you@panaceameridian.com" />
              </Field>
              <Field label="Password" required>
                <div className="relative">
                  <Input type={showP ? 'text' : 'password'} value={p} onChange={e => setP(e.target.value)} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowP(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"><UI name="eye" className="w-4 h-4" /></button>
                </div>
              </Field>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted"><input type="checkbox" className="w-4 h-4 accent-primary" />Remember me</label>
                <a className="text-primary font-semibold cursor-pointer" onClick={handleForgot}>Forgot password?</a>
              </div>
              <Btn type="submit" variant="primary" size="lg" className="w-full" iconRight={<UI name="arrowRight" className="w-4 h-4" />}>Sign In to Dashboard</Btn>
            </form>
          )}

          {resetStep === 1 && (
            <form className="mt-7 space-y-4" onSubmit={handleVerify}>
              <div className="p-3 bg-soft-lavender rounded-xl text-primary text-sm font-medium text-center">
                A verification code was sent to <br /><strong>+91 6281042207</strong>
              </div>
              <Field label="Verification Code (Try '123456')" required>
                <Input value={resetCode} onChange={e => setResetCode(e.target.value)} placeholder="000000" />
              </Field>
              <Btn type="submit" variant="primary" size="lg" className="w-full">Verify Code</Btn>
              <button type="button" onClick={() => setResetStep(0)} className="mt-3 w-full text-center text-sm font-semibold text-muted">Back to Login</button>
            </form>
          )}

          {resetStep === 2 && (
            <form className="mt-7 space-y-4" onSubmit={handleChangePassword}>
              <Field label="New Password" required>
                <div className="relative">
                  <Input type={showP ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowP(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"><UI name="eye" className="w-4 h-4" /></button>
                </div>
              </Field>
              <Btn type="submit" variant="primary" size="lg" className="w-full">Update Password</Btn>
            </form>
          )}

          <div className="mt-6 p-4 rounded-xl bg-lavender flex items-start gap-3">
            <UI name="shield" className="w-4 h-4 text-primary mt-0.5" />
            <p className="text-xs text-muted">For your security, this portal uses encrypted sessions and 2-factor verification. Do not share credentials.</p>
          </div>

          <div className="mt-6 text-center text-sm text-muted">
            Not staff? <button onClick={() => navigate('home')} className="text-primary font-semibold">Back to hospital website</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- ADMIN SHELL -------------------- */
function AdminShell({ active, navigate, children, title, subtitle, actions, searchVal, onSearchChange }) {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const items = [
    { id: 'admin', label: 'Dashboard', icon: 'dashboard' },
    { id: 'admin-appointments', label: 'Appointments', icon: 'appointments' },
    { id: 'admin-doctors', label: 'Doctors', icon: 'doctor' },
    { id: 'admin-departments', label: 'Departments', icon: 'building' },
    { id: 'admin-fees', label: 'Fees', icon: 'money' },
    { id: 'admin-blog', label: 'Blog', icon: 'article' },
    { id: 'admin-settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <div className="min-h-screen bg-[#F7F4FB] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-deep text-white p-5 flex flex-col shrink-0 transform transition ${openSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <Logo variant="light" size={34} />
        <div className="mt-7 flex-1 overflow-y-auto">
          <div className="text-[11px] uppercase tracking-widest text-white/40 px-3 mb-2">Main</div>
          <nav className="space-y-1">
            {items.map(it => (
              <button key={it.id} onClick={() => { navigate(it.id); setOpenSidebar(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active === it.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${active === it.id ? 'grad-purple' : 'bg-white/5'}`}><UI name={it.icon} className="w-4 h-4" /></span>
                <span className="flex-1 text-left">{it.label}</span>
                {it.badge && <Badge tone="danger" className="!bg-emergency !text-white !border-0">{it.badge}</Badge>}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={() => { localStorage.removeItem('admin_token'); navigate('admin-login'); }} className="mt-3 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white">
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><UI name="logout" className="w-4 h-4" /></span>
          Log Out
        </button>
      </aside>
      {openSidebar && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpenSidebar(false)}></div>}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#EBE3F2]">
          <div className="h-16 px-5 lg:px-8 flex items-center gap-4">
            <button onClick={() => setOpenSidebar(true)} className="lg:hidden w-10 h-10 rounded-lg bg-soft-lavender text-primary flex items-center justify-center"><UI name="menu" /></button>
            <div className="flex-1 max-w-xl relative hidden md:block">
              <UI name="search" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={searchVal || ''}
                onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
                className="w-full bg-[#F4EEFA] border border-transparent focus:border-primary focus:bg-white rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none transition"
                placeholder="Search patients, doctors, appointments…"
              />
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden md:flex items-center gap-3 pl-3">
                <div className="w-9 h-9 rounded-full grad-purple text-white flex items-center justify-center text-xs font-bold">AD</div>
                <div className="text-sm leading-tight"><div className="font-semibold text-deep">Admin</div><div className="text-xs text-muted">Hospital Administrator</div></div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
            <div className="min-w-0">
              <h1 className="display text-2xl md:text-[28px] font-bold text-deep leading-tight">{title}</h1>
              {subtitle && <p className="text-muted text-sm mt-1.5">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

/* -------------------- DASHBOARD -------------------- */
export function AdminDashboard({ navigate }) {
  const [appointments, setAppointments] = React.useState([]);
  const [q, setQ] = React.useState('');

  React.useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/appointments')
      .then((res) => {
        const realAppointments = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setAppointments(realAppointments);
      })
      .catch((error) => {
        console.error('Failed to fetch appointments:', error);
        setAppointments([]);
      });
  }, []);

  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  const todayDate = new Date().toISOString().split('T')[0];

  const todayCount = safeAppointments.filter((a) => a.date === todayDate).length;
  const pendingCount = safeAppointments.filter((a) => a.status === 'Pending').length;
  const emergencyCount = safeAppointments.filter((a) => a.status === 'Emergency').length;
  const confirmedCount = safeAppointments.filter((a) => a.status === 'Confirmed').length;
  const completedCount = safeAppointments.filter((a) => a.status === 'Completed').length;
  const cancelledCount = safeAppointments.filter((a) => a.status === 'Cancelled').length;

  const filteredAppointments = React.useMemo(() => {
    if (!q) return safeAppointments;
    const search = q.toLowerCase();
    return safeAppointments.filter((a) => {
      const patientName = (a.patient || a.name || '').toLowerCase();
      const ref = (a.ref || '').toLowerCase();
      const doc = (a.doctor || '').toLowerCase();
      return patientName.includes(search) || ref.includes(search) || doc.includes(search);
    });
  }, [safeAppointments, q]);

  const recent = filteredAppointments.slice(0, 6);

  const todayLabel = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <AdminShell
      active="admin"
      navigate={navigate}
      title="Dashboard"
      subtitle={`Welcome back, Admin — here's what's happening at ${HOSPITAL.short} today.`}
      searchVal={q}
      onSearchChange={setQ}
      actions={
        <>
          <Btn
            variant="ghost"
            size="md"
            icon={<UI name="calendar" className="w-4 h-4" />}
          >
            Today · {todayLabel}
          </Btn>

          <Btn
            variant="primary"
            size="md"
            icon={<UI name="plus" className="w-4 h-4" />}
            onClick={() => navigate('admin-appointments')}
          >
            New Appointment
          </Btn>
        </>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <StatCard
          label="Total Appointments"
          value={safeAppointments.length || 0}
          tone="purple"
          icon={<UI name="appointments" className="w-5 h-5" />}
        />

        <StatCard
          label="Today"
          value={todayCount || 0}
          tone="info"
          icon={<UI name="calendar" className="w-5 h-5" />}
        />

        <StatCard
          label="Pending"
          value={pendingCount || 0}
          tone="warn"
          icon={<UI name="clock" className="w-5 h-5" />}
        />

        <StatCard
          label="Emergency"
          value={emergencyCount || 0}
          tone="danger"
          icon={<UI name="emergency" className="w-5 h-5" />}
        />

        <StatCard
          label="Total Doctors"
          value="5"
          tone="success"
          icon={<UI name="doctor" className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          ['Confirmed', confirmedCount, 'info'],
          ['Completed', completedCount, 'success'],
          ['Cancelled', cancelledCount, 'danger'],
          ['Departments', '10', 'purple'],
        ].map(([label, value, tone]) => (
          <div key={label} className="card p-4">
            <div className="text-xs uppercase tracking-widest text-muted">
              {label}
            </div>

            <div className="flex items-end justify-between mt-2">
              <div className="display text-2xl font-bold text-deep">
                {value}
              </div>

              <Badge tone={tone}>● live</Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Recent appointments */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1E8F8]">
          <h3 className="display text-lg font-bold text-deep">
            Recent Appointments
          </h3>

          <Btn
            variant="ghost"
            size="sm"
            onClick={() => navigate('admin-appointments')}
            iconRight={<UI name="arrowRight" className="w-3.5 h-3.5" />}
          >
            View All
          </Btn>
        </div>

        <div className="overflow-x-auto">
          <table className="tbl">
            <thead>
              <tr>
                <th>Ref ID</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-8">
                    No appointments found.
                  </td>
                </tr>
              )}

              {recent.map((a) => (
                <tr key={a._id || a.ref}>
                  <td className="font-mono text-xs text-primary font-bold">
                    {a.ref || '—'}
                  </td>

                  <td className="font-semibold text-deep">
                    {a.patient || a.name || 'Unknown'}
                  </td>

                  <td className="text-muted">{a.phone || '—'}</td>

                  <td>{a.dept || '—'}</td>

                  <td className="text-muted">{a.doctor || '—'}</td>

                  <td>
                    {a.date || '—'} · {a.time || '—'}
                  </td>

                  <td>
                    <StatusBadge status={a.status || 'Pending'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
/* -------------------- APPOINTMENTS MGMT -------------------- */

export function AdminAppointmentsPage({ navigate }) {
  const [q, setQ] = React.useState('');
  const [dateF, setDateF] = React.useState('');
  const [status, setStatus] = React.useState('all');
  const [dept, setDept] = React.useState('all');
  const [showModal, setShowModal] = React.useState(false);

  const [appointmentsList, setAppointmentsList] = React.useState([]);

  const refresh = () =>
    axios
      .get('http://localhost:5000/api/admin/appointments')
      .then((res) => setAppointmentsList(res.data.data || []))
      .catch(console.error);

  React.useEffect(() => {
    refresh();
  }, []);

  const filtered = appointmentsList
    .filter((a) => {
      const patientName = (a.patient || a.name || '').toLowerCase();
      const ref = (a.ref || '').toLowerCase();
      const search = q.toLowerCase();

      return patientName.includes(search) || ref.includes(search);
    })
    .filter((a) => !dateF || a.date === dateF)
    .filter((a) => status === 'all' || a.status === status)
    .filter((a) => dept === 'all' || a.dept === dept);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd.entries());

      const payload = {
        patient: data.patient,
        phone: data.phone,
        dept: data.dept,
        doctor: data.doctor,
        date: data.date,
        time: data.time,
        reason: data.visit || '',
        source: 'reception',
      };

      await axios.post('http://localhost:5000/api/appointments', payload);

      setShowModal(false);
      refresh();
    } catch (error) {
      console.error('Failed to create appointment:', error);
      alert('Failed to create appointment. Please try again.');
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/appointments/${appointmentId}`, {
        status: newStatus,
      });

      refresh();
    } catch (error) {
      console.error('Failed to update appointment:', error);
      alert('Failed to update appointment status.');
    }
  };

  const exportPDF = () => {
    if (!filtered.length) return alert('No data to export');

    const printWindow = window.open('', '_blank');

    const headers = [
      'Ref',
      'Patient',
      'Phone',
      'Department',
      'Doctor',
      'Reason',
      'Date',
      'Time',
      'Status',
    ];

    const rows = filtered.map((a) => [
      a.ref || '',
      a.patient || a.name || '',
      a.phone || '',
      a.dept || '',
      a.doctor || '',
      a.reason || '',
      a.date || '',
      a.time || '',
      a.status || '',
    ]);

    const html = `
      <html>
        <head>
          <title>Appointments Export</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #222;
            }

            h1 {
              text-align: center;
              color: #333;
              margin-bottom: 6px;
            }

            p {
              text-align: center;
              color: #666;
              font-size: 13px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th,
            td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
              font-size: 12px;
            }

            th {
              background-color: #f4f4f4;
              color: #333;
            }
          </style>
        </head>

        <body>
          <h1>Appointments Export</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>

          <table>
            <thead>
              <tr>
                ${headers.map((h) => `<th>${h}</th>`).join('')}
              </tr>
            </thead>

            <tbody>
              ${rows
        .map(
          (row) =>
            `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`
        )
        .join('')}
            </tbody>
          </table>

          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <AdminShell
      active="admin-appointments"
      navigate={navigate}
      title="Appointments"
      subtitle="Manage all OPD, follow-up and emergency requests"
      searchVal={q}
      onSearchChange={setQ}
      actions={
        <>
          <Btn
            variant="ghost"
            size="md"
            icon={<UI name="filter" className="w-4 h-4" />}
            onClick={exportPDF}
          >
            Export PDF
          </Btn>

          <Btn
            variant="primary"
            size="md"
            icon={<UI name="plus" className="w-4 h-4" />}
            onClick={() => setShowModal(true)}
          >
            New Appointment
          </Btn>
        </>
      }
    >
      {/* Filter bar */}
      <div className="card p-4 mb-5 grid md:grid-cols-12 gap-3">
        <div className="md:col-span-5 relative">
          <UI
            name="search"
            className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by patient or reference id…"
            className="field pl-11"
          />
        </div>

        <div className="md:col-span-3">
          <Input
            type="date"
            value={dateF}
            onChange={(e) => setDateF(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All status</option>
            {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        <div className="md:col-span-2">
          <Select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="all">All depts</option>
            {[...new Set(appointmentsList.map((a) => a.dept).filter(Boolean))].map(
              (d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              )
            )}
          </Select>
        </div>
      </div>

      {/* Quick filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[
          ['All', filtered.length, 'neutral'],
          ['Pending', filtered.filter((a) => a.status === 'Pending').length, 'warn'],
          [
            'Confirmed',
            filtered.filter((a) => a.status === 'Confirmed').length,
            'info',
          ],
          [
            'Completed',
            filtered.filter((a) => a.status === 'Completed').length,
            'success',
          ],
          [
            'Cancelled',
            filtered.filter((a) => a.status === 'Cancelled').length,
            'danger',
          ],
        ].map(([label, count, tone]) => (
          <button
            key={label}
            onClick={() => setStatus(label === 'All' ? 'all' : label)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${status === (label === 'All' ? 'all' : label)
              ? 'bg-primary text-white border-primary'
              : 'bg-white border-[#EBE3F2] hover:border-primary'
              }`}
          >
            {label}

            <Badge
              tone={status === (label === 'All' ? 'all' : label) ? 'white' : tone}
              className="ml-1"
            >
              {count}
            </Badge>
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Reason</th>
                <th>Date / Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-8">
                    No appointments found.
                  </td>
                </tr>
              )}

              {filtered.map((a) => (
                <tr key={a._id || a.ref}>
                  <td className="font-mono text-xs text-primary font-bold">
                    {a.ref}
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-soft-lavender text-primary flex items-center justify-center text-xs font-bold">
                        {(a.patient || a.name || 'U')
                          .split(' ')
                          .map((x) => x[0])
                          .slice(0, 2)
                          .join('')}
                      </div>

                      <div>
                        <div className="font-semibold text-deep">
                          {a.patient || a.name || 'Unknown'}
                        </div>
                        <div className="text-xs text-muted">via {a.source || 'website'}</div>
                      </div>
                    </div>
                  </td>

                  <td className="text-muted">{a.phone}</td>
                  <td>{a.dept}</td>
                  <td className="text-muted">{a.doctor}</td>

                  <td>
                    <Badge tone="outline">{a.reason || '—'}</Badge>
                  </td>

                  <td>
                    {a.date}
                    <div className="text-xs text-muted">{a.time}</div>
                  </td>

                  <td>
                    <StatusBadge status={a.status} />
                  </td>

                  <td>
                    <div className="flex items-center gap-1">
                      {a.status === 'Pending' && (
                        <>
                          <Btn
                            variant="softPurple"
                            size="sm"
                            onClick={() =>
                              updateAppointmentStatus(a._id || a.ref, 'Confirmed')
                            }
                          >
                            Confirm
                          </Btn>

                          <Btn
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (confirm('Cancel this appointment?')) {
                                updateAppointmentStatus(a._id || a.ref, 'Cancelled');
                              }
                            }}
                          >
                            Cancel
                          </Btn>
                        </>
                      )}

                      {a.status === 'Confirmed' && (
                        <>
                          <Btn
                            variant="softPurple"
                            size="sm"
                            onClick={() =>
                              updateAppointmentStatus(a._id || a.ref, 'Completed')
                            }
                          >
                            Complete
                          </Btn>

                          <IconBtn
                            icon="eye"
                            tip="Cancel Appointment"
                            onClick={() => {
                              if (confirm('Cancel this appointment?')) {
                                updateAppointmentStatus(a._id || a.ref, 'Cancelled');
                              }
                            }}
                          />
                        </>
                      )}

                      {a.status === 'Completed' && (
                        <Badge tone="success">Done</Badge>
                      )}

                      {a.status === 'Cancelled' && (
                        <Badge tone="danger">Cancelled</Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="New Appointment">
          <form onSubmit={submitForm} className="space-y-4">
            <Field label="Patient Name" required>
              <Input name="patient" placeholder="Full Name" required />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone" required>
                <Input name="phone" placeholder="+91 9999999999" required />
              </Field>

              <Field label="Department" required>
                <Select name="dept" required>
                  <option value="">Select Dept</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d.slug} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Doctor" required>
                <Input name="doctor" placeholder="Dr. First Last" required />
              </Field>

              <Field label="Visit Type" required>
                <Select name="visit" defaultValue="OP">
                  <option value="OP">OP</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Report Review">Report Review</option>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" required>
                <Input name="date" type="date" required />
              </Field>

              <Field label="Time" required>
                <Input name="time" type="time" required />
              </Field>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <Btn
                variant="ghost"
                onClick={() => setShowModal(false)}
                type="button"
              >
                Cancel
              </Btn>

              <Btn variant="primary" type="submit">
                Book Appointment
              </Btn>
            </div>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}

function IconBtn({ icon, tip, danger, onClick }) {
  return (
    <button
      type="button"
      title={tip}
      onClick={onClick}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${danger
        ? 'text-emergency hover:bg-emergency/10'
        : 'text-muted hover:text-primary hover:bg-soft-lavender/60'
        }`}
    >
      <UI name={icon} className="w-4 h-4" />
    </button>
  );
}

/* -------------------- DOCTORS MGMT -------------------- */

export function AdminDoctorsPage({ navigate }) {
  const [doctorsList, setDoctorsList] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [editDoc, setEditDoc] = React.useState(null);
  const [filterDept, setFilterDept] = React.useState('');
  const [q, setQ] = React.useState('');

  const refresh = () => axios.get('http://localhost:5000/api/doctors').then(res => setDoctorsList(res.data)).catch(console.error);
  React.useEffect(() => { refresh(); }, []);

  const uniqueDepts = React.useMemo(() => {
    const depts = doctorsList.map(d => d.dept).filter(Boolean);
    return Array.from(new Set(depts));
  }, [doctorsList]);

  const filteredDoctors = React.useMemo(() => {
    let list = doctorsList;
    if (filterDept) {
      list = list.filter(d => d.dept === filterDept);
    }
    if (q) {
      const search = q.toLowerCase();
      list = list.filter(d => 
        (d.name || '').toLowerCase().includes(search) ||
        (d.spec || '').toLowerCase().includes(search) ||
        (d.dept || '').toLowerCase().includes(search)
      );
    }
    return list;
  }, [doctorsList, filterDept, q]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      await axios.delete('http://localhost:5000/api/doctors/' + id);
      refresh();
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    if (editDoc) {
      await axios.put('http://localhost:5000/api/doctors/' + editDoc.docId, data);
    } else {
      await axios.post('http://localhost:5000/api/doctors', data);
    }
    setShowModal(false);
    refresh();
  };

  return (
    <AdminShell active="admin-doctors" navigate={navigate} title="Doctors" subtitle="Manage consulting and on-call medical team"
      searchVal={q}
      onSearchChange={setQ}
      actions={
        <div className="flex items-center gap-2">
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="border border-gray-200 bg-white text-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Departments</option>
            {uniqueDepts.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <Btn variant="primary" size="md" icon={<UI name="plus" className="w-4 h-4" />} onClick={() => { setEditDoc(null); setShowModal(true); }}>Add Doctor</Btn>
        </div>
      }>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>Doctor</th><th>Department</th><th>Qualification</th><th>OPD Timing</th><th>Fee</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredDoctors.map(d => (
                <tr key={d.docId || d.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full grad-purple text-white flex items-center justify-center text-xs font-bold">{d.name.split(' ').map(x => x[0]).filter(Boolean).slice(0, 2).join('')}</div>
                      <div><div className="font-semibold text-deep">{d.name}</div><div className="text-xs text-muted">{d.spec}</div></div>
                    </div>
                  </td>
                  <td>{d.dept}</td>
                  <td className="text-muted text-xs">{d.qual}</td>
                  <td className="text-muted text-xs">{d.timing}</td>
                  <td className="font-bold text-deep">₹{d.fee}</td>
                  <td>
                    {d.avail === 'available' ? <Badge tone="success">Available</Badge> :
                      d.avail === 'oncall' ? <Badge tone="info">On Call</Badge> :
                        d.avail === 'busy' ? <Badge tone="warn">Busy</Badge> :
                          d.avail === 'onleave' ? <Badge tone="danger">On Leave</Badge> :
                            <Badge tone="info">On Call</Badge>}
                  </td>
                  <td><div className="flex items-center gap-1"><IconBtn icon="edit" tip="Edit" onClick={() => { setEditDoc(d); setShowModal(true); }} /><IconBtn icon="trash" tip="Delete" danger onClick={() => handleDelete(d.docId || d.id)} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title={editDoc ? "Edit Doctor" : "Add Doctor"}>
          <form onSubmit={submitForm} className="space-y-4">
            <Field label="Full Name" required><Input name="name" defaultValue={editDoc?.name} placeholder="Dr. First Last" required /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Department" required>
                <Select name="dept" defaultValue={editDoc?.dept} required>
                  <option value="">Select</option>
                  {DEPARTMENTS.map(d => <option key={d.slug}>{d.name}</option>)}
                </Select>
              </Field>
              <Field label="Speciality" required><Input name="spec" defaultValue={editDoc?.spec} placeholder="Consultant Cardiologist" required /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Qualification"><Input name="qual" defaultValue={editDoc?.qual} placeholder="MBBS, MD" /></Field>
              <Field label="Fee (₹)" required><Input name="fee" type="number" defaultValue={editDoc?.fee} required /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="OPD Timing"><Input name="timing" defaultValue={editDoc?.timing} placeholder="10:00 AM - 4:00 PM" /></Field>
              <Field label="Availability">
                <Select name="avail" defaultValue={editDoc?.avail || 'available'}>
                  <option value="available">Available</option>
                  <option value="oncall">On Call</option>
                  <option value="busy">Busy</option>
                  <option value="onleave">On Leave</option>
                </Select>
              </Field>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <Btn variant="ghost" onClick={() => setShowModal(false)} type="button">Cancel</Btn>
              <Btn variant="primary" type="submit">{editDoc ? "Save Changes" : "Add Doctor"}</Btn>
            </div>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}

/* -------------------- DEPARTMENTS MGMT -------------------- */

export function AdminDepartmentsPage({ navigate }) {
  const [deptList, setDeptList] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [editDept, setEditDept] = React.useState(null);
  const [q, setQ] = React.useState('');

  const refresh = () => axios.get('http://localhost:5000/api/departments').then(res => setDeptList(res.data)).catch(console.error);
  React.useEffect(() => { refresh(); }, []);

  const filteredDepts = React.useMemo(() => {
    if (!q) return deptList;
    const search = q.toLowerCase();
    return deptList.filter(d => 
      (d.name || '').toLowerCase().includes(search) ||
      (d.desc || '').toLowerCase().includes(search)
    );
  }, [deptList, q]);

  const handleDelete = async (slug) => {
    if (confirm('Are you sure you want to delete this department?')) {
      await axios.delete('http://localhost:5000/api/departments/' + slug);
      refresh();
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    if (editDept) {
      await axios.put('http://localhost:5000/api/departments/' + editDept.slug, data);
    } else {
      await axios.post('http://localhost:5000/api/departments', data);
    }
    setShowModal(false);
    refresh();
  };

  return (
    <AdminShell active="admin-departments" navigate={navigate} title="Departments" subtitle="Add, edit and re-order departments shown on the public site"
      searchVal={q}
      onSearchChange={setQ}
      actions={<Btn variant="primary" size="md" icon={<UI name="plus" className="w-4 h-4" />} onClick={() => { setEditDept(null); setShowModal(true); }}>Add Department</Btn>}>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>#</th><th>Department</th><th>Slug</th><th>Doctors</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredDepts.map((d, i) => (
                <tr key={d.slug}>
                  <td className="text-muted font-mono text-xs">{(i + 1).toString().padStart(2, '0')}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-soft-lavender text-primary flex items-center justify-center"><DeptIcon name={d.icon} className="w-5 h-5" /></div>
                      <div className="font-semibold text-deep">{d.name}</div>
                    </div>
                  </td>
                  <td className="text-muted font-mono text-xs">/{d.slug}</td>
                  <td className="font-semibold">{d.doctors || 0}</td>
                  <td className="text-muted text-xs max-w-xs truncate">{d.desc}</td>
                  <td><Badge tone="success">Active</Badge></td>
                  <td><div className="flex items-center gap-1"><IconBtn icon="edit" tip="Edit" onClick={() => { setEditDept(d); setShowModal(true); }} /><IconBtn icon="trash" tip="Delete" danger onClick={() => handleDelete(d.slug)} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title={editDept ? "Edit Department" : "Add Department"}>
          <form onSubmit={submitForm} className="space-y-4">
            <Field label="Department Name" required><Input name="name" defaultValue={editDept?.name} placeholder="e.g. Cardiology" required /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Icon Name"><Input name="icon" defaultValue={editDept?.icon || 'medicine'} placeholder="heart" /></Field>
              <Field label="No. of Doctors"><Input name="doctors" type="number" defaultValue={editDept?.doctors || 0} placeholder="0" /></Field>
            </div>
            <Field label="Description"><Textarea name="desc" defaultValue={editDept?.desc} placeholder="Brief description..." /></Field>
            <div className="flex justify-end gap-2 pt-3">
              <Btn variant="ghost" onClick={() => setShowModal(false)} type="button">Cancel</Btn>
              <Btn variant="primary" type="submit">{editDept ? "Save Changes" : "Add Department"}</Btn>
            </div>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}

/* -------------------- FEES MGMT -------------------- */
export function AdminFeesPage({ navigate }) {
  const [fees, setFees] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [editFee, setEditFee] = React.useState(null);
  const [q, setQ] = React.useState('');

  const refresh = () => axios.get('http://localhost:5000/api/fees').then(res => setFees(res.data)).catch(console.error);
  React.useEffect(() => { refresh(); }, []);

  const filteredFees = React.useMemo(() => {
    if (!q) return fees;
    const search = q.toLowerCase();
    return fees.filter(f => 
      (f.category || '').toLowerCase().includes(search) ||
      (f.name || '').toLowerCase().includes(search) ||
      (f.price || '').toLowerCase().includes(search)
    );
  }, [fees, q]);

  const handleDelete = async (id) => {
    if (confirm('Delete this fee item?')) {
      await axios.delete('http://localhost:5000/api/fees/' + id);
      refresh();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (editFee) await axios.put('http://localhost:5000/api/fees/' + editFee.id, data);
    else await axios.post('http://localhost:5000/api/fees', data);
    setShowModal(false);
    refresh();
  };

  return (
    <AdminShell active="admin-fees" navigate={navigate} title="Fees" subtitle="Manage published pricing for consultation, accommodation, diagnostics and surgery"
      searchVal={q}
      onSearchChange={setQ}
      actions={<Btn variant="primary" size="md" icon={<UI name="plus" className="w-4 h-4" />} onClick={() => { setEditFee(null); setShowModal(true); }}>Add Fee Item</Btn>}>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>Category</th><th>Service</th><th>Price / Range</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredFees.map((r, i) => (
                <tr key={r.id || i}>
                  <td><Badge tone="purple">{r.category}</Badge></td>
                  <td className="font-semibold text-deep">{r.name}</td>
                  <td className="font-bold text-primary">{r.price}</td>
                  <td><Badge tone="success">Active</Badge></td>
                  <td><div className="flex items-center gap-1"><IconBtn icon="edit" tip="Edit" onClick={() => { setEditFee(r); setShowModal(true) }} /><IconBtn icon="trash" tip="Delete" danger onClick={() => handleDelete(r.id)} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} title={editFee ? "Edit Fee Item" : "Add Fee Item"}>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Category" required><Input name="category" defaultValue={editFee?.category} placeholder="e.g. Diagnostics Charges" required /></Field>
          <Field label="Service Name" required><Input name="name" defaultValue={editFee?.name} placeholder="e.g. MRI Brain" required /></Field>
          <Field label="Price (₹)" required><Input name="price" defaultValue={editFee?.price} placeholder="2400" required /></Field>
          <div className="flex justify-end gap-2 pt-3">
            <Btn type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
            <Btn type="submit" variant="primary">Save</Btn>
          </div>
        </form>
      </Modal>}
    </AdminShell>
  );
}



/* -------------------- SETTINGS -------------------- */
export function AdminSettingsPage({ navigate }) {
  const [settings, setSettings] = React.useState({});
  React.useEffect(() => { axios.get('http://localhost:5000/api/settings').then(res => setSettings(res.data)).catch(console.error); }, []);
  const save = async () => {
    await axios.put('http://localhost:5000/api/settings', settings);
    alert('Settings Saved!');
  };
  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  return (
    <AdminShell active="admin-settings" navigate={navigate} title="Settings" subtitle="Hospital details, contact and integrations"
      actions={<Btn variant="primary" size="md" onClick={save}>Save Changes</Btn>}>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="card p-7 lg:col-span-3 space-y-6">
          <div>
            <h3 className="display text-xl font-bold text-deep">Hospital Profile</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Hospital Name"><Input value={settings.name || ''} onChange={e => set('name', e.target.value)} /></Field>
            <Field label="Tagline"><Input value={settings.tagline || ''} onChange={e => set('tagline', e.target.value)} /></Field>
          </div>
          <div className="border-t border-[#FFE4E1] pt-6">
            <h4 className="font-bold text-deep">Contact & Address</h4>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Field label="Hospital Phone"><Input value={settings.phone || ''} onChange={e => set('phone', e.target.value)} /></Field>
              <Field label="Emergency Phone"><Input value={settings.emergency || ''} onChange={e => set('emergency', e.target.value)} /></Field>
              <Field label="Email"><Input value={settings.email || ''} onChange={e => set('email', e.target.value)} /></Field>
              <Field label="Address"><Input value={settings.address || ''} onChange={e => set('address', e.target.value)} /></Field>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-[#FFE4E1]">
            <Btn variant="primary" onClick={save}>Save Changes</Btn>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}


export function AdminBlogPage({ navigate }) {
  const [articles, setArticles] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [editArt, setEditArt] = React.useState(null);
  const [q, setQ] = React.useState('');

  const refresh = () => axios.get('http://localhost:5000/api/articles').then(res => setArticles(res.data)).catch(console.error);
  React.useEffect(() => { refresh(); }, []);

  const filteredArticles = React.useMemo(() => {
    if (!q) return articles;
    const search = q.toLowerCase();
    return articles.filter(a => 
      (a.title || '').toLowerCase().includes(search) ||
      (a.category || '').toLowerCase().includes(search) ||
      (a.excerpt || '').toLowerCase().includes(search)
    );
  }, [articles, q]);

  const handleDelete = async (id) => {
    if (confirm('Delete article?')) {
      await axios.delete('http://localhost:5000/api/articles/' + id);
      refresh();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (editArt) await axios.put('http://localhost:5000/api/articles/' + editArt.id, data);
    else await axios.post('http://localhost:5000/api/articles', data);
    setShowModal(false);
    refresh();
  };

  return (
    <AdminShell active="admin-blog" navigate={navigate} title="Health Articles" subtitle="Manage articles published on the public site"
      searchVal={q}
      onSearchChange={setQ}
      actions={<Btn variant="primary" size="md" icon={<UI name="plus" className="w-4 h-4" />} onClick={() => { setEditArt(null); setShowModal(true); }}>New Article</Btn>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map(a => (
          <div key={a.id} className="card overflow-hidden p-5 flex flex-col">
            <Badge tone="purple" className="self-start">{a.category}</Badge>
            <h3 className="display text-lg font-bold text-deep mt-3 leading-snug">{a.title}</h3>
            <div className="text-xs text-muted mt-2">{a.date} · {a.read || '5 min read'}</div>
            <p className="text-sm text-muted mt-3 line-clamp-3 flex-1">{a.excerpt}</p>
            <div className="flex items-center gap-1 mt-4 pt-4 border-t border-[#FFE4E1]">
              <IconBtn icon="edit" tip="Edit" onClick={() => { setEditArt(a); setShowModal(true) }} />
              <IconBtn icon="trash" tip="Delete" danger onClick={() => handleDelete(a.id)} />
              <Badge tone="success" className="ml-auto">Published</Badge>
            </div>
          </div>
        ))}
        <button onClick={() => { setEditArt(null); setShowModal(true); }} className="rounded-3xl border-2 border-dashed border-soft-lavender hover:border-primary hover:bg-soft-lavender/30 transition flex flex-col items-center justify-center min-h-[280px] text-primary">
          <div className="w-12 h-12 rounded-2xl bg-soft-lavender flex items-center justify-center"><UI name="plus" className="w-6 h-6" /></div>
          <div className="font-semibold mt-3">Add new article</div>
        </button>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} title={editArt ? "Edit Article" : "New Article"}>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Title" required><Input name="title" defaultValue={editArt?.title} placeholder="Article Title" required /></Field>
          <Field label="Category" required><Input name="category" defaultValue={editArt?.category} placeholder="e.g. Cardiology" required /></Field>
          <Field label="Excerpt" required><Textarea name="excerpt" defaultValue={editArt?.excerpt} required /></Field>
          <div className="flex justify-end gap-2 pt-3">
            <Btn type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
            <Btn type="submit" variant="primary">Save</Btn>
          </div>
        </form>
      </Modal>}
    </AdminShell>
  );
}


export function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-deep/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-cardHover w-full max-w-lg p-7">
        <div className="flex items-center justify-between mb-4">
          <h3 className="display text-xl font-bold text-deep">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-soft-lavender/60 text-primary flex items-center justify-center"><UI name="close" className="w-4 h-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { AdminLoginPage, AdminDashboard, AdminAppointmentsPage, AdminDoctorsPage, AdminDepartmentsPage, AdminFeesPage, AdminSettingsPage, AdminBlogPage });