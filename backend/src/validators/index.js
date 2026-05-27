import { body } from 'express-validator';

export const loginValidator = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password cannot be empty.')
];

export const appointmentValidator = [
  body('patient')
    .notEmpty().withMessage('Patient name is required.')
    .trim(),
  body('phone')
    .notEmpty().withMessage('Phone number is required.')
    .trim(),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Please enter a valid email address.'),
  body('age')
    .notEmpty().withMessage('Age is required.')
    .isInt({ min: 0, max: 130 }).withMessage('Please enter a valid age between 0 and 130.'),
  body('gender')
    .notEmpty().withMessage('Gender is required.')
    .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other.'),
  body('dept')
    .notEmpty().withMessage('Department is required.')
    .trim(),
  body('doctor')
    .optional({ checkFalsy: true })
    .trim(),
  body('date')
    .notEmpty().withMessage('Appointment date is required.')
    .isISO8601().withMessage('Please enter a valid date (YYYY-MM-DD).'),
  body('time')
    .notEmpty().withMessage('Appointment time is required.')
    .trim(),
  body('visit')
    .optional()
    .isIn(['OP', 'Emergency', 'Follow-up', 'Report Review']).withMessage('Invalid visit type.'),
  body('message')
    .optional()
    .trim()
];

export const enquiryValidator = [
  body('name')
    .notEmpty().withMessage('Name is required.')
    .trim(),
  body('phone')
    .notEmpty().withMessage('Phone number is required.')
    .trim(),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Please enter a valid email address.'),
  body('subject')
    .notEmpty().withMessage('Subject is required.')
    .trim(),
  body('message')
    .notEmpty().withMessage('Message is required.')
    .trim()
];

export const doctorValidator = [
  body('name')
    .notEmpty().withMessage('Doctor name is required.')
    .trim(),
  body('dept')
    .notEmpty().withMessage('Department name is required.')
    .trim(),
  body('spec')
    .notEmpty().withMessage('Speciality is required.')
    .trim(),
  body('qual')
    .optional()
    .trim(),
  body('timing')
    .optional()
    .trim(),
  body('avail')
    .optional()
    .isIn(['available', 'oncall', 'busy', 'onleave']).withMessage('Invalid availability status.'),
  body('fee')
    .notEmpty().withMessage('Consultation fee is required.')
    .isNumeric().withMessage('Fee must be a valid number.')
];

export const departmentValidator = [
  body('name')
    .notEmpty().withMessage('Department name is required.')
    .trim(),
  body('icon')
    .optional()
    .trim(),
  body('doctors')
    .optional()
    .isInt({ min: 0 }).withMessage('Doctors count must be a non-negative integer.'),
  body('desc')
    .optional()
    .trim()
];

export const feeValidator = [
  body('category')
    .notEmpty().withMessage('Category is required.')
    .trim(),
  body('name')
    .notEmpty().withMessage('Service name is required.')
    .trim(),
  body('price')
    .notEmpty().withMessage('Price is required.')
    .trim()
];

export const articleValidator = [
  body('title')
    .notEmpty().withMessage('Article title is required.')
    .trim(),
  body('category')
    .notEmpty().withMessage('Category is required.')
    .trim(),
  body('excerpt')
    .notEmpty().withMessage('Excerpt is required.')
    .trim()
];
