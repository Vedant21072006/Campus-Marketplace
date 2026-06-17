import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mylisting.css";
import { deleteListing } from "../services/deleteListing";


export default function MyListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
   
  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    const res = await fetch(
      "http://localhost:5000/api/listings/my-listing",{
        credentials:'include'
      });
    const data = await res.json();
    setListings(data.listdata || []);
  };

  const deletemyitem=async(id)=>{
    await deleteListing(id)
    fetchMyListings()
  }

  const updatemyitem=async(id)=>{
      await updateListing(id)
      navigate('/my-listing')
  }
  return (
    <div className="mylistings-page">

      {/* HEADER */}
      <div className="header">

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>My Listings</h1>

        <button className="create-btn" onClick={()=>navigate('/add-item')} >
          + Create Listing
        </button>
      </div>

      {/* GRID */}
      <div className="grid">

        {listings.length === 0 ? (
          <p className="empty">No listings found</p>
        ) : (
          listings.map((item) => (
            <div className="card" key={item._id}>

              {/* IMAGE */}
              <div className="img-wrapper">

                <img
                  src={item.images?.[0]}
                  alt=""
                />

                {/* STATUS BADGE */}
                <span
                  className={`status ${
                    item.isSold ? "sold" : "active"
                  }`}
                >
                  {item.isSold ? "SOLD" : "ACTIVE"}
                </span>

              </div>

              {/* BODY */}
              <div className="card-body">

                <h3>{item.title}</h3>

                <p className="price">
                  ₹ {item.price}
                </p>

                <p className="meta">
                  {item.category} • 👀 {item.views}
                </p>

             
                <div className="actions">

                  <button className="edit" onClick={()=>navigate(`/edit-item/${item._id}`)} >
                    ✏️ Edit
                  </button>

                  <button className="delete" onClick={()=>deletemyitem(item._id)} >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}