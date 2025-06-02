const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 100 * 100, // ₹100 in paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    console.error("💥 Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create Razorpay order" });
  }
};

module.exports = { createOrder };
