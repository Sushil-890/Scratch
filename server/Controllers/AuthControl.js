
const { UserModel } = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

       
        const existuser = await UserModel.findOne({ email });
        if (existuser) {
            console.log("User already exists", existuser);
            return res.send("User already exists, you can login");
        }
        const mymodel = await UserModel.create({ username, email, password });
        // const mymodel = new UserModel({ email, password});
        // mymodel.password = await bcrypt.hash(password, 12);
        res.send("User created successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existuser = await UserModel.findOne({ email });
        if (!existuser) {
            return res.status(400).json({message: "user not exist pleas sign up"})
        }
        
        const isPass = password === existuser.password;
        //const isPass =await bcrypt.compare(password,existuser.password);
        if(!isPass){
            return res.status(403).json({message: "incorrect password"})
        }
        const jwtToken = jwt.sign({
            email: existuser.email, _id:existuser._id, username: existuser.username},
            process.env.JWT_SECRET_KEY || "default_secret",
            {expiresIn:"24h"}
    );
    return res.status(200).json({
        message:"login sucess",
        success: true,
        jwtToken,
        email: existuser.email,
        username: existuser.username
        //name: existuser.username
    });
    } catch (err) {
        console.error("Login error",err);
        return res.status(500).json({ message:"internal server errror" });
    }
};




module.exports = { signup, login };
