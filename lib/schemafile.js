import mongoose from "mongoose";
const panfileschema = new mongoose.Schema({
    dir: {
        type: String,
        index: true
    },
    fs_id: Number,
    isdir: Number,
    md5: {
        type: String,
        index: true
    },
    path: {
        type: String,
        unique: true,
        index: true
    },
    server_filename: {
        type: String,
        index: true
    },
    size: Number
}, { autoIndex: true });
export default panfileschema;
