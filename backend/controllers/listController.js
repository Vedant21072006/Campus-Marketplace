import { CommandSucceededEvent } from 'mongodb';
import Listing from '../models/Listing.js'
import cloudinary from '../config/cloudinary.js'

export const CreateListings = async (req, resp) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);
    // console.log("USER:", req.user);

    const { title, description, price, category } = req.body;

    if (!req.user) {
      return resp.status(401).json({ message: "User not found" });
    }

    const sellerId = req.user.id;

    if (!title || !description || !price || !category) {
      return resp.status(400).json({
        message: "All fields required"
      });
    }

    if (!req.files || req.files.length === 0) {
      return resp.status(400).json({
        message: "No images uploaded"
      });
    }

    const imageUrls = [];

    for (const file of req.files) {
      console.log("Uploading:", file.path);

      const result = await cloudinary.uploader.upload(file.path);

      imageUrls.push(result.secure_url);
    }

    const listingitem = await Listing.create({
      title,
      description,
      price,
      category,
      seller: sellerId,
      images: imageUrls
    });

    return resp.status(201).json({
      success: true,
      message: "Item added",
      listingitem
    });

  } catch (err) {
    console.log("ERROR:", err);

    return resp.status(500).json({
      success: false,
      message: err.message
    });
  }
};
export const ShowListings = async (req, resp) => {
    try {

        const {
            title,
            category,
            minPrice,
            maxPrice,
            sort
        } = req.query;

        let query = {};
        if (title) {
            query.title = {
                $regex: title,
                $options: "i"
            };
        }


        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }


        let mongoQuery = Listing.find(query).populate("seller", "name email");


        if (sort === "price_asc") {
            mongoQuery = mongoQuery.sort({ price: 1 });
        }
        else if (sort === "price_desc") {
            mongoQuery = mongoQuery.sort({ price: -1 });
        }
        else if (sort === "newest") {
            mongoQuery = mongoQuery.sort({ createdAt: -1 });
        }
        else {
            mongoQuery = mongoQuery.sort({ createdAt: -1 });
        }

        const listdata = await mongoQuery;

        return resp.status(200).json({
            success: true,
            count: listdata.length,
            listdata
        });

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Try again"
        });
    }
};


export const ShowListingsById = async (req, resp) => {

    try {
        let listdata = await Listing.findById(req.params.id).populate("seller","name email")
        if (!listdata) {
            return resp.status(400).json({
                sucess: false,
                message: 'id not found',
            })
        }
        listdata.views +=1;
        await listdata.save()
        resp.status(200).json({
            sucess: true,
            listdata
        })

    }
    catch (error) {
        return resp.status(500).json({
            sucess: false
        })
    }
}

export const deleteItem = async (req, resp) => {
    try {
        const { id } = req.params;
        console.log(id);
        
        let listdata = await Listing.findById(id)

        if (!listdata) {
            return resp.status(404).json({
                success: false,
                message: "Listing not found"
            })
        }

        if (listdata.seller.toString() != req.user.id) {
            return resp.status(403).json({
                sucess: false,
                message: 'Unauthorized access'
            })
        }
        let deletedata = await Listing.findByIdAndDelete(id)
        return resp.status(200).json({
            success: true,
            listdata

        })

    }
    catch (error) {

        return resp.status(500).json({
            sucess: false
        })
    }
}

export const myListings = async (req, resp) => {
    try {
        let listdata = await Listing.find({
            seller: req.user.id
        })
        if (listdata.length == 0) {
            return resp.status(404).json({
                message: 'No items found'
            })
        }
        return resp.status(200).json({
            success: true,
            listdata
        })
    }
    catch (error) {
        console.log(req.user.id);
        
        console.log("hi hi")
        return resp.status(500).json({
            sucess: false,
            message: 'Error occured'
        })
    }
}


export const updateItem = async (req, resp) => {
    try {
        // check if item exists or not
        let listdataExits = await Listing.findById(req.params.id)
        if (!listdataExits) {
            return resp.status(404).json({
                message: 'data not found',
                exists:false
            })
        }

        if (listdataExits.seller.toString() !== req.user.id) {
            return resp.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const { title,
            description,
            price,
            category } = req.body
        let listdata = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                price,
                category

            },
            {
                new: true
            }
        )
        return resp.status(200).json({
            exist:true,
            success: true,
            listdata

        })


    }
    catch (error) {
        return resp.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}




