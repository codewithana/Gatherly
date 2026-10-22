const User=require('../models/User.js');
const OTP=require('../models/OTP.js');
const bcrypt=require('bcryptjs');
const {sendOtpEmail}=require('../utils/email.js');

exports.registerUser=async(req,res)=>{
    const {name,email,password,role}=req.body; 

    let userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).json({error:'User already exists'});
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    try{
        const user=new User.create({name,email,password:hashedPassword,role:'User'});

        const otp=Math.floor(100000 + Math.random()*900000).toString();
        console.log(`Otp for ${email} :${otp}`);

        await OTP.create({email,otp,'account_verification'});
        await sendOtpEmail(email,otp,'account_verification');

        res.status(201).json({message:'User registered successfully. Please check your email for OTP verification.',
            email:user.email
        });


    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
        