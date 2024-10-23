export const auth = (req, res, next)=>{
    if(req.session.userEmail) {
        console.log("auth",req.session.userEmail)
        next();
    } else{
        res.redirect('/login');
    }
};