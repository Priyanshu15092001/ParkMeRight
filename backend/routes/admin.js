const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET="parkmeright";
const {body,validationResult}=require("express-validator");

//admin signup
router.post('/signup', [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be of 5 length").isLength({min:5})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
  const {  email, password  } = req.body;
const existingUser = await Admin.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Hash password
 const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create new user
  const newUser = new Admin({
    email: email,
    password: hashedPassword,
  });
  
  
  await newUser.save();

  // Generate a JWT and send it in the response
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
  res.send({ token });
} catch (err) {
  res.status(500).send(err);
}
});



//admin login
router.post('/login', [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  
  // Check if user exists
  const existingAdmin = await Admin.findOne({ email: email });
  if (!existingAdmin) {
    return res.status(401).json({ success:false,message: 'Invalid email or password' });
  }
  
  // Check password
  const validPassword = await bcrypt.compare(password, existingAdmin.password);
  if (!validPassword) {
    return res.status(401).json({success:false, message: 'Invalid email or password' });
  }
  
  // Create and sign JWT token
  const token = jwt.sign({ adminId: existingAdmin._id }, JWT_SECRET);
  
  res.status(200).json({ success:true,token: token });
});
module.exports=router;    