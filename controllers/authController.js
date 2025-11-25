import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";

const USERS_COLLECTION = "users";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const db = getDB();
    const { name, email, password } = req.body;

    const existing = await db.collection(USERS_COLLECTION).findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.collection(USERS_COLLECTION).insertOne({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
    });

    const user = result.ops
      ? result.ops[0]
      : { _id: result.insertedId, name, email };

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    res
      .status(201)
      .json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const db = getDB();
    const { email, password } = req.body;

    const user = await db.collection(USERS_COLLECTION).findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
