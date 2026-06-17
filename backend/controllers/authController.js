import User from '../models/Users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import clearCookie from 'cookie-parser'
export const registerUser=async(req,resp)=>{
     try{
        const {name , email , password} = req.body;


            if(!name || !email || !password){
    return resp.status(400).json({
        success:false,
        message:"All fields are required"
    })
}

    const existingUser= await User.findOne({email})
    if(existingUser){
        return resp.status(400).json({
            message:"User already exists",
            success:false,
            exists:true
        })
    }


    const hashedpassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name: name,
        email:email,
        password:hashedpassword

    })
    jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'5d'},(err,token)=>{
         if(err){
                return resp.status(400).json({
                    message:'Invalid'
                })
             }

        // cookie 
     resp.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

       resp.status(201).json({
        messsage:"User registered succesfully",
        register:true,
        user:{
         id:user._id,
         name:user.name,
         email:user.email,
           

        },
        token:token
    })
       

    })
 
    
    }
    catch(error){
        resp.status(500).json({
            register:false,
            message:error.message
        })
    }
       
}

export const loginUser=async(req,resp)=>{
    try{
     const {email,password} = req.body;
     if(!email || !password){
        return  resp.status(400).json({
            message:"All fields required"
        })
     }
     const userExists =await User.findOne({email})
     if(!userExists){
    return resp.status(400).json({
        login:false,
        exist:false,
        message:"Invalid credentials"
    })
}
     const isMatch =await bcrypt.compare(password,userExists.password)
     if(userExists.email == email && isMatch ){
      

        jwt.sign({id:userExists._id},process.env.SECRET_KEY,{expiresIn:'5d'},(err,token)=>{
             if(err){
                return resp.status(400).json({
                    message:'Invalid'
                })
             }


             // cookie
                resp.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

              resp.status(200).json({
            login:true,
            message:"User logged-in",
            user:{
                id : userExists._id,
                email:userExists.email
            },
            token:token
        })


             

        })

         
     }
     else{
         return resp.status(400).json({
        login:false,
        message:"Invalid credentials"
    })
        
     }
    

        

    }
    catch(error){
        resp.status(500).json({
            message:error.message
        })
    }
}

export const logoutUser=async(req,resp)=>{
   try{
      resp.clearCookie("token",{
        httpOnly:true,
           secure: process.env.NODE_ENV === "production",
        sameSite:"lax"
      })
       return resp.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
   }
   catch(error){
   return resp.status(500).json({
    success:false,
    message:"Errro occred while logging out"
   })
   }
}


export const myDetails=async(req,resp)=>{
     try {
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return resp.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return resp.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    return resp.status(500).json({
      success: false,
      message: error.message
    });
  }
}