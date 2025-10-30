const express=require("express");
const router=express.Router();

router.get('/', (req, res) => {
    res.render('home')//rendering home.pug file
});

router.get('/servicePage', (req, res)=>{
    res.render('services');
});


//last line
module.exports=router;
//always import your route file into the server file


