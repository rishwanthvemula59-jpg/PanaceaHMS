import { Router } from 'express';
import { publicController } from '../controllers/publicController.js';
import { adminController } from '../controllers/adminController.js';
import { handleValidationErrors } from '../middleware/validator.js';
import { appointmentValidator, enquiryValidator, loginValidator } from '../validators/index.js';

const router = Router();

// Public data fetches
router.get('/departments', publicController.getDepartments);
router.get('/doctors', publicController.getDoctors);
router.get('/doctors/:id', publicController.getDoctorDetails);
router.get('/fees', publicController.getFees);
router.get('/articles', publicController.getArticles);
router.get('/settings', publicController.getSettings);

// Public submissions
router.post('/appointments', appointmentValidator, handleValidationErrors, publicController.postAppointment);
router.post('/enquiries', enquiryValidator, handleValidationErrors, publicController.postEnquiry);

// Authentication (Public route registered at /admin/login for frontend alignment)
router.post('/admin/login', loginValidator, handleValidationErrors, adminController.login);

export default router;
