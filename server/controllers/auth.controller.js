import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("User has been registered.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const users = await User.findOne({ username: req.body.username });
    if (!users) return next(createError(404, "User not found!"));
    const comparedPassword = await bcrypt.compare(
      req.body.password,
      users.password
    );
    if (!comparedPassword)
      return next(createError(400, "Invalid Credentials!"));
    const token = jwt.sign(
      {
        id: users._id,
        isSeller: users.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...result } = users._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(result);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been loggedout.");
  } catch (err) {
    next(err);
  }
};
