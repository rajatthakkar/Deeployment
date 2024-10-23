import mongoose from "mongoose";
const Schema = mongoose.Schema;
const StudentDetailsSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pass', 'fail'], // Adjust the allowed values as needed
        required: true
    }
});
const InterviewSchema = new Schema({
    cmpname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    students: [StudentDetailsSchema] 
});
export default InterviewSchema

