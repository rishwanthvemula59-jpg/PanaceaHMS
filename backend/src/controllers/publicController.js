import { departmentService } from '../services/departmentService.js';
import { doctorService } from '../services/doctorService.js';
import { appointmentService } from '../services/appointmentService.js';
import { enquiryService } from '../services/enquiryService.js';
import { feeService } from '../services/feeService.js';
import { articleService } from '../services/articleService.js';
import { settingsService } from '../services/settingsService.js';

export const publicController = {
  /**
   * Fetch all department listings
   */
  async getDepartments(req, res, next) {
    try {
      const data = await departmentService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Fetch all consulting doctors
   */
  async getDoctors(req, res, next) {
    try {
      const data = await doctorService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Fetch details of a single doctor
   */
  async getDoctorDetails(req, res, next) {
    try {
      const { id } = req.params;
      const data = await doctorService.getById(id);
      if (!data) {
        return res.status(404).json({ success: false, message: 'Doctor not found.' });
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Submit an appointment request (from public website)
   */
  async postAppointment(req, res, next) {
    try {
      const data = await appointmentService.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Appointment request submitted successfully.',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Submit a contact inquiry
   */
  async postEnquiry(req, res, next) {
    try {
      const data = await enquiryService.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully.',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Fetch published fee pricing lists
   */
  async getFees(req, res, next) {
    try {
      const data = await feeService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Fetch all health articles / blog posts
   */
  async getArticles(req, res, next) {
    try {
      const data = await articleService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Fetch public hospital metadata settings
   */
  async getSettings(req, res, next) {
    try {
      const data = await settingsService.get();
      // Map properties to layout specifications
      const mapped = {
        name: data.name,
        tagline: data.tagline,
        phone: data.contact_phone,
        emergency: data.emergency_phone,
        email: data.email,
        address: data.address
      };
      return res.status(200).json(mapped);
    } catch (error) {
      next(error);
    }
  }
};
