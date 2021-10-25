import mongoose from 'mongoose';

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true ,
  useUnifiedTopology: true,
};

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, option);
    // eslint-disable-next-line no-console
    console.log('Database connected successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default connectDb;
