import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate()
  const [details,setDetails] = useState();
  const Login=async()=>{
      try{
         let res = await fetch('http://localhost:5000/api/auth/login',{
          method:'POST',
          credentials:'include',
          body:JSON.stringify(details),
          headers:{
            'Content-Type':'application/json'
          }
         })
        res = await res.json()
        if(res.login){
          localStorage.setItem('token',res.token)
           navigate('/home')

        }
        else if(!res.exist){
           alert('Account  doesnt exist')
        }
        else{
          alert("Try again ")
        }
      console.log(res.message);
      
      }
      catch(error){
        console.log(error);
        
        alert("Error occured")
      }
  }
  return (
    <div className="form">
      <h2>Welcome Back</h2>

      <input type="email" placeholder="Email" onChange={(e)=>setDetails({...details,email:e.target.value})}  />
      <input type="password" placeholder="Password" onChange={(e)=>setDetails({...details,password:e.target.value})} />

      <button type="submit" onClick={()=>Login()} >Login</button>
    </div>
  );
}