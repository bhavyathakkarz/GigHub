import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const createConversation = async (req, res, next) => {
  try {
    const currentSellerId = req.isSeller ? req.userId : req.body.to;
    const currentBuyerId = req.isSeller ? req.body.to : req.userId;
    const seller = await User.findById(currentSellerId);
    const buyer = await User.findById(currentBuyerId);
    const newConversation = new Conversation({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
      sellerName: seller.username,
      buyerName: buyer.username,
      lastMessage: req.body.lastMessage,
    });
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          //   readBySeller: true,
          //   readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};