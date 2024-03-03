const Bookings = require("../models/Bookings");

exports.newBookings = async (req, res) => {
    const { userId, paymentId } = req.params;
    console.log("userId:", userId);
    console.log("Payment id :", paymentId);
    const { turfId } = req.body; 
    console.log("Turf Id:", turfId);
    try {
        
        const newBooking = new Bookings({
            userId: userId,
            paymentId: paymentId,
            turfId: turfId,
        });

        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
        console.log(savedBooking);
    } catch (error) {
        console.log("Error adding new bookings", error);
        res.status(500).json({ message: "Error adding new booking" });
    }
}

exports.Bookings = async(req, res) =>{
    try {
        const bookings = await Bookings.find();
        console.log(bookings);
        res.status(200).json(bookings);
        
    } catch (error) {
        console.log("Error fetching the bookings");
        res.status(500).json({message:"Error fetching the Bookings"})
        
    }
}


exports.UserBookings = async (req, res) =>{
    const {userId} = req.params;
    console.log(userId);
    try {
        const response = await Bookings.find({ userId: userId }); 
        console.log(response);
        res.status(200).json(response);
        
    } catch (error) {
        console.log("Error fetching the booking details", error);
        res.status(500).json({message:"Error fetching the Bookings details", error})
    }
}