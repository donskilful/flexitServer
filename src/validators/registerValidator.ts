import { check } from 'express-validator';

const registerValidator = [
  check('email').isEmail().withMessage('Please provide a valid Email address'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be a minimum of 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .not()
    .isIn(['123456', 'password', 'god'])
    .withMessage('Password to easy to guess, use something stronger '),
];

export default registerValidator;
