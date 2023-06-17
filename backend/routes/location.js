const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const fetchuser = require("../middleware/fetchUser");
// const locations={}
//Add location
router.post("/addlocation", fetchuser, async (req, res) => {
  const newlocation = new Location({
    name: req.body.name,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    slots2W: req.body.slots2W,
    slots4W:req.body.slots4W,
    admin: req.admin,
  }); 
  // console.log(newlocation);
  try {
    const savedLocation = await newlocation.save();
    res.send(savedLocation);
  } catch (err) {
    res.status(400).send(err);
  }
});

//getting all parking location
router.get("/getallloc",  async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//checking for available slots
router.patch("/:id", fetchuser, async (req, res) => {
  const { availableSlots } = req.body;

  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { availableSlots: availableSlots },
      { new: true }
    );
    res.status(200).json(location);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get location details by name
router.get("/getlocation/:name", async (req, res) => {
  try {
    // Find the location in the database by name
    const location = await Location.find({ name: req.params.name }).select(
      " -__v -admin"
    );

    // Send the location object as a response
    res.send(location);
  } catch (err) {
    res.status(500).send(err);
  }
});



//get location by id
router.get("/getlocationid/:id", async (req, res) => {
  try {
    // Find the location in the database by name
    const location = await Location.findOne({_id:req.params.id}).select(
      " -__v -admin"
    );
    // console.log(location);
if(location)
    // Send the location object as a response
    res.send(location);
    else
    res.status(404).send("Not found")
  } catch (err) {
    res.status(500).send(err);
  }
});

//updating no. of slots after booking
router.put("/updateslots/book/:id/:W", async (req, res) => {
  const newLoc = {};
  try {
    let loc = await Location.findById(req.params.id);
    // console.log(loc);

    if (!loc) {
      return res.status(404).send("Not found");
    }
    if(req.params.W==="2W")
    {    if (loc.slots2W == 0||loc.slots2W==null) {
      return res.status(404).send("No slots available");
    } else {
      newLoc.slots2W = loc.slots2W - 1;
      loc = await Location.findByIdAndUpdate(
        req.params.id,
        { $set: newLoc },
        { new: true }
      );
      res.send(loc);
    }}
    else{
      if (loc.slots4W == 0||loc.slots4W==null) {
        return res.status(404).send("No slots available");
      } else {
        newLoc.slots4W = loc.slots4W - 1;
        loc = await Location.findByIdAndUpdate(
          req.params.id,
          { $set: newLoc },
          { new: true }
        );
        res.send(loc);
      }
    }
    

  } catch (error) {
    res.status(500).send(error);
  }
});


//updating no. of slots after cancel booking
router.put("/updateslots/cancelbooking/:id/:W", async (req, res) => {
  const newLoc = {};
  try {
    let loc = await Location.findById(req.params.id);
    // console.log(loc);

    if (!loc) {
      return res.status(404).send("Not found");
    }
   
    if(req.params.W==="2W")
    {    
      newLoc.slots2W = loc.slots2W + 1;
      loc = await Location.findByIdAndUpdate(
        req.params.id,
        { $set: newLoc },
        { new: true }
      );
      res.send(loc);
    }
    else{
        newLoc.slots4W = loc.slots4W + 1;
        loc = await Location.findByIdAndUpdate(
          req.params.id,
          { $set: newLoc },
          { new: true }
        );
        res.send(loc);
      
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
});


//updating location by admin
router.put("/admin/updateloc/:id",fetchuser, async (req, res) => {
  const {name,address,latitude,longitude,slots2W,slots4W}=req.body;
  const newLoc = {};
  try {
    let loc = await Location.findById(req.params.id);
    // console.log(loc);

    if (!loc) {
      return res.status(404).send("Not found");
    }
    if(name)newLoc.name=name;
    if(address)newLoc.address=address;
    if(latitude)newLoc.latitude=latitude;
    if(longitude)newLoc.longitude=longitude;
    if(slots2W)newLoc.slots2W=slots2W;
    if(slots4W)newLoc.slots4W=slots4W;
     
      loc = await Location.findByIdAndUpdate(     
        req.params.id,
        { $set: newLoc },
        { new: true }
      );
      res.send(loc);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete location by admin
router.delete("/admin/deleteloc/:id",fetchuser, async (req, res) => {
 
  try {
    let loc = await Location.findById(req.params.id);
    // console.log(loc);

    if (!loc) {
      return res.status(404).send("Not found");
    }
    
     
      loc = await Location.findByIdAndDelete(
        req.params.id
      );
      res.send({"Success":"Location has been deleted"});
    
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
