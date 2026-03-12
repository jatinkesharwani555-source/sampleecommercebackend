const productModel = require("../model/productModel");
const asyncHandler = require("../utils/asyncHandler.utils");
const ApiResponse = require("../utils/ApiResponse.utils");
const mongoose = require("mongoose");
const { allowedCategories } = require("../constants/allowedCategory");

/* ================= Home Router Controller ================= */
exports.getAllProductsRouterController = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await productModel
    .find()
    .skip(skip);
  // .limit(limit)

  res.status(200).json(new ApiResponse(true, "Products Fetched Successfully", products));
});

/* ================= Detailed Product Router Controller ================= */
exports.getDetailedProductController = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json(
      new ApiResponse(false, "Invalid Product Id")
    );
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json(
      new ApiResponse(false, "Product Not Found")
    );
  }
  res.status(200).json(
    new ApiResponse(true, "Products Fetched Successfully", product)
  );
});

/* ================= Product List Router Controller ================= */
exports.getProductListRouterController = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { category, id } = req.query;

  let filter = {};

  if (category) {
    if (!allowedCategories.includes(category)) {
      return res.status(400).json(
        new ApiResponse(false, "Invalid Category")
      );
    }
    filter.productCategory = category;
  }

  if (id && mongoose.Types.ObjectId.isValid(id)) {
    filter._id = { $ne: id };
  }

  const totalProducts = await productModel.countDocuments(filter);

  const products = await productModel
    .find(filter)
    .skip(skip)
    .limit(limit)

  res.status(200).json(
    new ApiResponse(true, "Products Fetched Successfully", products)
  );
});

/* ================= Get Product By Category Router Controller ================= */
exports.getProductsByCategoryRouterController = asyncHandler(async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json(
      new ApiResponse(false, "Category Is Require")
    );
  }

  if (!allowedCategories.includes(category)) {
    return res.status(400).json(
      new ApiResponse(false, "Invalid Category")
    );
  }

  const products = await productModel.find({
    productCategory: category
  });

  return res.status(200).json(
    new ApiResponse(true, "Products Fetched Successfully", {
      count: products.length,
      products
    })
  );
});

/* ================= Best Seller Products Router Controller ================= */
exports.getBestSellerProductRouterController = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  const products = await productModel.find({
    sellerType: "BestSeller"
  }).skip(skip)
    .limit(limit);

  res.status(200).json(
    new ApiResponse(true, "Best Seller Products Fetched Successfully", products)
  );
});

/* ================= Search Products Router Controller ================= */
exports.getSearchProductsRouterController = asyncHandler(async (req, res) => {
  const search = req.query.search?.trim() || "";

  // Agar empty search hai to empty array return karo
  if (!search) {
    return res.status(200).json(
      new ApiResponse(true, "No search query provided", [])
    );
  }
  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const products = await productModel.find({
    $or: [
      { productMiniDesc: { $regex: escapedSearch, $options: "i" } },
      { productDesc: { $regex: escapedSearch, $options: "i" } },
      { productCategory: { $regex: escapedSearch, $options: "i" } }
    ]
  })

  res.status(200).json(
    new ApiResponse(true, "Products Fetched Successfully", products)
  );
});