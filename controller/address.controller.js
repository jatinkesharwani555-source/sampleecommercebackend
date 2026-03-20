const addressModel = require("../model/addressModel");
const asyncHandler = require("../utils/asyncHandler.utils");
const ApiResponse = require("../utils/ApiResponse.utils");

exports.getUserAddressController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const addresses = await addressModel
  .find({ user: userId })
  .sort({createdAt: -1,})
  .limit(3);
  res.status(200).json(new ApiResponse(true, "Address Fetched Successfully", addresses));
});

exports.addUserAddressController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  let { name, phone, pincode, state, city, address } = req.body;

  // Trim
  name = name?.trim();
  address = address?.trim();

  // Basic Validation
  if (!name || !phone || !pincode || !state || !city || !address) {
    return res.status(400).json(
      new ApiResponse(false, "All fields are required")
    );
  }

  // Phone validation (10 digit)
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json(
      new ApiResponse(false, "Invalid phone number")
    );
  }

  // Pincode validation (6 digit)
  if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json(
      new ApiResponse(false, "Invalid pincode")
    );
  }

  // ✅ Create Address
  const newAddress = await addressModel.create({
    user: userId,
    name,
    phone,
    pincode,
    state,
    city,
    address,
  });

  res.status(201).json(new ApiResponse(true, "Address Added Successfully", newAddress));
});