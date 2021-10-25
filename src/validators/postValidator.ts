import { check } from 'express-validator';

const postValidator = [
  check('body').isLength({ min: 1 }).withMessage('Your post cannot be empty'),
];

export default postValidator;
