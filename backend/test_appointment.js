import { appointmentService } from './src/services/appointmentService.js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  try {
    console.log("Testing appointment creation with empty email...");
    const result = await appointmentService.create({
      patient: "Test Patient",
      phone: "9999999999",
      email: "",
      age: 30,
      gender: "Male",
      dept: "cardiology",
      doctor: "Dr. Nagachaitanya",
      date: "2026-06-01",
      time: "10:30 AM",
      visit: "OP"
    });
    console.log("Success! Created appointment:", result);
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
}

run();
