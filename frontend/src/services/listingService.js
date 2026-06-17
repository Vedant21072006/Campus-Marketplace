export const ShowListings=async({
title="",
  category = "",
  minPrice = "",
  maxPrice = "",
  sort = ""})=>{
        try {  
    
  const params = new URLSearchParams();

  if (title) params.append("title", title);
  if (category) params.append("category", category);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  if (sort) params.append("sort", sort);

  const res = await fetch(
    `http://localhost:5000/api/listings?${params.toString()}`,{
      credentials:'include'
    });

  const data = await res.json();

       return data.listdata;

    } catch (error) {
      console.log(error);
    }

  }

export const AddtoWishList=async(id)=>{
  try{
     let res = await fetch(`http://localhost:5000/api/listings/wishlist/add-items/${id}`,{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      }
     })
     if(res){
       alert('item added to wishlist')
     }
  }
  catch(error){
    console.log("erorr:",error.message);
    
  }
}