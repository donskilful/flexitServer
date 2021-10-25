import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import router from './routes/v1';
import connectDb from './config/connectDb';
import './environment';

dotenv.config();
const app: Application = express();

app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
  }),
);

connectDb();

app.use(express.json());

app.use('/api/v1', router);

app.use('*', (req: Request, res: Response) => {
  res.status(400).json({ message: 'Invalid_Url' });
});

const PORT = process.env.PORT || 8000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Flexit Server Running on port ${PORT}`));
