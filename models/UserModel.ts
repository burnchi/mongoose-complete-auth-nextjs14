import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },

},{
    timestamps:true
})


export const userModel = mongoose.models.user || mongoose.model("user",Schema)