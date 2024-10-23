import mongoose from "mongoose";
import studentSchema from "../models/student.schema.js";
import InterviewSchema from "../models/interview.schema.js";
import { User } from "./ragisterd.rapository.js";
export const Student = mongoose.model('Student', studentSchema);
const InterviewModal = mongoose.model('Interview', InterviewSchema);
export default class DeshboardRepo{

     async studentData(userData){
      console.log("INSIDE STUDENT FUNSSS")
       try {
          const newStudents = new Student(userData);
          console.log(userData)
          const user = await newStudents.save()
           return {status:true,message:"Student Data submit succusfully"}
       } catch (error) {
        return {message:'Server error',error:error}
       } 
     }
     async getStudentData(){
          try {
              const studentsData = await Student.find()
               console.log("students Data",studentsData)
               return studentsData
          } catch (error) {
               
          }
     }
     async getInterviewData(){
          try {
              const interviews = await InterviewModal.find()
               console.log("students Data",interviews)
               return interviews
          } catch (error) {
               
          }
     }
    
     async addCompaneyDetails(interview){
           console.log("🚀 ~ DeshboardRepo ~ addCompaneyDetails ~ interview:", interview)
           
          try {
               console.log("In side try")
               const interviewDetails = new InterviewModal(interview);
               console.log("🚀 ~ DeshboardRepo ~ addCompaneyDetails ~ interviewDetails:", interviewDetails)
              
               const result = await interviewDetails.save()
                console.log("🚀 ~ DeshboardRepo ~ addCompaneyDetails ~ interview:", result)
                return {status:true,message:"Submit Interview Details succusfully"}
            } catch (error) {
               console.log("🚀 ~ DeshboardRepo ~ addCompaneyDetails ~ error:", error)
               console.log("in sode error")
             return {message:'Server error',error:error}
            } 

         }

         async eligibleRepo({ companyId, email, status }) {
          console.log("in side repo");
          console.log("🚀 ~ DeshboardRepo ~ eligibleRepo ~ status:", status);
          console.log("🚀 ~ DeshboardRepo ~ eligibleRepo ~ email:", email);
          console.log("🚀 ~ DeshboardRepo ~ eligibleRepo ~ companyId:", companyId);
      
          try {
               console.log("inside try")
              // Find the student by email to get their ObjectID
              const student = await User.findOne({ email });
                    console.log("student",student)
              if (!student) {
                  throw new Error("Student not found");
              }
      
              // Use findByIdAndUpdate to push the student ID into the students array
              const updatedInterview = await InterviewModal.findByIdAndUpdate(
                  companyId,
                  {  $push: {
                    students: {
                        studentId: student._id, // Student's ObjectID
                        name: student.name,      // Student's name
                        email: email,            // Email passed from request
                        status: status           // Status passed from request
                    }
                }},  // Push student ObjectID into the students array
                  { new: true, useFindAndModify: false }  // Return the updated document
              );
      
              console.log("Updated Interview: ", updatedInterview);
              return updatedInterview;
          } catch (error) {
              return {
                    success: false,
                    message: "server Error",
                    error: error.message,
                }
             
          }
      }
      async deleteStudent(id) {
          try {
             
              // Use findByIdAndDelete to delete the student by their Object ID
              const deletedStudent = await Student.findByIdAndDelete(id);
              console.log('Deleted Student:', deletedStudent);
              return { success: true, message: 'Student deleted successfully' };
          } catch (error) {
              console.error('Error deleting student:', error);
              return { success: false, message: 'Server Error', error: error.message };
          }
      }
      async updaeStudentForm(id,data){
          try {
               // Find the student by ID and update the fields with the provided data
               const updatedStudent = await Student.findByIdAndUpdate(
                   id, 
                   { 
                       name: data.name,
                       email: data.email,
                       college: data.college,
                       batch: data.batch,
                       status: data.status,
                       dsa_score: data.dsa_score,
                       web_score: data.web_score,
                       react_score: data.react_score
                   }, 
                   { new: true }  // This option ensures the returned document is the updated one
               );
               // Check if the student was found and updated
               if (!updatedStudent) {
                   return { status: false, message: "Student not found" };
               }
               return { status: true, message: "Student data updated successfully", data: updatedStudent };
           } catch (error) {
               return { status: false, message: "Server error", error: error };
           }
      }
}