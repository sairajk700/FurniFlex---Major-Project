const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

exports.getSearchPaginatedFilteredProducts = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = Number(req.query.limit) || 3;

    const productsCount = await Product.countDocuments();

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
                                     .populate('reviews.user', 'name');

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500));
    }
};

exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (isReviewed) {

        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating, rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
    const imagePaths = req.files.map(file => file.path);
    
    const productData = {
        ...req.body,
        user: req.user.id,
        images: imagePaths 
    };

    const product = await Product.create(productData);

    res.status(201).json({
        success: true,
        product
    });
});

exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});


exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    req.body.user = req.user.id;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product
    });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(`Product doesn't exist with id: ${req.params.id}`, 404));
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    });
});

exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
    const { productId, reviewId } = req.params;

    if (!productId || !reviewId) {
        return next(new ErrorHandler("Product ID and Review ID are required in the request body", 400));
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        { $pull: { reviews: { _id: reviewId } } },
        { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (product.reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / product.reviews.length;
    }

    const numOfReviews = product.reviews.length;

    await Product.findByIdAndUpdate(productId, {
        ratings: Number(ratings),
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});
