import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validator.js';
import { doctorValidator, departmentValidator, feeValidator, articleValidator, appointmentValidator } from '../validators/index.js';

const router = Router();

// Apply JWT authentication and admin role enforcement to all routes in this router
router.use(authenticateToken);
router.use(requireAdmin);

// Admin dashboard statistics
router.get('/admin/stats', adminController.getStats);

// Appointments CRUD (mounted at /admin/appointments)
router.get('/admin/appointments', adminController.getAppointments);
router.put('/admin/appointments/:id', adminController.updateAppointment);
router.delete('/admin/appointments/:id', adminController.deleteAppointment);

// Doctors CRUD (mounted at /doctors, matching frontend call targets)
router.post('/doctors', doctorValidator, handleValidationErrors, adminController.createDoctor);
router.put('/doctors/:id', doctorValidator, handleValidationErrors, adminController.updateDoctor);
router.delete('/doctors/:id', adminController.deleteDoctor);

// Departments CRUD (mounted at /departments)
router.post('/departments', departmentValidator, handleValidationErrors, adminController.createDepartment);
router.put('/departments/:slug', departmentValidator, handleValidationErrors, adminController.updateDepartment);
router.delete('/departments/:slug', adminController.deleteDepartment);

// Fees CRUD (mounted at /fees)
router.post('/fees', feeValidator, handleValidationErrors, adminController.createFee);
router.put('/fees/:id', feeValidator, handleValidationErrors, adminController.updateFee);
router.delete('/fees/:id', adminController.deleteFee);

// Blog Articles CRUD (mounted at /articles)
router.post('/articles', articleValidator, handleValidationErrors, adminController.createArticle);
router.put('/articles/:id', articleValidator, handleValidationErrors, adminController.updateArticle);
router.delete('/articles/:id', adminController.deleteArticle);

// Hospital Settings update (mounted at /settings)
router.put('/settings', adminController.updateSettings);

export default router;
