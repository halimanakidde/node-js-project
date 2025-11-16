//1. dependencies
const express = require('express');//importing dependency
const path = require('path');//importing path module
const mongoose = require ('mongoose');
const passport = require('passport');/*  PASSPORT SETUP  */
const expressSession = require('express-session')({
    secret:"my secret",
    resave: false,
    saveUninitialized: false,
});
require('dotenv').config();

//import registration model
const Registration=require('./models/Registration')

//import routes
const indexRoutes=require('./routes/indexRoutes');
const stockRoutes=require('./routes/stockRoutes');
const authRoutes=require('./routes/authRoutes');
const salesRoutes=require('./routes/salesRoutes');

//2. instantiations
const app=express();//creating an express application
const port=3000;

//3. configurations
//setting up database connection
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
    .once('open', ()=>{
        console.log('mongoose connection open');
    })
    .on('error', (error)=>{
        console.error(`connection error: ${error.message}`)
    });

    //set view engine to pug
app.set('view engine', 'pug');//setting pug as the view engine
app.set('views', path.join(__dirname, 'views',));//specifying views directory

//4. middleware
app.use(expressSession);
app.use(express.urlencoded({extended: false}));//middleware to parse urlencoded request bodies 
app.use(express.static(path.join(__dirname, "public")));
app.use('/public/images/uploads', express.static(__dirname + '/public/images/uploads'));

//global variables to be accessec by all views
app.use((req, res, next)=>{
    res.locals.currentUser = req.session.user;
    next();
})

//express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

//passport configurations
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

//5. routes
app.use('/', indexRoutes);//using imported route
app.use('/', stockRoutes);// always use full route path
app.use('/', authRoutes);
app.use('/', salesRoutes);


 //non existing routes
app .use((req,res)=>{//middleware to handle non-existing routes
     res.status(404).send("Oops! route Not Found!");//sending 404 response
 });

 //6. bootstrapping the server 
app.listen(port ,()=>console.log(`listening on port ${port}`));//server is listening on port 3000   