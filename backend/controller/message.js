const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require("../model/message");
const User = require("../model/user");
const Chat = require("../model/chat");

// Send a Message
const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return next(new ErrorHandler("Invalid data passed into request", 400));
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name avatar");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name avatar email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Fetch all Messages
const allMessages = catchAsyncErrors(async (req, res, next) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name avatar email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

module.exports = {
    allMessages,
    sendMessage,
};
