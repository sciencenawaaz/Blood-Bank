const Order = require("../models/bloodReq");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create new order -- not Hospital
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{

    const {
        name,
        quantity,
        bloodtype
    } = req.body;

    const order = await Order.create({
        name,
        quantity,
        bloodtype,
        orderedAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


//Get Logged in user orders

exports.myOrders = catchAsyncErrors(async (req,res,next)=>{
    const orders = await Order.find({user : req.user._id});

    if(!orders){
       return next (new ErrorHander("Orders Empty", 404));
    }

    res.status(200).json({
        success:true,
        orders,
    });
});


//Get all orders -- Hospital

exports.getAllOrders = catchAsyncErrors(async (req,res,next)=>{
    const orders = await Order.find();

    if(!orders){
       return next (new ErrorHander("Orders Empty :( ...!", 404));
    }

    let totalBlood = 0;

    orders.forEach(order => {
        totalBlood ++;
    });

    res.status(200).json({
        success:true,
        totalBlood,
        orders,
    });
});


//Delete order -- Hospital

exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{
    const bloodReq = await Order.findById(req.params.id);

    if(!bloodReq){
        return next (new ErrorHander("Blood not found with this id", 404));
     }

    await bloodReq.remove();

    res.status(200).json({
        success:true,
    });
});