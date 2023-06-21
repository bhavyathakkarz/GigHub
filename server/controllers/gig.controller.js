import Gig from "../models/gig.model.js";
// import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const addGig = async (req, res, next) => {
  const newGig = new Gig({
    ...req.body,
    userId: req.userId,
  });
  try {
    const gig = await newGig.save();
    res.status(201).send(gig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!!"));
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!!"));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: { $regex: q.cat, $options: "i" } }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    // if (!gigs) return next(createError(404, "Gig not found!!"));
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
