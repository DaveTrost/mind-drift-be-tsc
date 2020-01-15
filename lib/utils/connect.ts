import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { parse } from 'url';

dotenv.config();

export default (url = process.env.MONGODB_URI): void => {
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
  });

  mongoose.connection.on('connected', () => {
    const parsedUrl = parse(url);
    const redactedUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.pathname}`;
    console.log(`Connected to MongoDB at ${redactedUrl}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

  mongoose.connection.on('error', () => {
    console.log('Error connecting to MongoDB');
  });
};