import { getDB } from "../config/db.js";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";

const USERS_COLLECTION = "users";

export const getProfile = async (req, res, next) => {
  try {
    const db = getDB();
    const user = await db
      .collection(USERS_COLLECTION)
      .findOne(
        { _id: new ObjectId(req.user.userId) },
        { projection: { password: 0 } }
      );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const db = getDB();
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;

    await db
      .collection(USERS_COLLECTION)
      .updateOne({ _id: new ObjectId(req.user.userId) }, { $set: updates });
    const updated = await db
      .collection(USERS_COLLECTION)
      .findOne(
        { _id: new ObjectId(req.user.userId) },
        { projection: { password: 0 } }
      );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
