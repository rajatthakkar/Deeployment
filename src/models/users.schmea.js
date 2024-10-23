import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, // name field is required
    trim: true      // trims any leading or trailing whitespace
  },
  email: {
    type: String, 
    required: true, 
    unique: true,  // ensures no two users have the same email
    lowercase: true, // converts the email to lowercase before saving
    trim: true
  },
  password: {
    type: String, 
    required: true,
    minlength: 6   // password should be at least 6 characters long
  },
  isActive: {
    type: Boolean, 
    default: true  // sets a default value for user activity status
  },
  createdAt: {
    type: Date, 
    default: Date.now // stores the current date and time when a user is created
  },
});

// Create a model using the schema


export default userSchema;
