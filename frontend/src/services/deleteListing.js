import { ShowListings } from "./listingService";

export const deleteListing=async(id)=>{
    try{
      let api = await fetch(`http://localhost:5000/api/listings/delete-item/${id}`,{
        method:'DELETE',
        credentials:'include'
      })

      api = await api.json()
      if(api.success){
       console.log('sucess');
       
      }
      else{
        console.log("Error occured at deletelistings");
        
      }
    }
    catch(error){
        console.log(error);
        
    }
}