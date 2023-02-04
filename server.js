const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

//config

dotenv.config({path:"config/config.env"});

const server = async () => {

    try {
       connectDatabase(process.env.MONGODB_URL) ;
       app.listen(process.env.PORT, () => console.log(`Server has started on port http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error);
    }
}

//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});

server();