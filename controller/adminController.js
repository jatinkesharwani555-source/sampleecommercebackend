const userModel = require("../model/userModel");
const productModel = require("../model/productModel");
const { allowedCategories } = require("../constants/allowedCategory");

// Admin Dashboard Router Controller 
exports.adminDashboardRouterController = (req, res, next) => {

}

// All users Router Controller 
exports.allUsersRouterController = asyncHandler(async (req, res) => {
  const allUser = await userModel.find({ role: "user" });
  res.status(200).json(new ApiResponse(true, "All Users Fetched Successfully", allUser));
});

// Create Product Router Controller 
exports.createProductRouterController = asyncHandler(async (req, res) => {
  const { miniDesc, description, price, discount, category, sellerType } = req.body;

  if (!miniDesc || !description || !price || !discount || !category || !sellerType) {
    return res.status(400).json(new ApiResponse(false, "All Fields Are Required"));
  }

  const productPrice = Number(price);
  const productDiscount = Number(discount);

  if (productPrice <= 0) {
    return res.status(400).json(new ApiResponse(false, "Price must be greater than 0"));
  }

  if (productDiscount < 0 || productDiscount > 99) {
    return res.status(400).json(new ApiResponse(false, "Discount must be between 0 and 99"));
  }

  if (!allowedCategories.includes(category)) {
    return res.status(400).json(new ApiResponse(false, "Invalid Product Category"));
  }

  const allowedSellerType = ["BestSeller", "Normal"];
  if (!allowedSellerType.includes(sellerType)) {
    return res.status(400).json(new ApiResponse(false, "Invalid SellerType"));
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json(new ApiResponse(false, "At Least One Product Image Is Required"));
  }

  const productPriceAfterDiscount = Math.round(productPrice - (productPrice * productDiscount) / 100);
  const imageName = req.files.map(file => file.path);

  const product = await productModel.create({
    productMiniDesc: miniDesc,
    productDesc: description,
    productPrice,
    productDiscount,
    productCategory: category,
    productPriceAfterDiscount,
    sellerType,
    productImage: imageName
  });

  res.status(201).json(new ApiResponse(true, "Product Created Successfully", product));
});

// Update Product Router Controller 
exports.updateProductRouterController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { miniDesc, description, price, discount, category, sellerType } = req.body;

  const product = await productModel.findById(id);
  if (!product) return res.status(404).json(new ApiResponse(false, "Product Not Found"));

  const productPrice = Number(price);
  const productDiscount = Number(discount);

  if (productPrice <= 0) return res.status(400).json(new ApiResponse(false, "Price must be greater than 0"));
  if (productDiscount < 0 || productDiscount > 99) return res.status(400).json(new ApiResponse(false, "Discount must be between 0 and 99"));
  if (!allowedCategories.includes(category)) return res.status(400).json(new ApiResponse(false, "Invalid Product Category"));

  const allowedSellerType = ["BestSeller", "Normal"];
  if (!allowedSellerType.includes(sellerType)) return res.status(400).json(new ApiResponse(false, "Invalid SellerType"));

  product.productMiniDesc = miniDesc;
  product.productDesc = description;
  product.productPrice = productPrice;
  product.productDiscount = productDiscount;
  product.productPriceAfterDiscount = Math.round(productPrice - (productPrice * productDiscount) / 100);
  product.productCategory = category;
  product.sellerType = sellerType;

  if (req.files && req.files.length > 0) {
    product.productImage = req.files.map(file => file.path || file.secure_url);
  }

  await product.save();

  res.status(200).json(new ApiResponse(true, "Product Updated Successfully", product));
});

// Delete Product Router Controller 
exports.deleteProductRouterController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findByIdAndDelete(id);
  if (!product) return res.status(404).json(new ApiResponse(false, "Product Not Found"));

  res.status(200).json(new ApiResponse(true, "Product Deleted Successfully"));
});