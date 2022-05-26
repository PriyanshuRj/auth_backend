const User = require('../model/usermodel');
const Otp = require('../model/otp');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'priyanshurajput0071109@gmail.com',
      pass: 'Rajput@11092001'
    }
  });
const signup = function(req,res){
    const {username,password,mobileno,email} = req.body;
    User.find({email:email},function(err,foundUser){
        if(err){
            res.status(300).json({message: "Error occured"});
        }
        console.log(foundUser);
        if(foundUser.length>=1){
            res.status(402).json({message:"User With this email already exists"})
        }
        else{
            User.create({email:email,name:username,password:password,mobileno:mobileno,verified:false});
            var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            console.log(otp);
            Otp.deleteMany({email:email},function(err,foundotp){
                if(err){
                    res.status(402).josn({message:"err"});
                }
                else{
                    console.log('deleted older otps')
                }
            })
            Otp.create({email:email,otp:otp});
            const mailOptions = {
                from: 'priyanshurajput0071109@gmail.com', // Sender address
                to: email, // List of recipients
                subject: 'Verification Code', // Subject line
                text: `Dear User,\nYour OTP for registering to our authentication service is ${otp}`, // Plain text body
                html:`<div>Dear User, <br>Your OTP for registering to our authentication service is <b>${otp}</b></div>`
           };
           
           transporter.sendMail(mailOptions, function(err, info) {
               if (err) {
                 console.log(err)
               } else {
                 console.log(info);
               }
           });
            res.status(200).json({message:"User created !!"});
        }
    })
}
const requestotp = function(req,res){
    const email = req.body.email;
    var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            console.log(otp);
            Otp.deleteMany({email:email},function(err,foundotp){
                if(err){
                    res.status(402).josn({message:"err"});
                }
                else{
                    console.log('deleted older otps')
                }
            })
            Otp.create({email:email,otp:otp});
            const mailOptions = {
                from: 'priyanshurajput0071109@gmail.com', // Sender address
                to: email, // List of recipients
                subject: 'Verification Code', // Subject line
                text: `Dear User,\nYour OTP for registering to our authentication service is ${otp}`, // Plain text body
                html:`<div>Dear User, <br>Your OTP for registering to our authentication service is <b>${otp}</b></div>`
           };
           
           transporter.sendMail(mailOptions, function(err, info) {
               if (err) {
                 console.log(err)
               } else {
                 console.log(info);
               }
            })
            res.status(200).json({message:"OTP send successfully !!"});
}
const login = function(req,res){
 const {email,password} = req.body;
 User.findOne({email:email,password:password},function(err,foundUser){
     if(err){
         console.log("Error!!");
         res.status(300).json({message: "Error occured"});
     }
     else{
        if(!foundUser){
         res.status(200).json({message: "No user found"});
        }
        else{
            if(foundUser.verified){
                res.status(200).json({message:"Correct credential",state:1});
            }
            else{
                var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            console.log(otp);
            Otp.deleteMany({email:email},function(err,foundotp){
                if(err){
                    res.status(402).josn({message:"err"});
                }
                else{
                    console.log('deleted older otps')
                }
            })
            Otp.create({email:email,otp:otp});
                res.status(200).json({message:"User Not verified, verify first",state:2});
            }
        }
     }
 })
}
const otpverify = function(req,res){
    const {email,otp} = req.body;
    Otp.findOne({email:email},function(err,foundotp){
        if(err){
            res.status(300).json({message: "Error occured"});
        }
        if(!foundotp) res.status(200).json({message:"Wrong otp"});
        if(otp===foundotp.otp){
            User.findOne({email:email},function(err,founduser){
                if(err){
                    res.status(300).json({message: "Error occured"});
                }
                founduser.verified = true;
                founduser.save();
                res.status(200).json({message:"OTP is correct !!"});

            })
        }
        else{
            res.status(400).json({messgae:"OTP just entered is wrong"})
        }
    })
}
module.exports = {
    signup,
    login,
    otpverify,
    requestotp
}