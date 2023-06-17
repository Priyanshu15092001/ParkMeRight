const express = require("express");
const router = express.Router();
const ParkingBooking = require("../models/parkingBooking");
const fetchcustomer = require("../middleware/fetchCustomer");
const fetchuser = require("../middleware/fetchUser");
const Location = require("../models/Location");     
const Rate = require("../models/Rate");
const Vehicle = require("../models/vehicle");
const fetchCustomer = require("../middleware/fetchCustomer");
let saveVehicle = null;

//new booking
router.post("/booking/:id", fetchcustomer, async (req, res) => {
  const { vehicleType, registrationNo, startTime, duration, payment,transactionId } =
    req.body;
  const rate = await Rate.findOne({
    location: req.params.id,
    vehicleType: vehicleType,
  });
  if (!rate) {
    return res.send("Not available");
  }

  const newVehicle = new Vehicle({
    registrationNo: registrationNo,
    vehicleType: vehicleType,
    admin: rate.admin,
    customer: req.customer,
  });

  try {
    saveVehicle = await newVehicle.save();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  const newBooking = new ParkingBooking({
    customer: req.customer,
    vehicle: saveVehicle._id,
    location: req.params.id,
    admin: newVehicle.admin,
    startTime: startTime,
    duration: duration,
    totalRate: rate.rate * duration,
    payment: payment,
    transactionId:transactionId
  });

  try {
    const savedBooking = await newBooking.save();
    const booked = {
      registrationNo: registrationNo,
      vehicleType: vehicleType,
      location: Location.findById(req.params.id).name,
      address: Location.findById(req.params.id).address,
      startTime: startTime,
      duration: duration,
      totalRate: savedBooking.totalRate,
      payment: payment,
      transactionId:transactionId,  
      bookingId:savedBooking._id
    };
    res.send(booked);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//cancel booking
router.put("/cancelbooking/:id", fetchcustomer, async (req, res) => {
  const book = await ParkingBooking.findById(req.params.id);
  if (!book) {
    return res.status(404).send("Not found");
  }
  let newBook = {};
  newBook.payment = false;
  newBook = await ParkingBooking.findByIdAndUpdate(
    req.params.id,
    { $set: newBook },
    { new: true }
  );
  if (newBook.payment === false) {
    return res.send({success:"Booking Cancelled"});
  } else {
    return res.send("Failed to cancel booking");
  }
});

//delete vehicle
router.delete("/deletevehicle/:id",fetchcustomer,async(req,res)=>{
  const book=await ParkingBooking.findById(req.params.id);
  if(!book){return res.status(404).send("Not found")}
  await Vehicle.findByIdAndDelete(book.vehicle);
  res.send("Vehicle deleted")
})


  
//fetch all parking bookings
router.get("/fetchbooking",fetchuser,async(req,res)=>{
  try {
    const bookings = await ParkingBooking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


//fetch booking by customer
router.get("/customer/fetchbooking",fetchCustomer,async(req,res)=>{
  try {
    console.log(req.customer)
    const bookings = await ParkingBooking.find({customer:req.customer});
    if(bookings.length===0)
    res.status(404).json({success:false})
    else
    res.status(200).json(bookings);
   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


//fetch all vehicle details   
router.get("/fetchvehicle",fetchuser,async(req,res)=>{
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


//fetch vehicle by id
router.get("/getvehicle/:id",fetchuser,async(req,res)=>{
  try {
    const vehicles = await Vehicle.findOne({_id:req.params.id});
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})




module.exports = router;
