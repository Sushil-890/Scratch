// AuthMiddleware.js
const jwt = require('jsonwebtoken');
const joi = require('joi');

// Input validation for signup
const signupvad = (req, res, next) => {
  const signupschema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required(),
  });

  const { error } = signupschema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation Error', error });
  }
  next();
};

// Input validation for login
const loginvad = (req, res, next) => {
  const loginschema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required(),
  });

  const { error } = loginschema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation Error', error: error.details });
  }
  next();
};

// ✅ NEW: Auth middleware to verify JWT and attach user to req
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // expects "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "default_secret");
    req.user = decoded; // { _id, email }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  signupvad,
  loginvad,
  authenticate // 👈 important for protected routes like ratings
};

// const joi = require('joi');

// const signupvad = (req, res, next) => {
//     const signupschema = joi.object({
//         email: joi.string().email().required(),
//         password: joi.string().min(8).max(15).required(),
//     });

//     const { error } = signupschema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ message: "Validation Error", error: error.details });
//     }
//     next();
// };

// const loginvad = (req, res, next) => {
//     const loginschema = joi.object({
//         email: joi.string().email().required(),
//         password: joi.string().min(8).max(15).required(),
//     });

//     const { error } = loginschema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ message: "Validation Error", error: error.details });
//     }
//     next();
// };

// module.exports = { signupvad, loginvad };
