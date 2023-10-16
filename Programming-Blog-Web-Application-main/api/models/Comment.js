const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        postId : String,
        // commentId : String,
        content : String,
        parentId : String,
        username : String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Commant", CommentSchema);