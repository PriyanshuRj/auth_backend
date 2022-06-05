const User = require('../model/usermodel');
const Otp = require('../model/otp');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});
const signup = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log(req.body);
    const { username, password, mobileno, email } = req.body;
    if (username && password && mobileno && email) {

        User.find({ email: email }, function (err, foundUser) {
            if (err) {
                res.status(300).json({ message: "Error occured" });
            }
            console.log(foundUser);
            if (foundUser.length >= 1) {
                res.status(200).json({ message: "User With this email already exists", state: 200 })
            }
            else {
                User.create({ email: email, name: username, password: password, mobileno: mobileno, verified: false });
                var otp = Math.random();
                otp = otp * 1000000;
                otp = parseInt(otp);
                console.log(otp);
                Otp.deleteMany({ email: email }, function (err, foundotp) {
                    if (err) {
                        res.status(301).josn({ message: "err" });
                    }
                    else {
                        console.log('deleted older otps')
                    }
                })
                Otp.create({ email: email, otp: otp });
                const mailOptions = {
                    from: 'priyanshurajput0071109@gmail.com', // Sender address
                    to: email, // List of recipients
                    subject: 'Verification Code', // Subject line
                    text: `Dear User,\nYour OTP for registering to our authentication service is ${otp}`, // Plain text body
                    html: `<div>Dear User, <br>Your OTP for registering to our authentication service is <b>${otp}</b></div>`
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Mail Send");
                    }
                });
                res.status(200).json({ message: "User created !!" });
            }
        })
    }
    else {
        res.status(200).json({ message: "Please fill all the fields", state: 0 });
    }
}
const requestotp = function (req, res) {
    console.log(req.body.email);
    const email = req.body.email;
    if (email) {

        var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);
        Otp.deleteMany({ email: email }, function (err, foundotp) {
            if (err) {
                res.status(402).josn({ message: "err" });
            }
            else {
                console.log('deleted older otps')
            }
        })
        Otp.create({ email: email, otp: otp });
        const mailOptions = {
            from: 'priyanshurajput0071109@gmail.com', // Sender address
            to: email, // List of recipients
            subject: 'Verification Code', // Subject line
            text: `Dear User,\nYour OTP for registering to our authentication service is ${otp}`, // Plain text body
            html: `<div>Dear User, <br>Your OTP for registering to our authentication service is <b>${otp}</b></div>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log("Mail Send");
            }
        })
        res.status(200).json({ message: "OTP send successfully !!" });
    }
    else {
        res.status(404).json({ message: "Please fill all the fields" });
    }
}
const login = function (req, res) {
    const { email, password } = req.body;
    if (email && password) {

        User.findOne({ email: email, password: password }, function (err, foundUser) {
            if (err) {
                console.log("Error!!");
                res.status(300).json({ message: "Error occured" });
            }
            else {
                if (!foundUser) {
                    res.status(200).json({ message: "Inccorect Credential" });
                }
                else {
                    if (foundUser.verified) {
                        res.status(200).json({ message: "Correct credential", state: 1 });
                    }
                    else {
                        var otp = Math.random();
                        otp = otp * 1000000;
                        otp = parseInt(otp);
                        console.log(otp);
                        Otp.deleteMany({ email: email }, function (err, foundotp) {
                            if (err) {
                                res.status(402).josn({ message: "err" });
                            }
                            else {
                                console.log('deleted older otps')
                            }
                        })
                        Otp.create({ email: email, otp: otp });
                        res.status(200).json({ message: "User Not verified, verify first", state: 2 });
                    }
                }
            }
        })
    }
    else {
        res.status(404).json({ message: "Please fill all the fields" });
    }
}
const otpverify = function (req, res) {
    const { email, otp } = req.body;
    if (email && otp) {
        Otp.findOne({ email: email }, function (err, foundotp) {
            if (err) {
                res.status(300).json({ message: "Error occured" });
            }
            if (!foundotp) res.status(200).json({ message: "Wrong otp" });
            if (otp === foundotp.otp) {
                User.findOne({ email: email }, function (err, founduser) {
                    if (err) {
                        res.status(300).json({ message: "Error occured" });
                    }
                    founduser.verified = true;
                    founduser.save();
                    res.status(200).json({ message: "OTP is correct !!" });

                })
            }
            else {
                res.status(200).json({ message: "OTP just entered is wrong" })
            }
        })
    }
    else {
        res.status(404).json({ message: "Please fill all the fields" });
    }
}
module.exports = {
    signup,
    login,
    otpverify,
    requestotp
}