import { check } from 'express-validator';

const commentValidator = [
  check('body').exists().withMessage('Your comment cannot be empty'),
];

export default commentValidator;
