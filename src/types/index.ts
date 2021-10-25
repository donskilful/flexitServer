import { Request } from 'express';
import { IUser } from '../models/UserModel';

export interface IRequest extends Request {
  user?: IUser;
}
