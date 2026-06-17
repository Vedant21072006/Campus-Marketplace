import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createListings.css";

export default function CreateListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [images, setImages] = useState([]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const updated = [...images, ...files].slice(0, 5);
    setImages(updated);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  
  const handleSubmit = async (e) => {
     e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);

    images.forEach((img) => {
      formData.append("image", img);
    });

    const res = await fetch(
      "http://localhost:5000/api/listings/create",
      {
        method: "POST",
        credentials:'include',
        body: formData
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Listing created successfully");
      navigate("/my-listing");
    }
    else{
      console.log("try again error occrued");
      
    }
  };

  return (
    <div className="create-page">

  
      <div className="top">
        <button className="back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div>
          <h1>Create Listing</h1>
          <p>Sell your item in seconds</p>
        </div>
      </div>

      
      <div className="container">

      
        <form className="form" onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
          />

          <select name="category" onChange={handleChange}>
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Furniture</option>
          </select>

          {/* IMAGE UPLOAD */}
          <div className="image-upload">

            <label className="upload-box">
              + Add Images (Max 5)
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImages}
              />
            </label>

            <p className="hint">
              You can upload up to 5 images
            </p>

          </div>

          {/* IMAGE PREVIEW */}
          <div className="image-preview-grid">

            {images.map((img, index) => (
              <div className="image-box" key={index}>

                <img
                  src={URL.createObjectURL(img)}
                  alt=""
                />

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>

              </div>
            ))}

          </div>

          <button type="submit" >
            Publish Listing
          </button>

        </form>

        {/* LIVE PREVIEW */}
        <div className="preview">

          <div className="card">

            {images.length > 0 ? (
              <img
                src={URL.createObjectURL(images[0])}
                alt=""
              />
            ) : (
              <div className="placeholder">
                Image Preview
              </div>
            )}

            <div className="card-body">

              <h2>
                {form.title || "Product Title"}
              </h2>

              <p className="price">
                ₹ {form.price || "0"}
              </p>

              <p className="desc">
                {form.description ||
                  "Live preview of your listing..."}
              </p>

              <span className="badge">
                {form.category || "Category"}
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}