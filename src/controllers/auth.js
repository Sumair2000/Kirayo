const User = require('../models/user');
const Token = require('../models/token');
const {sendEmail} = require('../utils/index');
const sgMail = require('@sendgrid/mail')
const { OAuth2Client } = require('google-auth-library') 
require('dotenv').config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route POST auth/googlesignup
exports.googlesignup = (req,res) => {
    const { email, tokenId } = req.body;
    client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
    }).then(async response => {
        const {email_verified,email,name} = response.payload;
        if(email_verified){
            const user = await User.findOne({email})
                .exec((err,user) => {
                if(err){
                    return res.status(400).json({
                        error: "Something went wrong!!!..."
                    })
                } else {
                    if(user) {
                        res.status(200).json({message: "This account is already registerted"})
                        console.log("This account is already registerted");
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        let newUser = new User({email,name,password,isVerified: email_verified, isGoogleAccount: true});
                        console.log(newUser);
                        newUser.save((err,data) => {
                            if(err){
                                return res.status(400).json({
                                    error: "Something went wrong..."
                                })
                            }
                            res.status(200).json({token: data.generateJWT(), data: data});
                        })
                    }
                }
            })
        }
    })
}

// @route POST auth/googlelogin
exports.googlelogin = (req,res) => {
    const { email, tokenId } = req.body;
    client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
    }).then(async response => {
        const {email_verified,email,name} = response.payload;
       
            const user = await User.findOne({email})
                .exec((err,user) => {
                if(err){
                    return res.status(400).json({
                        error: "Something went wrong!!!..."
                    })
                } else {
                    if(user) {
                        try {
                            // Login successful, write token, and send back user
                            res.status(200).json({token: user.generateJWT(), user: user});
                        } catch (error) {
                            res.status(400).json({message: error.message})
                        }
                    } else {
                        res.status(400).json({message: "Please register your gmail account."})
                        
                    }
                }
            })
        
    })

}
// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    try {
        let success = false;
        const { email,password, confirmPassword } = req.body;
        if(password!=confirmPassword) return res.status(422).json({success, message: "Password doesn't match"})
        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({success,message: 'The email address you have entered is already associated with another account.'});
        
        const newUser = new User({ ...req.body});

        const user_ = await newUser.save();

        await sendVerificationEmail(user_, req, res);

    } catch (error) {
        res.status(422).json({success:false , message: error.message})
    }
};

// @route POST auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res) => {
    try {
        let success = false;
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({success,msg: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.'});

        //validate password
        if (!user.comparePassword(password)) return res.status(401).json({message: 'Invalid email or password'});

        // Make sure the user has been verified
        if (!user.isVerified) return res.status(400).json({success, type: 'not-verified', message: 'Your account has not been verified.' });
        let token =  user.generateJWT()

        success = true;
        res.status(200).json({success,token , user: user});
    } catch (error) {
        res.status(401).json({message: error.message})
    }
    
};


// ===EMAIL VERIFICATION
// @route GET auth/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res) => {
    if(!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});

    try {
        // Find a matching token
        const token = await Token.findOne({ token: req.params.token });

        if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token.userId }, (err, user) => {
            if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

            if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) return res.status(500).json({message:err.message});

                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route POST auth/resend
// @desc Resend Verification Token
// @access Public
exports.resendToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

        await sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

async function sendVerificationEmail(user, req, res){

    const token = user.generateVerificationToken();

         // Save the verification token
        await token.save();
       
    try{
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        let subject = "Account Verification Token";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link="http://"+req.headers.host+"/auth/verify/"+token.token;
        let html = `<p>Hi ${user.name}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({to, from, subject, html});

        res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}
