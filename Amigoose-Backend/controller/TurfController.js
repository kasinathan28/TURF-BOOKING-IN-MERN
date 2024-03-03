const Turfs = require ("../models/Turf");

// Router for adding new turf.
exports.newTurf = async (req, res) => {
  console.log("API for adding new turf called");
  try {
    const { turfname, phone, location, openingTime, closingTime, sportsItems, rate } = req.body;
    console.log(req.body);
    // Validate the required fields
    if (!turfname || !phone || !location || !openingTime || !closingTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Check if an image is uploaded
    let image = null;
    if (req.file) {
      image = req.file.filename;
    } else {
      return res.status(400).json({error: "No image file provided"});
    }
    // Create a new turf instance
    const newTurf = new Turfs({
      turfname,
      phone,
      location,
      image,
      openingTime,
      closingTime,
      sportsItems,
      rate,
    });

    // Save the turf to the database
    const savedTurf = await newTurf.save();
    res.status(200).json(savedTurf);
  } catch (error) {
    console.error('Error adding new turf:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Fetching all the turfs from the database
  exports.getAllTurfs = async (req, res) => {
    console.log("Admin api for fetching all Turfs");
    try {
      const turfs = await Turfs.find();
      res.status(200).json({ turfs });
    } catch (error) {
      console.log("Error fetching the turfs", error);
      res.status(500).json({ error: "Internal server Error" });
    }
  };
  

  // Controller for updating the turf
  exports.updateTurf = async (req, res) => {
    console.log("updation in progress");
    const { id } = req.params;
    const { formData } = req.body; 
  
    console.log("Editing turf", id);
  
    try {
      const updatedTurf = await Turfs.findByIdAndUpdate(id, formData, { new: true });
      if (!updatedTurf) {
        return res.status(404).json({ message: "Turf not found" });
      }
      console.log("Turf updated successfully:", updatedTurf);
      res.status(200).json({ message: "Turf updated successfully", turf: updatedTurf });
    } catch (error) {
      console.error("Error updating turf:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  
// Controller for getting each turf Data
exports.getTurfData = async (req, res) =>{
  const demoId = req.params;
  const id = demoId.id;
  console.log("Turf id :", id);

try {
  const response = await Turfs.findById(id);
  console.log(response);
  res.status(200).json(response);
} catch (error) {
  console.log("Error fetching the details", error);
}
}


exports.getaturf = async (req, res) =>{
  const {id} = req.params;
  try{
    const response = await Turfs.findById(id);
    res.status(200).json(response);
    console.log(response);
  }
  catch(error){
    console.log("Error fetching the turf details", error);
    console.log("Error fetching the turf details", error);
  }
}

exports.deleteTURF = async (req, res) =>{
  const {id} = req.params;
  console.log("id:",id);
  try {
    const response = await Turfs.findByIdAndDelete(id);
    console.log("TURF deleted successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error while deleting the turf", error);
    res.status(500).json({message:Error});
  }
}