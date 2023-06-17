const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET="parkmeright";
const {body,validationResult}=require("express-validator")
const fetchuser = require("../middleware/fetchUser");
const fetchCustomer = require("../middleware/fetchCustomer");

// signup of customer
router.post('/signup', [
  body("name","Enter a valid name").isLength({min:3}),
  body("email","Enter a valid email").isEmail(),
  body("password","Password must be min 5 length").isLength({min:5}),
  body("phone","Must be of 10 length").isLength(10)
],async (req, res) => {

  try{
  const { name, email, password, phone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if user already exists
  const existingUser = await Customer.findOne({ email: email });
  if (existingUser) {
    return res.status(400).send({success:false,message:"Already a existing user"});     
  }
  
  // Hash password
 const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create new user
  const newUser = new Customer({
    name: name,
    email: email,
    password: hashedPassword,
    phone: phone
  });
  
  
  await newUser.save();

  // Generate a JWT and send it in the response
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
  res.send({success:true, token });
} catch (err) {
  res.status(500).send({success:false,err});
}
});


//customer login
router.post('/login', [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
try{
  const customer = await Customer.findOne({ email: email });

  if (!customer) {
    return res.status(401).json({success:false, message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, customer.password);

  if (!passwordMatch) {
    return res.status(401).json({ success:false,message: 'Invalid credentials' });
  }

  const token = jwt.sign({ customerId: customer._id }, JWT_SECRET);

  res.status(200).json({ success:true,token: token });
}catch{
  // console.error(errors.message);
  res.status(500).send({success:false,message:"Internal Server Error"});
}
});

//getting all customer details
router.get("/getallcust", fetchuser, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//get customer details by id
router.get("/getcust/:id", fetchuser, async (req, res) => {
  try {
    const customers = await Customer.findOne({_id:req.params.id});
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//delete a customer
router.delete("/deletecust/:id", fetchuser, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id); 
    console.log(customer)
    if(!customer)res.status(404).send("Not found")
    cust=await Customer.findByIdAndDelete(req.params.id)
    res.json({success:"Delete successfull"})
  } catch (err) { 
    res.status(500).json({ message: err.message });
  }
});

//get customer by token
router.get("/getcust", fetchCustomer, async (req, res) => {
  console.log(req.customer)
  const cust=await Customer.findById(req.customer);
  if(!cust)res.status(404).send("Not found")
res.json(cust)
});

//update a customer
router.put(
  "/updatecust/:id",
  fetchCustomer, 
  async (req, res) => {
const {name,phone}=req.body;
//Create a new note object
const newCust={};
if(name){newCust.name=name};
if(phone){newCust.phone=phone};

  

//Find the customer to be updated and update it
let cust= await Customer.findById(req.params.id);
if(!cust){return res.status(404).send("Not found")}
console.log(cust._id.toString());
if(cust._id.toString()!==req.customer)
{return res.status(401).send("Not allowed");}
cust=await Customer.findByIdAndUpdate(req.params.id,{$set:newCust},{new:true})
res.json({cust});
  });
module.exports = router;
