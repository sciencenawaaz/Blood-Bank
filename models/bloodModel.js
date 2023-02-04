const mongoose = require("mongoose");

const bloodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Hospital Name"],
        trim:true
    },
    bloodgroup:{
        type:String,
        required:[true,"Please Enter the Blood Group"]
    },
    quantity:{
        type:Number,
        required:[true,"Please Enter quantitiy of blood in liters"],
        maxLength:[2," cannot exceed 2 characters"],
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Blood",bloodSchema);