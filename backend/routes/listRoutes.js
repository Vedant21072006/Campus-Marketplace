import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import {  CreateListings, deleteItem,  myListings, ShowListings, ShowListingsById, updateItem } from '../controllers/listController.js';
import upload from '../middleware/uploadMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import { additemtowishlist, deleteWishList, getwishlist } from '../controllers/wishlistController.js';
const router = express.Router();

router.post('/create',authMiddleware,upload.array('image',5),CreateListings)

router.get('/',authMiddleware,ShowListings)
router.get('/my-listing',authMiddleware,myListings)
router.get('/listing/:id',ShowListingsById)

router.delete('/delete-item/:id',authMiddleware,deleteItem)
router.put('/update-listing/:id',upload.array('image', 5),authMiddleware,updateItem)



router.post('/wishlist/add-items/:id',authMiddleware,additemtowishlist)
router.get('/wishlist/items',authMiddleware,getwishlist)
router.delete('/wishlist/delete-wishlist/:id',deleteWishList)

export default router