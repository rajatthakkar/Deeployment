import path from 'path';
import DeshboardRepo from '../reposatory/nav.reposatory.js'
import { Student } from '../reposatory/nav.reposatory.js';
import  CSVService  from '../services/csvServices.js';
const csvservice = new CSVService()
export default class DeshboardController {
    constructor() {
        this.ragisterRepo = new DeshboardRepo()

    }
    async deshboard(req, res) {
        try {
            console.log("inside login function")
            // Use path.join to construct the file path
            const studentsData = await this.ragisterRepo.getStudentData()
            console.log("🚀 ~ DeshboardController ~ deshboard ~ result:", studentsData)
            const interviewsResult = await this.ragisterRepo.getInterviewData()
            console.log("🚀 ~ DeshboardController ~ deshboard ~ interviewsResult:", interviewsResult)
            const filePath = path.join(path.resolve(), 'src', 'views', 'deshboard.ejs');
            console.log(filePath)
            // Send the file as a response
            return res.render(filePath, {
                userEmail: req.session.userEmail,
                studentsData: studentsData,
                interviewsResult: interviewsResult  // Passing student data to the view
            });
        } catch (error) {
            console.error('Error sending login page:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    async studentForm(req, res) {
        try {
            console.log("inside login studentForm")
            // Use path.join to construct the file path
            const filePath = path.join(path.resolve(), 'src', 'views', 'EditeStudentData.ejs');
            console.log(filePath)
            // Send the file as a response
            return res.render(filePath, { userEmail: req.session.userEmail });
        } catch (error) {
            console.error('Error sending login page:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    async addStudentData(req, res) {
        console.log(req.body);  // This will print the form data sent from the client
        try {
            const result = await this.ragisterRepo.studentData(req.body)
            // Here you can handle the logic for storing or processing the student data
            return res.redirect('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async showInterviewForm(req, res) {
        console.log(req.body);  // This will print the form data sent from the client
        try {
            const filePath = path.join(path.resolve(), 'src', 'views', 'AddCompaney.ejs');
            console.log(filePath)
            // Send the file as a response
            res.render(filePath, { userEmail: req.session.userEmail });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async addCompaneyDetails(req, res) {
        console.log("inside add interview details")
        console.log(req.body);  // This will print the form data sent from the client
        try {
            const result = await this.ragisterRepo.addCompaneyDetails(req.body)
            // Here you can handle the logic for storing or processing the student data
            return res.redirect('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async eligibleStudents(req, res) {
        console.log(req.body);
        try {
            const result = await this.ragisterRepo.eligibleRepo(req.body)
            console.log("result", result)
            return res.redirect('/dashboard');
        } catch (error) {
            console.error("Error in eligibleStudents controller: ", error);
            res.status(500).json({
                success: false,
                message: 'Failed to add student to interview',
                error: error.message,
            });
        }
    }
    async deleteStudent(req, res) {
        console.log("in side function")
        const studentId = req.params.id;
        const result = await this.ragisterRepo.deleteStudent(studentId);
        if (result.success) {
            res.redirect('/dashboard');  // Redirect or handle as needed after successful deletion
        } else {
            res.status(500).json({ message: result.message });
        }
    }
    async renderupdateStudentForm(req, res) {
        const studentId = req.params.id;
        console.log("🚀 ~ DeshboardController ~ editeStudent ~ studentId:", studentId)
        const filePath = path.join(path.resolve(), 'src', 'views', 'updateStudent.ejs');
        console.log(filePath)
        // Send the file as a response
        return res.render(filePath,{ studentId });
    }
    async updateStudent(req, res) {
        const studentId = req.params.id;
        const data = req.body
        try {
            const result = await this.ragisterRepo.updaeStudentForm(studentId,data)
            res.redirect('/dashboard');
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add student to interview',
                error: error.message,
            });
        } 
    }
    async generateCSV(req, res) {
        try {
            const students = await Student.find();
            console.log("🚀 ~ DeshboardController ~ generateCSV ~ students:", students)// Fetch all students
            const csvFilePath = await csvservice.generateCSV(students)
            console.log("responce",csvFilePath)// Generate CSV
            res.download(csvFilePath); // Download the CSV
        } catch (error) {
            console.error('Error generating CSV:', error);
            res.status(500).json({ message: 'Error generating CSV.' });
        }
    }
}
