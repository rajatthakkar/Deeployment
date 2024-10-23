import mongoose from "mongoose";
import userSchema from "../models/users.schmea.js";
export const User = mongoose.model('User', userSchema);
export default class RagisterdReposatory{

     async signup(userData){
      const {email} = userData
       try {
        console.log("in reposatory",email)
        const result = await this.checkIfUserIsRagisterd(email)
        console.log(result)
        if(result){
          return {status:false,message:'user Is alredy Ragisterd'}
        }else{
          const newUser = new User(userData);
          console.log(newUser)
          const user = await newUser.save()
           console.log(user)
           return {status:true,message:"user scuccsfully ragisterd"}
        }
       } catch (error) {
        return {message:'Server error',error:error}
       } 
     }
     async signIn(email, password) {
      console.log("Inside signIn repository");
      try {
          const user = await User.findOne({ email, password });
          if(user){
            return {status:true,message:"Login Done!"}; 
          }
          return {status:false,message:"Frist signup"}; 
      } catch (err) {
          return {status:false,message:err}; // You might want to return null or handle the error in a more specific way
      }
  }
     async checkIfUserIsRagisterd(email){
      console.log("in check",email)
       try{
        const user = await User.findOne({ email }); 
      // Use findOne for a single match
        if (user) {
            console.log("User found:", user);
            return user;
        } else {
           
            return user;  // Return null if no user is found
        }
       }catch(error){

       }
     }
     
}