import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/createListings.css";

export default function UpdateListing() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [images, setImages] = useState([]);

  // 🔥 FETCH DATA ON LOAD
  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    try {
      let api = await fetch(
        `http://localhost:5000/api/listings/listing/${id}`,
        {
          credentials: "include"
        }
      );

      api = await api.json();

      if (api.listdata) {
        setForm({
          title: api.listdata.title || "",
          description: api.listdata.description || "",
          price: api.listdata.price || "",
          category: api.listdata.category || ""
        });

        setImages(api.listdata.images || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  // 🔥 SUBMIT FUNCTION (FIXED)
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
      `http://localhost:5000/api/listings/update-listing/${id}`,
      {
        method: "PUT",
        credentials: "include",
        body: formData
      }
    );

    const data = await res.json();
   console.log(data);
   
    if (data.success) {
      alert("Updated successfully");
      navigate("/my-listing");
    } else {
      console.log("Update failed");
    }
  };

  return (
    <div className="create-page">

      {/* TOP */}
      <div className="top">
        <button className="back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div>
          <h1>Update Listing</h1>
          <p>Edit your item details</p>
        </div>
      </div>

      <div className="container">

        {/* FORM */}
        <form className="form" onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
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
          </div>

          {/* IMAGE PREVIEW */}
          <div className="image-preview-grid">

            {images.map((img, index) => (
              <div className="image-box" key={index}>

                <img
                  src={
                    typeof img === "string"
                      ? img
                      : URL.createObjectURL(img)
                  }
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

          <button type="submit">
            Update Listing
          </button>

        </form>

        {/* PREVIEW */}
        <div className="preview">

          <div className="card">

            {images.length > 0 ? (
              <img
                src={
                  typeof images[0] === "string"
                    ? images[0]
                    : URL.createObjectURL(images[0])
                }
                alt=""
              />
            ) : (
              <div className="placeholder">
                Image Preview
              </div>
            )}

            <div className="card-body">
              <h2>{form.title || "Product Title"}</h2>
              <p className="price">₹ {form.price || "0"}</p>
              <p className="desc">{form.description || "Preview..."}</p>

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