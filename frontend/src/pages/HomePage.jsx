import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import { AddtoWishList, ShowListings } from "../services/listingService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate =useNavigate()

  const [listings, setListings] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [sort, setSort] = useState("newest");



  useEffect(() => {
    const timer = setTimeout(() => {
      fetchListings();
    }, 500);

    return () => clearTimeout(timer);
  }, [ title,
  category,
  minPrice,
  maxPrice,
  sort]);

  const fetchListings = async () => {
    const data = await ShowListings({title,category,minPrice,maxPrice,sort});
    if (data) {
      setListings(data);
    }
  };

  return (
    <div className="home">

      <Navbar />

      {/* SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search books, laptops, furniture..."
          className="search-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div className="filters">

        <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Books</option>
          <option>Furniture</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
           onChange={(e)=>setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
           onChange={(e)=>setMaxPrice(e.target.value)}
        />

        <select
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
          >
          <option value="newest">Newest</option>
          <option value="price_asc" >Price Low to High</option>
          <option value="price_desc" >Price High to Low</option>
        </select>

      </div>

      {/* LISTINGS */}

      <div className="grid">

        {listings.length === 0 ? (
          <p className="empty">
            No listings found
          </p>
        ) : (

          listings.map(item => (

            <div
              className="card"
              key={item._id}
            >

              <img
                src={
                  item.images?.[0] ||
                  "https://via.placeholder.com/300"
                }
                alt={item.title}
              />

              <div className="card-body">

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

                <div className="card-actions">

                  <button className="view-btn" onClick={()=>navigate('/listing-view/'+item._id)} >
                    View
                  </button>

                  <button className="chat-btn">
                    💬 Chat
                  </button>

                  <button className="wish-btn" onClick={()=>AddtoWishList(item._id)}  >
                    ❤️
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