import mongoose from "mongoose";
import bcrypt from "bcrypt";
import ApiError from "../utils/apiError";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        default:"USD"
    },
    avatar:{
        type:String,

    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true
});

const User = moongoose.model("User",userSchema);

User.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        throw new ApiError(500,"Error hashing password",error);
    }
})

User.methods.isPasswordCorrect = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
User.methods.generateAccessToken = function(){
    return jwt.sign(
        {_id:this._id,username:this.username,email:this.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRATION}
    );
}

User.methods.generateRefreshToken = function(){
    return jwt.sign(
        {_id:this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRATION}
    );
}

export default User;