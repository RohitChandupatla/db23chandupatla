const mongoose = require("mongoose")
const houseSchema = mongoose.Schema({
type_of_house: String,
location: String,
pincode: Number
})
module.exports = mongoose.model("houses", houseSchema)