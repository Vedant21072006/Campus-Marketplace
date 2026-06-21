import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Listing',
        required:true
    },
   buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true
   },
   seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true
   },
   lastmessage:{
    type:String,
    default:""
   },
},
{
    timestamps:true,
}
  
);
conversationSchema.index(
  {
    listing: 1,
    buyer: 1,
    seller: 1,
  },
  { unique: true }
);
export default mongoose.model("Conversation",conversationSchema)