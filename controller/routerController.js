const userModel = require("../model/userModel");
const clientModel2 = require("../model/clientModel2");
const productModel = require("../model/productModel");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const clientModel = require("../model/clientModel");



// ContactPage Router Controller --
exports.contactPageRouterController = async (req, res) => {
    const { name, mobile, email, description } = req.body;
    try {
        const existingclient = await clientModel.findOne({
            clientEmail: email
        });

        if (existingclient) {
            existingclient.clientName = name;
            existingclient.clientMobileNo = mobile;
            existingclient.clientDescription = description;

            await existingclient.save();
            return res.status(200).json({
                success: true,
                message: "Existing Client Details Updated Successfully"
            });
        }
        const clientDetails = await clientModel.create({
            clientName: name,
            clientMobileNo: mobile,
            clientEmail: email,
            clientDescription: description
        });

        res.status(200).json({
            success: true,
            message: "Client Details Submitted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// AboutPage Router Controller --
exports.aboutPageRouterController = (req, res) => {
    res.json({
        success: true,
        message: "This Is An AboutPage API",
        user: req.user
    });
};

// ProfilePage Router Controller --
exports.profilePageRouterController = async (req, res) => {

    try {
        const presentUser = await userModel.findById(req.user.id).select("-userPassword");

        if (!presentUser) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User Found Successful",
            user: presentUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Edit Profile Router Controller 
exports.profileEditRouterController = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        // Find User From Backend 
        const presentUser = await userModel.findOne({
            _id: req.user.id
        }).select("+userPassword");

        // User Exist OR Not 
        if (!presentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Password Correct OR Not 
        const isMatchPassword = await bcrypt.compare(password, presentUser.userPassword);
        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: "Old Password Is Incorrect"
            });
        }

        // Update Value 
        presentUser.userName = name;
        presentUser.userEmail = email;
        presentUser.userMobileNo = mobile;

        if (req.file) {
            if (presentUser.userImage !== "default.jpg") {
                const oldImagePath = path.join(__dirname, "../uploads", presentUser.userImage);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.log("Old Image Deleted Faild: ", err);
                        else console.log("Old Image Deleted: ", oldImagePath);
                    })
                }
            }


            presentUser.userImage = req.file.filename;
        }
        await presentUser.save();

        res.json({
            success: true,
            message: "Profile Updated Successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Forgot Password Router Controller 
exports.forgotPasswordRouterController = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await userModel.findOne({
            userEmail: email
        });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }
        res.json({
            success: true,
            message: "User Found Successful",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Fetch User Router Controller --
exports.fetchUserRouterController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User Found Successful",
            user: {
                name: user.userName,
                email: user.userEmail,
                mobile: user.userMobileNo,
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Change For Forgot Password Router Controller --
exports.changeForForgotPasswordRouterController = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        const existingUser = await userModel.findOne({
            userEmail: email
        }).select("+userPassword");

        const isMatchPassword = await bcrypt.compare(oldPassword, existingUser.userPassword);
        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: "Old Password Is Incorrect"
            });
        }

        // Hash & Save New Password 
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        existingUser.userPassword = hashedNewPassword;
        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Change Password Router Controller --
exports.changePasswordRouterController = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;
        console.log(userId);

        const existingUser = await userModel.findById(
            userId
        ).select("+userPassword");

        const isMatchPassword = await bcrypt.compare(oldPassword, existingUser.userPassword);
        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: "Old Password Is Incorrect"
            });
        }

        // Hash & Save New Password 
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        existingUser.userPassword = hashedNewPassword;
        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Create Client Router Controller 
exports.createClientRouterController = async (req, res) => {
    try {
        const { userName, userEmail, userMobile, userPassword } = req.body;
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const createClient = await clientModel2.create({
            clientName: userName,
            clientEmail: userEmail,
            clientMobile: userMobile,
            clientPassword: hashedPassword
        });

        console.log("Client Created Successfully: ", createClient);
        res.json({
            message: "Client Created Successfully",
            created: true
        });
    } catch (err) {
        console.log("Client Creating Failed: ", err.message);
        res.status(400).json({
            created: false,
            message: err.message
        });
    }
};

// Read Client Router Controller 
exports.readClientRouterController = async (req, res) => {
    const client = await clientModel2.find();

    res.json({
        allUser: client,
        message: "Showing Data Successful",
        success: true
    })
}

// Create User Router Controller 
exports.signUpRouterController = async (req, res) => {
    try {
        const { userName, userEmail, userMobileNo, userPassword } = req.body;
        let role = "user";
        // Check if Email Already Exists 
        const existingUser = await userModel.findOne({
            userEmail: userEmail
        });

        // Check User Exist OR Not
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exists"
            });
        }

        // Check If Admin OR Not 
        if (userEmail === "jatinadmin@gmail.com") {
            role = "admin"
        }

        // Hash Password 
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const createUser = await userModel.create({
            userName: userName,
            userEmail: userEmail,
            userMobileNo: userMobileNo,
            userPassword: hashedPassword,
            role
        });

        console.log("User Created Successfully: ", createUser);
        res.status(200).json({
            success: true,
            message: "User Created Successfully"
        });
    } catch (err) {
        console.log("User Creation Failed: ", err.message);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Read User Router Controller 
exports.readUserRouterController = async (req, res) => {
    const users = await userModel.find();

    res.json({
        allUser: users,
        message: "Showing Data Successful",
        success: true
    });
}

// Login Router Controller 
exports.loginRouterController = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await userModel.findOne({
            userEmail: userEmail
        }).select("+userPassword");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        const isMatchPassword = await bcrypt.compare(userPassword, user.userPassword);

        if (!isMatchPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Passsword"
            });
        }

        console.log("User1", user);

        const token = jwt.sign({
            id: user._id,
            name: user.userName,
            email: user.userEmail,
            mobile: user.userMobileNo,
            role: user.role
        }, process.env.SECRET_KEY, { expiresIn: "1h" });

        console.log("User2", user);

        res.cookie("tokenName", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login Succesful",
            role: user.role
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
}

// Logout Router Controller 
exports.logoutRouterController = async (req, res) => {
    res.clearCookie("tokenName", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });
    res.json({
        success: true,
        message: "Logout Successful"
    });
}

// Auth Check Router Controller 
exports.authCheckRouterController = async (req, res) => {
    res.status(200).json({
        success: true,
        role: req.user.role
    });
}

