import express from 'express';
import cors from 'cors';
import { connectMongo } from './db.js';
import { getRedisClient } from './redis.js';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

let mongoReady = false;
let redisReady = false;

async function init() {
  try {
    await connectMongo();
    mongoReady = true;
  } catch (e) {
    console.error('Mongo connection error:', e.message);
  }

  try {
    const client = getRedisClient();
    client.on('ready', () => { redisReady = true; });
    client.on('end', () => { redisReady = false; });
    await client.connect();
  } catch (e) {
    console.error('Redis connection error:', e.message);
  }
}

app.get('/health', async (_req, res) => {
  res.status(200).json({
    status: 'ok',
    mongo: mongoReady ? 'up' : 'down',
    redis: redisReady ? 'up' : 'down'
  });
});

// Simple in-Mongo todos
import mongoose from 'mongoose';
const Todo = mongoose.model('Todo', new mongoose.Schema({
  text: { type: String, required: true },
}, { timestamps: true }));

app.get('/api/todos', async (_req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 }).lean();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });
  const todo = await Todo.create({ text });
  res.status(201).json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ ok: true });
});

// Redis counter demo
app.get('/api/counter', async (_req, res) => {
  const client = getRedisClient();
  const val = await client.incr('counter');
  res.json({ counter: Number(val) });
});

app.listen(PORT, async () => {
  console.log(`API listening on :${PORT}`);
  await init();
});