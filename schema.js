import mongoose from "mongoose";
const user=new mongoose.Schema(
    {
        name: String,
        address: String,
        mobile_no: Number,
        message: String,
    }
);
const User1=new mongoose.model('user',user)
export default User1;