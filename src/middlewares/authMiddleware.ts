import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import Users from '../models/UserModel';
import { IRequest } from '../types';

const authMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.headers.authorization;
  if (token && typeof token === 'string') {
    const verifiedToken: any = jwt.verify(
      token.split(' ')[1],
      process.env.jwtSecret,
    );
    if (verifiedToken) {
      const user = await Users.findById(verifiedToken.id, { password: 0 });
      req.user = user;
      next();
    } else {
      res.status(401).json({
        message: 'Unauthorized access',
      });
    }
  } else {
    res.status(401).json({
      message: 'Unauthorized access',
    });
  }
};

export default authMiddleware;
