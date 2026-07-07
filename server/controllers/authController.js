const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            message: "A user with the same email already exists",
        });
    }
    async function hashPassword(plainPassword) {
        const saltRounds = 10; // Standard security level
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    }
    const hashedPassword = await hashPassword(password);
    await User.create({
        name,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        message: "User registered successfully",
    });
};
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    
    if(!email||!password){
        return res.status(400).json({message:"all fields are required"})
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({message:"no such user exist"})
    }
    const isMatch= await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        return res.status(401).json({message:"wrong password"})
    }else{
        const token=jwt.sign({id:user._id,email},    process.env.JWT_SECRET,{ expiresIn: '10d' }     )
        res.status(200).json({
            message:"login successful",
            name:user.name,
            email:user.email,
            token
            })
    }
}
const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    return res.status(200).json({
        message: "Profile fetched successfully",
        user,
    });
};


module.exports = {
    registerUser,loginUser,getProfile
};