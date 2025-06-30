const mongoose = require("mongoose");

async function connectToDB(connection_string) {
    try{
        const response = await mongoose.connect(connection_string, {dbName: "anb"});
        if(response) {
            console.log("Database connected");
        }
        else {
            console.log("Unable to connect to db");
        }
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = connectToDB