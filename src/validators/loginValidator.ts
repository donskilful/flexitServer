import { check } from 'express-validator';

const loginValidator = [
  check('email').isEmail().withMessage('Please provide a valid gmail address'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be a minimum of 8 characters'),
];

export default loginValidator;
