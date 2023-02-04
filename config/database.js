const mongoose = require ("mongoose");


const connectDatabase = (url)=>{
    mongoose.set('strictQuery', true)
    mongoose.connect(url)
    .then(()=>{
        console.log(`Mongodb connected with server`);
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase