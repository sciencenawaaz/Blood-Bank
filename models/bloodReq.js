const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({


            name: {
                 type: String,
                 required: true
              },
            quantity: {
                type: Number,
                required:true,
              },
             bloodtype: {
                type: mongoose.Schema.Types.ObjectId,   //Made change from mongoose.Schema.objectId to mongoose.Schema.Types.ObjectId using stack overflow link to sol -- "https://stackoverflow.com/questions/55809856/typeerror-invalid-value-for-schema-path-type".
                ref: "Blood",
                required: true,
             },

    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Order",orderSchema);