const Razorpay = require("razorpay");
require("dotenv").config();

const instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

exports.createOrder = async (req, res) => {
  try {
    const amount = req.body.amount;

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });

    const orderId = order.id;
    res.status(200).json({ order, orderId });
    console.log("Order details", order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Could not create order" });
  }
};
