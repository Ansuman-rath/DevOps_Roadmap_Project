const express = require('express');
const axios = require('axios');

const CONSUL_ADDR = process.env.CONSUL_HTTP_ADDR || 'http://consul:8500';
const app = express();
const rrCounters = new Map();

async function pickHealthyInstance(serviceName) {
  const url = `${CONSUL_ADDR}/v1/health/service/${serviceName}?passing=1`;
  const { data } = await axios.get(url);
  if (!data || data.length === 0) return null;

  const idx = rrCounters.get(serviceName) || 0;
  const choice = data[idx % data.length];
  rrCounters.set(serviceName, idx + 1);

  const address = choice.Service.Address;
  const port = choice.Service.Port || choice.Service.ServicePort;
  return `http://${address}:${port}`;
}

app.get('/', (req, res) => {
  res.json({
    routes: [
      '/services',
      '/api/service-a',
      '/api/service-b',
      '/api/service-c'
    ]
  });
});

app.get('/services', async (req, res) => {
  try {
    const { data } = await axios.get(`${CONSUL_ADDR}/v1/agent/services`);
    const filtered = Object.values(data).filter(s =>
      ['service-a','service-b','service-c'].includes(s.Service)
    );
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:serviceName', async (req, res) => {
  try {
    const base = await pickHealthyInstance(req.params.serviceName);
    if (!base) return res.status(404).json({ error: 'No healthy instances found' });

    const { data } = await axios.get(`${base}/info`);
    res.json({ via: 'gateway', target: base, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8080, () => {
  console.log('API Gateway listening on 8080');
});
