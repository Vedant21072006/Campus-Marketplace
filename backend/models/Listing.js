import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

  images: {
  type: [String],
  default: [],
},

    category: {
      type: String,
      required: true,
      enum: ["Books", "Electronics", "Cycles", "Furniture", "Other"],
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    status: {
      type: String,
      enum: ["available", "reserved", "sold"],
      default: "available",
    },
    wishlist:[
              {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }
    ],
           
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;