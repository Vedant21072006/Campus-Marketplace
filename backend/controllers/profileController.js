import User from "../models/Users.js";
import Listing from "../models/Listing.js";

export const ProfileDetails = async (req, resp) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");
    const listings = await Listing.find({seller:req.user.id})
    if (!user) {
      return resp.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    const totalViews = listings.reduce(
  (sum,item)=>sum + item.views,
  0
);

    const listingCount = await Listing.countDocuments({
      seller: req.user.id
    });
    

    const wishlistCount = await Listing.countDocuments({
      wishlist: req.user.id
    });

    return resp.status(200).json({
      success: true,
      user,
      listingCount,
      wishlistCount,
      totalViews
      

    });

  } catch (error) {
    return resp.status(500).json({
      success: false,
      message: error.message
    });
  }
};