require('dotenv').config({path: require('path').resolve(__dirname, '.env')});

const dbURI = process.env.MONGO_URL; 
//const mongoURI = "mongodb://localhost:27017";

const mongoose = require('mongoose');
//console.log("db_URI from .env:", dbURI); 
//console.log(process.env); 

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectToMongo = async () => {
  try {
    await mongoose.connect(dbURI, clientOptions, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
   
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose connection lost');
  });

// Connect only once and keep the connection open
connectToMongo();

module.exports = connectToMongo;
