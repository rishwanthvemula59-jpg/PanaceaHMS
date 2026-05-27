import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { adminService } from '../services/adminService.js';
import { appointmentService } from '../services/appointmentService.js';
import { doctorService } from '../services/doctorService.js';
import { departmentService } from '../services/departmentService.js';
import { feeService } from '../services/feeService.js';
import { articleService } from '../services/articleService.js';
import { settingsService } from '../services/settingsService.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const adminController = {
  /**
   * Admin Login Check & JWT Sign
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const admin = await adminService.findByEmail(email);
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. User email not found.'
        });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Password verification failed.'
        });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: 'admin' },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Set cookie for session flexibility
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          role: 'admin'
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Fetch live dashboard summary counts
   */
  async getStats(req, res, next) {
    try {
      const stats = await appointmentService.getStats();
      const doctors = await doctorService.getAll();
      const depts = await departmentService.getAll();

      return res.status(200).json({
        success: true,
        data: {
          ...stats,
          totalDoctors: doctors.length,
          totalDepartments: depts.length
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /* --- APPOINTMENTS CRUD --- */

  async getAppointments(req, res, next) {
    try {
      const appointments = await appointmentService.getAll();

      // Format to support flex array response types from frontend code expectation
      // (a.ref || '') checks, patient mapping, etc.
      const mapped = appointments.map(a => ({
        _id: a.id,
        id: a.id,
        ref: a.ref_id,
        patient: a.patient_name,
        phone: a.phone,
        email: a.email,
        age: a.age,
        gender: a.gender,
        dept: a.dept_name,
        doctor: a.doctor_name,
        date: a.appointment_date,
        time: a.time_slot,
        reason: a.visit_type,
        message: a.message,
        source: a.source,
        status: a.status
      }));

      return res.status(200).json({
        success: true,
        data: mapped
      });
    } catch (error) {
      next(error);
    }
  },

  async updateAppointment(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await appointmentService.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  },

  async deleteAppointment(req, res, next) {
    try {
      const { id } = req.params;
      await appointmentService.delete(id);
      return res.status(200).json({ success: true, message: 'Appointment deleted successfully.' });
    } catch (error) {
      next(error);
    }
  },

  /* --- DOCTORS CRUD --- */

  async createDoctor(req, res, next) {
    try {
      const data = await doctorService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },

  async updateDoctor(req, res, next) {
    try {
      const { id } = req.params;
      const data = await doctorService.update(id, req.body);
      if (!data) {
        return res.status(404).json({ success: false, message: 'Doctor not found.' });
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  async deleteDoctor(req, res, next) {
    try {
      const { id } = req.params;
      await doctorService.delete(id);
      return res.status(200).json({ success: true, message: 'Doctor removed successfully.' });
    } catch (error) {
      next(error);
    }
  },

  /* --- DEPARTMENTS CRUD --- */

  async createDepartment(req, res, next) {
    try {
      const data = await departmentService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },

  async updateDepartment(req, res, next) {
    try {
      const { slug } = req.params;
      const data = await departmentService.update(slug, req.body);
      if (!data) {
        return res.status(404).json({ success: false, message: 'Department not found.' });
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  async deleteDepartment(req, res, next) {
    try {
      const { slug } = req.params;
      await departmentService.delete(slug);
      return res.status(200).json({ success: true, message: 'Department deleted successfully.' });
    } catch (error) {
      next(error);
    }
  },

  /* --- FEES CRUD --- */

  async createFee(req, res, next) {
    try {
      const data = await feeService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },

  async updateFee(req, res, next) {
    try {
      const { id } = req.params;
      const data = await feeService.update(id, req.body);
      if (!data) {
        return res.status(404).json({ success: false, message: 'Fee item not found.' });
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  async deleteFee(req, res, next) {
    try {
      const { id } = req.params;
      await feeService.delete(id);
      return res.status(200).json({ success: true, message: 'Fee item removed successfully.' });
    } catch (error) {
      next(error);
    }
  },

  /* --- SETTINGS CRUD --- */

  async updateSettings(req, res, next) {
    try {
      const data = await settingsService.update(req.body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  /* --- ARTICLES CRUD --- */

  async createArticle(req, res, next) {
    try {
      const data = await articleService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },

  async updateArticle(req, res, next) {
    try {
      const { id } = req.params;
      const data = await articleService.update(id, req.body);
      if (!data) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  async deleteArticle(req, res, next) {
    try {
      const { id } = req.params;
      await articleService.delete(id);
      return res.status(200).json({ success: true, message: 'Article deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};
