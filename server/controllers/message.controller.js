import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import createError from "../utils/createError.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      {
        id: req.body.conversationId,
      },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const message = await Message.find({ conversationId: req.params.id });
    if (!message) return next(createError(404, "Not Found!!"));
    res.status(200).send(message);
  } catch (err) {
    next(err);
  }
};
