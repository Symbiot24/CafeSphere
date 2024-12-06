const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const cafeowerSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    entity: {
        type: String,
        default: "cafeowner",
    }
});

cafeowerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Cafeowner", cafeowerSchema);