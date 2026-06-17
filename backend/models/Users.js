import { Timestamp } from "mongodb";
import mongoose, { mongo } from "mongoose";

const shcema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    

},
{timestamps:true}
)
const User = mongoose.model("User",shcema)
export default User;