const Blood = require("../models/bloodModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const User = require("../models/userModels");
const userModels = require("../models/userModels");


// Create Blood -- Hospitals
exports.createBlood = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const blood = await Blood.create(req.body);
    res.status(201).json({
        success: true,
        blood
    });
});

//Get All Blood
exports.getAllBlood = catchAsyncErrors(async (req, res) => {
    
    const resultPerPage = 5;
    

    const apiFeature = new ApiFeatures(Blood.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);


    const allBlood = await apiFeature.query;
    res.status(200).json({
        success: true,
        allBlood
    });
});

//Get Blood Details --Hospital
exports.getBloodDetails = catchAsyncErrors(async (req,res,next)=>{

    const bloodinfo = await Blood.find({user : req.user._id});
 
    if(!bloodinfo){
        return next(new ErrorHander("Blood details not found",404));
    }

    res.status(200).json({
        success:true,
        bloodinfo
    });
});

//Update Blood info -- Hospital

exports.updateBlood = catchAsyncErrors(async (req, res, next) => {
   
    const blood = await Blood.findById(req.params.id);
   
    if(!blood){
        return next(new ErrorHander("Blood not found",404));
    }
   
    const blood1 = await Blood.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        blood1
    });
});

//Delete Blood

exports.deleteBlood = catchAsyncErrors(async(req,res,next)=>{
    const blood = await Blood.findById(req.params.id);

    if(!blood){
        return next(new ErrorHander("Blood not found",404));
    }

    await blood.remove();

    res.status(200).json({
        success:true,
        message:"Blood Deleted Successfully"
    });
});
