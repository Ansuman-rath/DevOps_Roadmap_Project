import mongoose from 'mongoose';
import fs from 'fs';

export async function connectMongo() {
  const host = process.env.MONGO_HOST || 'mongodb';
  const db = process.env.MONGO_DB || 'appdb';
  const user = process.env.MONGO_USER || 'appuser';
  const pwFile = process.env.MONGO_PASSWORD_FILE || '/run/secrets/mongo_app_password';
  const password = fs.readFileSync(pwFile, 'utf8').trim();

  const uri = `mongodb://${user}:${encodeURIComponent(password)}@${host}:27017/${db}?authSource=${db}`;
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('Connected to MongoDB');
}