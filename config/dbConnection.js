const mongoose = require("mongoose");
const connectDB = async (CONNECTION_STRING) => {
    try {
        const connect = await mongoose.connect(CONNECTION_STRING);
        console.log("Database Connected:", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;