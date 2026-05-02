const express = require('express');
const { authMiddleware } = require('../MiddleWare/auth');

const userRoutes = express.Router();

userRoutes.get("/user/requests/received", authMiddleware, async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      toUserId: req.user._id,
      status: "interested"
    }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "photoUrl"]);

    res.send(requests);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRoutes.get("/user/connections", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Find accepted connections
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: userId, status: "accepted" },
        { toUserId: userId, status: "accepted" }
      ]
    })
    .populate("fromUserId", ["firstName", "lastName", "photoUrl"])
    .populate("toUserId", ["firstName", "lastName", "photoUrl"]);

    // 2. Extract actual connection users
    const data = connections.map(row => {
      if (row.fromUserId._id.toString() === userId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = userRoutes;