const mongoose=require('mongoose');
const mongoURI="mongodb+srv://pg15:12345@cluster0.85zjm0s.mongodb.net/parkmeright";
mongoose.set('strictQuery', true);
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo succesfully");
    });
}
module.exports=connectToMongo;