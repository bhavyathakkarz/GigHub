import Gig from "../models/gig.model.js";
import Review from "../models/review.model.js";
import createError from "../utils/createError.js";

export const addReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Seller can't add a review!!"));
  const newReview = new Review({
    ...req.body,
    userId: req.userId,
  });
  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      return next(
        createError(403, "You have already created a review for this gig!!")
      );
    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const review = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(review);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return next(createError(404, "Review not found!!"));
    if (review.userId != req.userId)
      return next(createError(403, "You can delete only your review!!"));
    await review.deleteOne();
    res.status(200).send("Review has been deleted");
  } catch (err) {
    next(err);
  }
};
