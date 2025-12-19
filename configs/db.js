import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async ()=>{
    try{
        mongoose.connection.on('connected',()=> console.log('DataBase Connected'))
        await mongoose.connect(`${process.env.MONGODB_URL}/letsChatDB`)
    }catch(error){
        console.log(error)
    }
}
export default connectDB;