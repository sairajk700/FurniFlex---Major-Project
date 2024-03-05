const express=require ('express');

const router=express.Router();

router.route('./wishlist').post(isAuthenticatedUser, addToWishlist).get(isAuthenticatedUser,getWishlist);

module.exports = router;