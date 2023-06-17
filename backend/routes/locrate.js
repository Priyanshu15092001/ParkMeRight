const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const fetchuser = require("../middleware/fetchUser");
const Rate = require("../models/Rate");
// const admin = require("../models/admin");

//add location rate
router.post("/addlocrate", fetchuser, async (req, res) => {

const findLocation=await Location.find({name:req.body.name})
let savedLocation=null;
if(!findLocation[0]){
    
    const newlocation = new Location({
        name: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        slots2W: req.body.slots2W,
        slots4W:req.body.slots4W,
        admin: req.admin,
    });
    
    savedLocation = await newlocation.save();
}
else{
    
  savedLocation=findLocation[0];

}

const findRate=await Rate.find({location:savedLocation._id,vehicleType:req.body.vehicleType});
let savedRate=null;

if(findRate[0]){return res.send("Already present in database")}
  const newRate = new Rate({
    rate: req.body.rate,
    vehicleType: req.body.vehicleType,
    location: savedLocation._id,
    admin: req.admin,
  });
   savedRate = await newRate.save();
  try {
    const locrate1 = {
      name: savedLocation.name,
      address: savedLocation.address,
      latitude: savedLocation.latitude,
      longitude: savedLocation.longitude,
      slots2W: savedLocation.slots2W,
      slots4W:savedLocation.slots4W,
      rate: savedRate.rate,
      vehicleType: savedRate.vehicleType,
      admin: savedLocation.admin,
      location: savedRate.location,
      rateid: savedRate._id,
    };
    res.send(locrate1);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete location and rate
router.delete("/deletelocrate/:id",fetchuser, async (req, res) => {
 
  try {
    let loc = await Location.findById(req.params.id);
    // console.log(loc);

    if (!loc) {
      return res.status(404).send("Not found");
    }
    
     const findRate=await Rate.find({location:loc._id});
     for (let index = 0; index < findRate.length; index++) {
      const element = findRate[index];
      await Rate.findByIdAndDelete(element._id);
     }
      loc = await Location.findByIdAndDelete(
        req.params.id
      );

      return res.send({"Success":"Location has been deleted"});
    
  } catch (error) {
    res.status(500).send(error);
  }
});              



// //get loc rate
// router.get("/getalllocrate",  async (req, res) => {
//   try {
//     const locations = await Location.find();
//     res.status(200).json(locations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });





module.exports=router;