import express from 'express';
import { appointmentValidator } from './src/validators/index.js';
import { handleValidationErrors } from './src/middleware/validator.js';

const app = express();
app.use(express.json());

app.post('/test', appointmentValidator, handleValidationErrors, (req, res) => {
  res.json({ success: true, body: req.body });
});

// Mock request
import http from 'http';

const server = app.listen(0, () => {
  const port = server.address().port;
  
  const postData = JSON.stringify({
    patient: "Test Patient",
    phone: "9999999999",
    email: "",
    age: "30",
    gender: "Male",
    dept: "cardiology",
    doctor: "Dr. Nagachaitanya",
    date: "2026-06-01",
    time: "10:30 AM",
    visit: "OP"
  });

  const options = {
    hostname: 'localhost',
    port: port,
    path: '/test',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Response status:', res.statusCode);
      console.log('Response body:', data);
      server.close();
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    server.close();
  });

  req.write(postData);
  req.end();
});
