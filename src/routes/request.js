const express = require('express');
const { authMiddleware } = require('../MiddleWare/auth');
const ConnectionRequest = require('../models/connectionRequest');
const {validateEditProfileData} = require('../utils/validation');

const requestRoutes = express.Router();

requestRoutes.post("/request/send/:status/:toUserId", authMiddleware, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // 1. Self check
    if (fromUserId.toString() === toUserId) {
      return res.status(400).send("Cannot send request to yourself");
    }

    // 2. Status validation
    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    // 3. Duplicate check
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingRequest) {
      return res.status(400).send("Connection already exists");
    }

    // 4. Save request
    const request = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    await request.save();

    res.send("Request sent successfully");

  } catch (err) {
    res.status(500).send(err.message);
  }
});

requestRoutes.post("/request/review/:status/:requestId", authMiddleware, async (req, res) => {
  try {
    const status = req.params.status;
    const requestId = req.params.requestId;
    const loggedInUserId = req.user._id;

    // 1. Validate status
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    // 2. Find request
    const request = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUserId,
      status: "interested"
    });

    // 3. Check if request exists
    if (!request) {
      return res.status(404).send("Request not found");
    }

    // 4. Update status
    request.status = status;
    await request.save();

    res.send("Request " + status);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = requestRoutes;