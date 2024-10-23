// Importing the dotenv library to load environment variables from a .env file
import dotenv from 'dotenv'; 
// Importing the mongoose library to interact with MongoDB
import mongoose from 'mongoose'; 
// Load environment variables from .env file
dotenv.config(); 
// Logging the result of the dotenv.config() to see if it loaded successfully
console.log(dotenv.config()); 
// Access the environment variables defined in the .env file
const url = process.env.MONGOURL ; // MongoDB connection URL
     // Server port
// Logging the MongoDB URL and server port to the console
console.log('MongoDB URL:', url);   // Output: MongoDB URL: mongodb://localhost:27017/placement_cell
    // Output: Server Port: 3000
// Function to create a connection to MongoDB using Mongoose
const createMongooseConection = async () => {
  try {
    await mongoose.connect(url, {
        useNewUrlParser: true,  // You can remove this
        useUnifiedTopology: true,  // You can remove this
    });
    console.log('MongoDB connected successfully');
} catch (error) {
    console.error('MongoDB connection error:', error);
}
};
// Exporting the createMongooseConection function for use in other modules
export default createMongooseConection; 
