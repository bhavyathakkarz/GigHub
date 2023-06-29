import Order from "../models/order.model.js";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const gig = await Gig.findById(req.params.gigId);
  const seller = await User.findById(gig.userId);
  const buyer = await User.findById(req.userId);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(gig.price * 100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    price: gig.price,
    sellerId: gig.userId,
    buyerId: req.userId,
    sellerName: seller.username,
    buyerName: buyer.username,
    payment_intent: paymentIntent?.id,
  });

  await newOrder.save();
  res.status(201).send({ clientSecret: paymentIntent.client_secret });
};

export const confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      { $set: { isCompleted: true } }
    );
    if (!order) return next(createError(404, "Not Found!!"));
    res.status(200).send("Order has been confirmed");
  } catch (err) {
    next(err);
  }
};

// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);
//     const seller = await User.findById(gig.userId);
//     const buyer = await User.findById(req.userId);
//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       price: gig.price,
//       sellerId: gig.userId,
//       buyerId: req.userId,
//       sellerName: seller.username,
//       buyerName: buyer.username,
//       payment_intent: "temporary",
//     });
//     const savedOrder = await newOrder.save();
//     res.status(201).send(savedOrder);
//   } catch (err) {
//     next(err);
//   }
// };

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    if (!orders) return next(createError(404, "No orders yet!!"));
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
