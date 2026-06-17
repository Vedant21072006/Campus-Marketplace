import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/listingDetails.css";

export default function ListingDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("");
const [fullscreenImage, setFullscreenImage] = useState(null);
  const [listing, setListing] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {

      const res = await fetch(
        `http://localhost:5000/api/listings/listing/${id}`
      );

      const data = await res.json();

      setListing(data.listdata);

    } catch (error) {
      console.log(error);
    }
  };

  if (!listing) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
   <>

       {/* BACK BUTTON */}
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
   <div className="product-section">

  {/* LEFT SIDE */}
  <div className="product-images">

    <img
      src={selectedImage || listing.images?.[0]}
      alt=""
      className="main-image"
      onClick={() =>
        setSelectedImage(
          selectedImage || listing.images?.[0]
        )
      }
    />

    <div className="gallery">

      {listing.images?.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          className="gallery-image"
          onClick={() => setSelectedImage(img)}
        />
      ))}

    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="product-info">

    <h1>{listing.title}</h1>

    <h2 className="price">
      ₹ {listing.price}
    </h2>

    <div className="badges">
      <span>{listing.category}</span>
      <span>👀 {listing.views} Views</span>
    </div>

    <div className="seller-card">

      <h3>Seller Information</h3>

      <p>👤 {listing.seller?.name}</p>

      <p>✉️ {listing.seller?.email}</p>

    </div>

    <div className="actions">

      <button className="wishlist-btn">
        ❤️ Wishlist
      </button>

      <button className="chat-btn">
        💬 Chat Owner
      </button>

    </div>

  </div>

</div>

<div className="description-card">

  <h3>Description</h3>

  <p>{listing.description}</p>

</div>
   </>
  );
}