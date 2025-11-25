import { getDB } from "../config/db.js";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";

const TASKS_COLLECTION = "tasks";

export const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    const db = getDB();
    const newTask = {
      title: req.body.title,
      description: req.body.description || "",
      status: req.body.status || "todo",
      createdAt: new Date(),
      userId: new ObjectId(req.user.userId),
    };
    const result = await db.collection(TASKS_COLLECTION).insertOne(newTask);
    res.status(201).json({ ...newTask, _id: result.insertedId });
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const db = getDB();

    const { q, status } = req.query;
    const filter = { userId: new ObjectId(req.user.userId) };
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: "i" };
    const tasks = await db
      .collection(TASKS_COLLECTION)
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const db = getDB();
    const task = await db.collection(TASKS_COLLECTION).findOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.userId),
    });
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const db = getDB();
    const update = {};
    if (req.body.title) update.title = req.body.title;
    if (req.body.description) update.description = req.body.description;
    if (req.body.status) update.status = req.body.status;
    await db.collection(TASKS_COLLECTION).updateOne(
      {
        _id: new ObjectId(req.params.id),
        userId: new ObjectId(req.user.userId),
      },
      { $set: update }
    );
    const updated = await db
      .collection(TASKS_COLLECTION)
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const db = getDB();
    await db.collection(TASKS_COLLECTION).deleteOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.userId),
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
