const express = require('express');
const router = new express.Router();

const userController = require("../controller/UserController")
const adminController = require("../controller/AdminController")
const turfContoller = require("../controller/TurfController")
const BookingController = require("../controller/BookingController");
const razorpayController = require("../controller/razorpayController");
const upload = require('../multerConfig/storageConfig');

// User API URL's
// Router for the User to signup
router.post('/signup', upload.single('avatar'), userController.signup);
// Router for the User to login
router.post("/login", userController.login);
// Router for the user to get the profile
router.get('/user/:userId', userController.getUserDetailsByUserId);
// Router for the User to update the profile
router.put('/user/:id', userController.updateUserProfile);
// Router for getting the details of a single turf
router.get("/getTurfData/:id", turfContoller.getTurfData);
// Router for adding new bookings in the datasbase 
router.post("/newBooking/:userId/:paymentId", BookingController.newBookings);
//Router for getting the user bookigns
router.get("/userBookings/:userId", BookingController.UserBookings);
// Router for getting the details of the single turf.
router.get('/getaturf/:id', turfContoller.getaturf);

// Admin API URL's
// Router for admin Login
router.post('/adminLogin', adminController.login);
// Router for fetching all the users from the table
router.get('/getallUsers', adminController.getallUsers);
// Router for aadin new turf
router.post('/newTurf', upload.single('image'), turfContoller.newTurf);
// Router for fetching all the turfs
router.get('/turfs', turfContoller.getAllTurfs);
// Router for updating the turfs
router.put('/updateTurf/:id', turfContoller.updateTurf);
// Router for getting all the bookings
router.get('/bookings', BookingController.Bookings);
// Router for deleting the turf
router.delete('/deleteturf/:id', turfContoller.deleteTURF);

// Rozor pay api 
router.post('/makePayment',razorpayController.createOrder);
module.exports = router;

