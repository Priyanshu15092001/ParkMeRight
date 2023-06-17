const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Location = require('../models/location');
// const location=require('../routes/location');
const Rate = require('../models/rate');

// Add rate to a location
router.post('/:id/addrate', fetchuser, async (req, res) => {
    // console.log(req.admin)
      
    // Find the location in the database by ID
    const location = await Location.findById(req.params.id);
    // console.log(location);
    try {
    if (location) {
        
    
    // Create a new rate object with the requested rate value and the location ID
    const addrate = new Rate({
      rate: req.body.rate,
      vehicleType:req.body.vehicleType,        
      admin:req.admin,
      location: location._id
    });

   const newRate= await addrate.save(); 

    // Send a success message as a response
    res.send(newRate);}
    else{
        return res.status(404).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});


//Fetch all rate of a particular location
router.get("/:id/fetchrate", fetchuser, async (req, res) => {
    try {
      const location = await Location.findById(req.params.id);
      if(location){
              const rates=await Rate.find({location:location._id});
              res.send(rates);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



//updating rate by admin
router.put("/:idloc/updaterate/:idrate",fetchuser, async (req, res) => {
    const {rate,vehicleType}=req.body;
    const newRate = {};
    try {
      let loc = await Location.findById(req.params.idloc);
      // console.log(loc);
    
      if (!loc) {
        return res.status(404).send("Not found");
      }

      let ratefind=await Rate.findById(req.params.idrate)
      if(!ratefind) return res.status(404).send("Not found");
      if(rate)newRate.rate=rate;
      if(vehicleType)newRate.vehicleType=vehicleType;
  
        const updateRate = await Rate.findByIdAndUpdate(
          req.params.idrate,
          { $set: newRate },
          { new: true }
        );
        res.send(updateRate);
      
    } catch (error) {
      res.status(500).send(error);
    }
  });




  //delete rate by admin
router.delete("/:idloc/deleterate/:idrate",fetchuser, async (req, res) => {
    try {
      let loc = await Location.findById(req.params.idloc);
      // console.log(loc);
    
      if (!loc) {
        return res.status(404).send("Not found");
      }

      let ratefind=await Rate.findById(req.params.idrate)
      if(!ratefind) return res.status(404).send("Not found");
        await Rate.findByIdAndDelete(req.params.idrate);
        res.send({"Success":"Delete successful"});
      
    } catch (error) {
      res.status(500).send(error);
    }
  });




//Fetch all rate by admin
router.get("/fetchallrate", async (req, res) => {
    try {

              const rates=await Rate.find();
              res.send(rates);
      
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




module.exports = router;
