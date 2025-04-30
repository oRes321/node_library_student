const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://Ores321:Ores321@cluster0.t3yqfy7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
   try {
       await mongoose.connect(mongoURI);
       console.log('MongoDB connected successfully');
   } catch (err) {
       console.error('Database connection failed:', err);
   }
};

module.exports = connectDB;