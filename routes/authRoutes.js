const express=require("express");
const router=express.Router();
const passport= require('passport')

const Registration=require('../models/Registration')

router.get('/register', (req, res) => {
    res.render('signup')//rendering home.pug file
});

//signup route
router.post('/register', async(req,res)=>{
    try {
     const newUser= new Registration(req.body)
    console.log(newUser);
    let user= await Registration.findOne({
        email: req.body.email
    })
    if(user){
        return res.status(400).send('Not registered, user already exists.')
    }else{
        await Registration.register(newUser, req.body.password, (error)=>{
    if (error){
        throw error;
    }
});
res.redirect('/');
    }
    } catch (error) {
    console.error(error.message)
    res.status(400).send('something went wrong');    
    }
});

//login route
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login', passport.authenticate('local',{failureRedirect:'/login'}), (req,res)=>{
req.session.user=req.user
if(req.user.role==='manager'){
    res.redirect('/managerDashboard')
}else if(req.user.role==='salesexecutive'){
res.redirect('/salesDashboard')
}else{
    res.render('nonuser')
}
});

//logout route
router.get('/logout',(req,res)=>{
    if(req.session){
        req.session.destroy((error)=>{
            if(error){
                return res.status(500).send('Error logging out!')
            }
            res.redirect('/');
        })
    }
})

//get users from database route
router.get("/users", async(req,res)=>{
    try {
       const users = await Registration.find().sort({$natural:-1})
       res.render("usertable", {users}); 
    } catch (error) {
      console.log('error requiring information');  
      res.status(400).send("unable to get users from the DB!");
    }
});

//last line
module.exports=router;
//always import your route file into the server file


