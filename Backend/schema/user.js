const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const {Todo}=require("./todo")
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Todo");
}
const userschema = Schema({
    name: {
        type: String,
        required: [true,"The name should not be empty"],
        minLength:[2,"The name is too short"]
    },
    email:{
        type: String,
        required: [true,"The email should not be empty"],
        unique:[true,"The email you entered is already exist"],
        minLength: [2, "The email is too short"],
        trim:true
    },
    
    
})
userschema.plugin(passportLocalMongoose, { usernameField: "email" });
const User = mongoose.model("user", userschema)
module.exports = { User }