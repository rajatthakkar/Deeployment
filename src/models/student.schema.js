import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], // Email validation
  },
  college: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pass', 'fail'], // Restrict status to "pass" or "fail"
    required: true,
  },
  dsa_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100, // Assuming the score is out of 100
  },
  web_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  react_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
}, { timestamps: true }); // This will automatically add 'createdAt' and 'updatedAt' fields


export default studentSchema
