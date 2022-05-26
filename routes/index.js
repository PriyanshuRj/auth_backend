const express = require("express");
const usercontroller = require("../controllers/usercontroller");
const router = express.Router();
router.get('/',function(req,res){
    res.status(200).json({message:"Listining to you"})
})
router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.login);
router.post('/otpverify',usercontroller.otpverify);
router.post("/requestotp",usercontroller.requestotp);
module.exports = router;