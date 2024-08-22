const mongoose = require("mongoose");
const Schema = mongoose.Schema
const {User}=require("./user")
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Todo");
}
const todoschema = Schema({
    todo: {
        type: String,
        required: true,
        trim:true,
    },
    isdone: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
})
const Todo=mongoose.model("todo",todoschema)
module.exports={Todo}