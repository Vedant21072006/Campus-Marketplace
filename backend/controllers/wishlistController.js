// wishlist apis
import Listing from "../models/Listing.js";

export const additemtowishlist = async (req, resp) => {
    try {

        const userId = req.user.id
        const { id } = req.params;

        const listing = await Listing.findById(id);

        if (!listing) {
            return resp.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        const already = listing.wishlist.some(
            mid => mid.toString() === userId
        );

        if (already) {
            listing.wishlist = listing.wishlist.filter(
                mid => mid.toString() !== userId
            );
        } else {
            listing.wishlist.push(userId);
        }

        await listing.save();

        return resp.status(200).json({
            success: true,
            message: already ? "Removed from wishlist" : "Added to wishlist"
        });

    } catch (error) {
        console.log(error);
        
        return resp.status(500).json({
            success: false,
            message: "error occurred"
        });


    }
};



export const getwishlist=async(req,resp)=>{
      try {

        const userId = req.user.id;

        const wishlistData = await Listing.find({
            wishlist: userId
        }).populate("seller", "name email");

        return resp.status(200).json({
            success: true,
            count: wishlistData.length,
            wishlist: wishlistData
        });

    } catch (error) {
        console.log(error);
        
        return resp.status(500).json({
            success: false,
            message: "error occurred"
        });
    }
}



export const deleteWishList=async()=>{


}