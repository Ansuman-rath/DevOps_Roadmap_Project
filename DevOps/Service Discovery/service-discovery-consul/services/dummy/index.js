const express = require('express');
const axios = require('axios');

const SERVICE_NAME   = process.env.SERVICE_NAME   || 'service-a';
const SERVICE_PORT   = parseInt(process.env.SERVICE_PORT || '3001', 10);
const SERVICE_ADDR   = process.env.SERVICE_ADDRESS || SERVICE_NAME;
const CONSUL_ADDR    = process.env.CONSUL_HTTP_ADDR || 'http://consul:8500';

const app = express();
let SERVICE_ID = `${SERVICE_NAME}-${SERVICE_PORT}-${Math.random().toString(36).slice(2,7)}`;

app.get('/info', (req, res) => {
  res.json({
    service: SERVICE_NAME,
    timestamp: new Date().toISOString()
  });
});

async function registerWithConsul(retry = 0) {
  try {
    await axios.put(`${CONSUL_ADDR}/v1/agent/service/register`, {
      Name: SERVICE_NAME,
      ID: SERVICE_ID,
      Address: SERVICE_ADDR,
      Port: SERVICE_PORT,
      Check: {
        HTTP: `http://${SERVICE_ADDR}:${SERVICE_PORT}/info`, 
        Interval: "10s",
        DeregisterCriticalServiceAfter: "1m"
      }
    });
    console.log(`[${SERVICE_NAME}] Registered with Consul as ${SERVICE_ID}`);
  } catch (err) {
    const wait = Math.min(1000 * Math.pow(2, retry), 10000);
    console.error(`[${SERVICE_NAME}] Consul register failed (${err.message}). Retrying in ${wait}ms...`);
    setTimeout(() => registerWithConsul(retry + 1), wait);
  }
}

async function deregisterFromConsul() {
  try {
    await axios.put(`${CONSUL_ADDR}/v1/agent/service/deregister/${SERVICE_ID}`);
    console.log(`[${SERVICE_NAME}] Deregistered ${SERVICE_ID} from Consul`);
  } catch (err) {
    console.error(`[${SERVICE_NAME}] Deregister failed: ${err.message}`);
  }
}

process.on('SIGTERM', async () => { await deregisterFromConsul(); process.exit(0); });
process.on('SIGINT',  async () => { await deregisterFromConsul(); process.exit(0); });

app.listen(SERVICE_PORT, () => {
  console.log(`[${SERVICE_NAME}] listening on ${SERVICE_PORT}`);
  registerWithConsul();
});
