const userModel = require("../model/userModel");
const productModel = require("../model/productModel");

// Admin Dashboard Router Controller 
exports.adminDashboardRouterController = (req, res, next) => {

}

// All users Router Controller 
exports.allUsersRouterController = async (req, res, next) => {
  try {
    const allUser = await userModel.find({
      role: "user"
    });

    res.status(200).json({
      success: true,
      allUsers: allUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }

}

// Create Product Router Controller 
exports.createProductRouterController = async (req, res) => {
  try {
    const { miniDesc, description, price, discount, category, sellerType } = req.body;

    if (!miniDesc || !description || !price || !discount || !category || !sellerType) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required"
      });
    }

    const allowedCategories = ["Category1", "Category2", "Category3", "Category4"];
    const allowedSellerType = ["BestSeller", "Normal"];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product Category"
      });
    }

    if (!allowedSellerType.includes(sellerType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SellerType"
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At Least One Product Image Is Required"
      });
    }

    const imageName = req.files.map(file => file.filename);

    const product = await productModel.create({
      productMiniDesc: miniDesc,
      productDesc: description,
      productPrice: price,
      productDiscount: discount,
      productCategory: category,
      sellerType: sellerType,
      productImage: imageName
    });

    res.status(200).json({
      success: true,
      message: "Product Created Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// Update Product Router Controller 
exports.updateProductRouterController = async (req, res) => {
  try{
    const {id} = req.params;

    const {miniDesc, description, price, discount, category, sellerType} = req.body;

    const product = await productModel.findById(id);

    if(!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    // Update Fields
    product.productMiniDesc = miniDesc;
    product.productDesc = description;
    product.productPrice = price;
    product.productDiscount = discount;
    product.productCategory = category;
    product.sellerType = sellerType;

    // If New Images Uploaded
    if(req.files && req.files.length > 0){
      product.productImage = req.files.map(file => file.filename);
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully"
    });
  } catch(err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// Delete Product Router Controller 
exports.deleteProductRouterController = async (req, res) => {
  try{
    const {id} = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if(!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully"
    });
    
  } catch(err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}