
import mongoose  from "mongoose";

const dbConnect=async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected at : ${conn.connection.host}`)

console.log("Database:", conn.connection.name);

    }
   catch(error){
      console.log(`Error occured: ${error}`);
      process.exit(1)
      
   }
}
export default dbConnect;
