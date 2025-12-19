import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    full_name:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, required:true},
    bio:{type:String, default:"Hey there ! I am using LetsChat."},
    profile_picture:{type:String, default:"https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"},
    cover_picture:{type:String, default:"https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"},
    location:{type:String, default:""},
    followers:[{type:String,ref:'user'}],
    following:[{type:String,ref:'user'}],
    connections:[{type:String,ref:'user'}],
},{timestamps:true,minimize:false});

const user = mongoose.model('user',userSchema);
export default user;