import { useState} from "react";
import {useNavigate} from "react-router-dom"
export function SignupForm() {
const  navigate =useNavigate()
    const [details,setDetails] =useState({
      name:"",email:"",password:""
    })
  const signup=async()=>{
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.exists) {
        alert("User already exists");
      } else if (data.register) {
        localStorage.setItem('token',data.token)
        alert("Registered successfully");
        navigate("/home");
      } else {
        alert("Enter correct details");
      }
      console.log(data.message);
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
  <>
     <div className="form" >
       <h2>Create Account</h2>

      <input type="text" placeholder="Full Name"  onChange={(e)=>setDetails({...details,name:e.target.value})} />
      <input type="email" placeholder="Email"  onChange={(e)=>setDetails({...details,email:e.target.value})} />
      <input type="password" placeholder="Password"  onChange={(e)=>setDetails({...details,password:e.target.value})} />

      <button type="submit" onClick={()=>signup()} >Sign Up</button>
     </div>
</>
  );
}