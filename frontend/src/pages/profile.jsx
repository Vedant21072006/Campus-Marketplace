import { useEffect, useState } from "react";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";





export default function Profile() {
  const navigate = useNavigate()
  const [data,setData]= useState({})
  useEffect(()=>{
   ShowProfileDetails()
  },[])
  const ShowProfileDetails=async()=>{
     try{
        let api = await fetch('http://localhost:5000/api/auth/profile',{
          credentials:'include'
        })
        api = await api.json();
        if(api.success){
          setData(api)
        } 
        else {
          console.log("data not recived from backend");
          
        }
     }
     catch(error){
   console.log(error);
   
     }
  }

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">

        <button className="back-btn" onClick={()=>navigate('/home')} >
          ← Back
        </button>

      

      </div>

      {/* PROFILE HERO */}
      <div className="profile-hero">

        <div className="avatar">
          {data.user?.name[0] || " " }
        </div>

        <h1>{data.user?.name || ""}</h1>

        <p>{data.user?.email || "" }</p>

        <span className="member-badge">
          Campus Seller ⭐
        </span>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h2>{data.listingCount}</h2>
          <span>Listings</span>
        </div>

        <div className="stat-card">
          <h2>{data.wishlistCount}</h2>
          <span>Wishlist</span>
        </div>

        <div className="stat-card">
          <h2>{data.totalViews}</h2>
          <span>Total Views</span>
        </div>

        <div className="stat-card">
          <h2>-</h2>
          <span>Items Sold</span>
        </div>

      </div>

      {/* ACCOUNT INFO */}
      <div className="profile-card">

        <div className="card-title">
          <h2>Account Information</h2>
        </div>

        <div className="info-grid">

          <div className="info-item">
            <label>Full Name</label>
            <input
              type="text"
              value={data.user?.name || ""} 
              readOnly
            />
          </div>

          <div className="info-item">
            <label>Email</label>
            <input
              type="text"
              value={data.user?.email || "" }
              readOnly
            />
          </div>

        

          <div className="info-item">
            <label>College</label>
            <input
              type="text"
              value="Pimpri Chinchwad University"
              readOnly
            />
          </div>

        </div>

      </div>

      {/* SECURITY */}
      <div className="profile-card">

        <div className="card-title">
          <h2>Security</h2>
        </div>

        <div className="security-actions">

          <button className="action-btn">
            🔒 Change Password
          </button>


        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="profile-card">

        <div className="card-title">
          <h2>Quick Actions</h2>
        </div>

        <div className="quick-grid">

          <button className="quick-btn" onClick={()=>navigate('/my-listing')} >
            📦 My Listings
          </button>

          <button className="quick-btn" onClick={()=>navigate('/wishlist')} >
            ❤️ Wishlist
          </button>

          <button className="quick-btn" onClick={()=>navigate('/add-item')} >
            ➕ Create Listing
          </button>

        

        </div>

      </div>

    </div>
  );
}