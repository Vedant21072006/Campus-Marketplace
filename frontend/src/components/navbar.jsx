import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { Logout } from "../services/logoutuser";

export default function Navbar() {
  const navigate = useNavigate()
 const logoutUser=async()=>{
   let res= await Logout()
    if(res){
      navigate('/')
    }
    else{
      navigate('/home')
    }

  }
  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        CampusMarket
      </div>

    

      {/* NAV ACTIONS */}
      <div className="nav-links">

        <button onClick={()=>navigate('/wishlist')} > ❤️ Wishlist</button>
        <button  onClick={()=>navigate('/my-listing')}  >My Listings</button>

        {/* PROFILE DROPDOWN */}
        <div className="profile">
          <div className="profile-btn">
            👤 Profile
          </div>

          <div className="dropdown">
            <p onClick={()=>navigate('/profile')}  >My Profile</p>
            <p>Settings</p>
            <p>💬 Chats</p>

            <p className="logout" onClick={()=>logoutUser()} > Logout</p>
          </div>
        </div>

      </div>

    </nav>
  );
}