import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    const unseen = {};
    await Promise.all(
      users.map(async (u) => {
        const m = await Message.find({
          senderId: u._id,
          receiverId: userId,
          seen: false,
        });
        if (m.length > 0) unseen[u._id] = m.length;
      })
    );

    res.json({ success: true, users, unseenMessages: unseen });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const selectedUserId = req.params.id;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { seen: true });
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const AI_BOT_ID = "692a80b434724e66141e70c7";

    const senderId =
      req.query.senderOverrideId === AI_BOT_ID
        ? AI_BOT_ID
        : req.user._id;

    const receiverId = req.params.id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const up = await cloudinary.uploader.upload(image);
      imageUrl = up.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const socket = userSocketMap[receiverId];
    if (socket) io.to(socket).emit("newMessage", newMessage);

    res.json({ success: true, newMessage });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};
