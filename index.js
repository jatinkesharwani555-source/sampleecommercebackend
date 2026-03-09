// Third Party Modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");

// Local Modules 
const homeRouter = require("./routes/pages/home");
const aboutRouter = require("./routes/pages/about");
const signUpRouter = require("./routes/pages/signUp");
const readUserRouter = require("./routes/readUser");
const createClientRouter = require("./routes/createClient");
const readClientUser = require("./routes/readClient");
const loginRouter = require("./routes/pages/login");
const authCheckRouter = require("./routes/authCheck");
const logoutRouter = require("./routes/pages/logout");
const contactPageRouter = require("./routes/pages/contact");
const profilePageRouter = require("./routes/pages/profile");
const profileEditRouter = require("./routes/pages/profileEdit");
const forgotPasswordRouter = require("./routes/pages/forgotPassword");
const changePasswordRouter = require("./routes/pages/changePassword");
const fetchUserRouter = require("./routes/fetchUser");
const adminDashboardRouter = require("./routes/admin/adminDashboard");
const allUsersRouter = require("./routes/admin/allUsers");
const createProductRouter = require("./routes/admin/createProduct");
const changeForForgotPasswordRouter = require("./routes/pages/changeForForgotPassword");
const detailedProduct = require("./routes/pages/detailedProduct");
const addItemRouter = require("./routes/Cart/addItem");
const removeItemRouter = require("./routes/Cart/removeItems");
const updateQuantityRouter = require("./routes/Cart/updateQuantity");
const getCartItemsRouter = require("./routes/Cart/GetCartItems");
const productListRouter = require("./routes/pages/productList");
const getProductsByCategoryRouter = require("./routes/pages/getProductsByCategory");
const bestSellerProductRouter = require("./routes/pages/bestSellerProducts");
const searchProducts = require("./routes/searchProducts");
const updateProductRouter = require("./routes/admin/updateProduct");
const deleteProductRouter = require("./routes/admin/deleteProduct");

// Middlewares 
app.use(cors({
  origin: "https://kesharwanimartfrontend.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes 
app.use(homeRouter);
app.use(aboutRouter);
app.use(signUpRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(readUserRouter);
app.use(createClientRouter);
app.use(readClientUser);
app.use(authCheckRouter);
app.use(contactPageRouter);
app.use(profilePageRouter);
app.use(profileEditRouter);
app.use(forgotPasswordRouter);
app.use(changeForForgotPasswordRouter);
app.use(changePasswordRouter);
app.use(fetchUserRouter);
app.use(adminDashboardRouter);
app.use(allUsersRouter);
app.use(createProductRouter);
app.use(detailedProduct);
app.use(productListRouter);
app.use(getProductsByCategoryRouter);
app.use(bestSellerProductRouter);
app.use(searchProducts);
app.use(updateProductRouter);
app.use(deleteProductRouter);

/* ===== CART ===== */
app.use(getCartItemsRouter);
app.use(addItemRouter);
app.use(removeItemRouter);
app.use(updateQuantityRouter)

app.listen(process.env.PORT || 3000);