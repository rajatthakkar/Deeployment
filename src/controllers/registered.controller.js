import path from 'path';
import RagisterdReposatory from '../reposatory/ragisterd.rapository.js';
import { Student } from '../reposatory/nav.reposatory.js';
export default class RegisteredController {
    constructor() {
        this.ragisterRepo = new RagisterdReposatory()
    }
    async renderHompePage(req,res){
        const filePath = path.join(path.resolve(), 'src', 'views', 'signin.ejs');
                console.log(filePath)
                // Send the file as a response
                return res.render(filePath);
    }


    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Check if the user is registered
            const result = await this.ragisterRepo.checkIfUserIsRagisterd(email);
    
            if (result) {
                // Check if the password is correct
                const userPass = await this.ragisterRepo.signIn(email, password);
                console.log("Result password:", userPass);
    
                if (userPass.status === true) {
                    // Save user email in the session upon successful login
                    req.session.userEmail = email;
    
                    // Redirect to the dashboard page
                    return res.redirect('/dashboard'); // Simplified to use redirect instead of res.render directly here
                } else {
                    // If password check fails, render the Message page with the error message
                    return res.render('Message.ejs', { userStatus: userPass.message });
                }
            } else {
                // If user is not registered
                return res.render('Message.ejs', { userStatus: 'User not found' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    async ragisterd(req,res){
        const filePath = path.join(path.resolve(), 'src', 'views', 'siginup.ejs');
        console.log("console file path..................",filePath)
        // Send the file as a response
        return res.render(filePath);
    }
    async signup(req, res) {
        const { name, email, password, confirmPassword } = req.body
        try {
            const newuser = await this.ragisterRepo.signup({ name, email, password, confirmPassword })
            console.log(newuser)
            if (newuser.status === false) {  // Fix the condition to check user status correctly
                console.log("inside if", newuser);
                // Use path.join to construct the file path
                const filePath = path.join(path.resolve(), 'src', 'views', 'Message.ejs');
                // Send the file as a response, passing the newuser object to the EJS template
                return res.render(filePath, { userStatus: newuser.message });
            }
           
            // Use path.join to construct the file path
            const filePath = path.join(path.resolve(), 'src', 'views', 'signin.ejs');
            // Send the file as a response
            return res.render(filePath);
        } catch (error) {
            console.error('Error sending login page:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    async logout(req,res){
        console.log("in side log out fun")
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Failed to log out. Please try again.' });
            }

            // Optionally clear the cookie as well if it exists
            res.clearCookie('connect.sid'); // 'connect.sid' is the default cookie name for express-session

            // Redirect the user to the login page or home after logout
            return res.redirect('/'); // or res.send('Logged out successfully.');
        });
    }

}
