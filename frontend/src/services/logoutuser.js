export const Logout=async()=>{
    try{
       let api = await fetch('http://localhost:5000/api/auth/logout',{
        method:'POST',
        credentials:'include'
       })
       if(api.success){
        console.log("Logout succesfully");
        
       }
       else if(!api.success){
        console.log(api.message);
        
       }
       return true
    }
    catch(error){
        console.log(error);
        return false
        
    }
}