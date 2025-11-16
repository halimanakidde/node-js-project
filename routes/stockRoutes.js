const express=require("express");
const router=express.Router();
//const connectEnsureLogin = require('connect-ensure-login');
const multer = require('multer');
const {ensureAuthenticated, ensureManager, ensureSalesExecutive} = require("../customMiddleware/auth");

const furnitureStock = require('../models/Furniturestock')
const woodStock = require('../models/Woodstock');

// image configs
var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) =>{
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

//furniture registration route
router.get('/furnitureRegister',ensureAuthenticated, ensureManager, (req, res)=>{
    res.render('furniture')
});

router.post('/furnitureRegister',ensureAuthenticated, ensureManager, upload.single("furnitureimage"), async(req, res)=>{
    try {
        const furniture = new furnitureStock(req.body);
        furniture.furnitureimage = req.file.path
        console.log(furniture);
    await furniture.save();
        res.redirect('/woodRegister');
    } catch (error) {
        console.error(error);
        res.redirect('/furnitureRegister');
    }
});

// wood registration route
router.get('/woodRegister', (req, res)=>{
    res.render('woodreg')
});

router.post('/woodRegister',async (req, res)=>{
try {
    const wood= new woodStock(req.body)
console.log(wood);
wood.save()
res.redirect('/furnitureRegister');//redirect to a route path not to a file    
} catch (error) {
 res.redirect('/woodRegister');   
}
 });   

 // route for getting furniture registered from the database
 router.get('/furnitureRegistered', async(req,res)=>{
    try {
        const Furniture=await furnitureStock.find();
        res.render('furnituretables', {Furniture});
    } catch (error) {
       console.error('error getting furniture from the database!') 
    //    res.redirect('/')
    }
 });

 //route for updating furniture/ get furniture stock to update
 router.get('/furniture/:id', async(req,res)=>{
    try {
        const furnitureUpdate = await furnitureStock.findOne({_id:req.params.id});
        res.render('update_furniture', {item:furnitureUpdate})
    } catch (error) {
      res.status(400).send('Unable to find item in the database')
      console.log(error);  
    }
 });

 //route for updating furniture/ get furniture stock to update
 router.post('/furniture', async(req,res)=>{
    try {
        await furnitureStock.findByIdAndUpdate({_id:req.query.id}, req.body);
        res.redirect('/furnitureRegistered')
    } catch (error) {
      res.status(400).send('Unable to update furniture in the database')
      console.log(error);  
    }
 });

 //route for deleting furniture 
 router.post('/deletefurniture', async(req,res)=>{
    try {
        await furnitureStock.deleteOne({_id:req.body.id}, req.body);
        res.redirect('/furnitureRegistered')
    } catch (error) {
      res.status(400).send('Unable to update furniture in the database')
      console.log(error);  
    }
 });

 //route for getting wood registered from the database
 router.get('/woodRegistered', async(req,res)=>{
    try {
        const wood=await woodStock.find();
        res.render('woodtable', {wood})
    } catch (error) {
       console.error('error getting wood stock from the database!') 
       res.redirect('/woodRegistered')
    }
 });

 


 


module.exports=router;
