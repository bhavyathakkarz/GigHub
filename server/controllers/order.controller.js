import Order from "../models/order.model.js";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";
export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    const seller = await User.findById(gig.userId);
    const buyer = await User.findById(req.userId);
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.userId,
      sellerName: seller.username,
      buyerName: buyer.username,
      payment_intent: "temporary",
    });
    const savedOrder = await newOrder.save();
    res.status(201).send(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    if (!orders) return res.status(404).send("No orders yet!!");
    // const getOrder = [];
    // req.isSeller
    //   ? orders.map((order) =>
    //       User.findById(order.buyerId)
    //         .then((response) => {
    //           const { username } = response;
    //           orders.push({ ...order, buyerName: username });
    //           console.log(orders);
    //         })
    //         .catch((err) => console.log(err))
    //     )
    //   : orders.map((order) =>
    //       User.findById(order.sellerId)
    //         .then((response) => {
    //           const { username } = response;
    //           orders.push({ ...order, sellerName: username });
    //           console.log(orders);
    //         })
    //         .catch((err) => console.log(err))
    //     );
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
