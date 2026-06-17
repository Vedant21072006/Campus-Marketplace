import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/wishlist.css";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/listings/wishlist/items",
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlistItem = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/listings/wishlist/add-items/${id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      setWishlist((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div>
          <h1>❤️ My Wishlist</h1>
          <p>Items you've saved for later</p>
        </div>

      </div>

      <div className="wishlist-stats">
        <h2>{wishlist.length}</h2>
        <span>Saved Items</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">

          <div className="heart">❤️</div>

          <h2>Your wishlist is empty</h2>

          <p>
            Save items you love and they'll appear here.
          </p>

          <button onClick={() => navigate("/")}>
            Browse Listings
          </button>

        </div>
      ) : (
        <div className="wishlist-grid">

          {wishlist.map((item) => (
            <div className="wishlist-card" key={item._id}>

              <img
                src={
                  item.images?.[0] ||
                  "https://via.placeholder.com/300"
                }
                alt=""
              />

              <div className="wishlist-body">

                <h3>{item.title}</h3>

                <p className="price">
                  ₹ {item.price}
                </p>

                <p className="meta">
                  {item.category} • 👀 {item.views}
                </p>

                <p className="seller">
                  👤 {item.seller?.name}
                </p>

                <div className="wishlist-actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(`/listing-view/${item._id}`)
                    }
                  >
                    View Listing
                  </button>

                  <button
                    className="remove-wishlist-btn"
                    onClick={() =>
                      removeWishlistItem(item._id)
                    }
                  >
                    Remove ❤️
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}