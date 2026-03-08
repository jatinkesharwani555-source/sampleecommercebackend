const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Failed:", err.message));

module.exports = mongoose;