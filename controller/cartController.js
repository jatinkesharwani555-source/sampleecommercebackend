const userModel = require("../model/userModel");
const asyncHandler = require("../utils/asyncHandler.utils");
const ApiResponse = require("../utils/ApiResponse.utils");

/* ================= SHOW ITEM ================= */
exports.getCartItemsRouterController = asyncHandler(async (req, res) => {

  const user = await userModel
    .findById(req.user.id)
    .populate("cart.productId");

    if(!user){
      return res.status(404).json(
        new ApiResponse(false, "User Not Found")
      );
    }

    const validCartItems = user.cart.filter(item => item.productId !== null);

    res.status(200).json(
      new ApiResponse(true, "Cart Fetching Successfully", validCartItems)
    );
});

/* ================= ADD ITEM ================= */
exports.addItemRouterController = asyncHandler(async (req, res) => {

  const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json(
        new ApiResponse(false, "Product Id Required")
      );
    }

    if (quantity < 1) {
      return res.status(400).json(
        new ApiResponse(false, "Invalid Quantity")
      );
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json(
        new ApiResponse(false, "User Not Found")
      );
    }

    const item = user.cart.find(i => i.productId.toString() === productId);

    if (item) {
      item.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json(
      new ApiResponse(true, "Successfully Added In Cart")
    );
});

/* ================= UPDATE QUANTITY ================= */
exports.updateQuantityRouterController = asyncHandler(async (req, res) => {
  const { productId, type } = req.body;

    if (!productId || !type) {
      return res.status(400).json(
        new ApiResponse(false, "Product Id OR Type Required")
      );
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json(
        new ApiResponse(false, "User Not Found")
      );
    }

    const item = user.cart.find(i => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json(
        new ApiResponse(false, "Item Not Found In Cart")
      );
    }

    if (type === "increment") {
      item.quantity += 1;
    }

    if (type === "decrement" && item.quantity > 1) {
      item.quantity -= 1;
    }

    await user.save();

    res.status(200).json(
      new ApiResponse(true, "Update Quantity Successfully")
    );
});

/* ================= REMOVE ITEM ================= */
exports.removeItemRouterController = asyncHandler(async (req, res) => {
  const { productId } = req.params;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json(
        new ApiResponse(false, "User Not Found")
      );
    }

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.json(
      new ApiResponse(true, "Item Successfully Removed From Cart")
    );
});