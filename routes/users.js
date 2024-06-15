import express from "express";

const router = express.Router();

import users from "../models/users.js";

router.get("/", async (req, res) => {
  try {
    const user = await users.find({});
    res.send({ user });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.send({ user });
  } catch (err) {
    res.status(404).send({ message: "user not found!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newuser = await users.create({
      name: req.body.name,
      email: req.body.email,
      enrollnumber: req.body.enrollnumber,
    });
    res.send({ newuser });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateduser = await users.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "The user was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removeuser = await users.findByIdAndDelete(req.params.id);
    res.send({ message: "The user was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

export default router;
