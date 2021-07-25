const mongoose = require("mongoose")


export const connectDb = async() => {
 try {

     await mongoose
       .connect(
         `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.uv3ti.mongodb.net/amazon?retryWrites=true&w=majority`,
         {
           useCreateIndex: true,
           useNewUrlParser: true,
           useFindAndModify: true,
           useUnifiedTopology: true,
         }
       )
       .then((res) => console.log("Connected to DB"));
 } catch (error) {
     console.log("Failed to connect to mongodb")
 } 
}