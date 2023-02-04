const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken")
const User = require("../models/userModels");
const { findOne, remove } = require("../models/userModels");

//Register User
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password,role} = req.body;

    const user = await User.create({
        name,email,password,role
       
    });

    const token = user.getJWTToken();
    sendToken(user,201,res);
});

//Login User

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{

    const {email,password} = req.body;

    //checking if user has given email and password

    if(!email||!password){
        return next(new ErrorHander("Please Enter Email and Password.",400))
    }

    const user = await User.findOne({email}).select("+password");
  
    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
   
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const token = user.getJWTToken();
 
    sendToken(user,200,res);
  
});

//Logout User

exports.logout = catchAsyncErrors(async(req,res,next)=>{
   
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
   
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

