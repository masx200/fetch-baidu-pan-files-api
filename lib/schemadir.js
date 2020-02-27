import mongoose from "mongoose";
const panfileschema = new mongoose.Schema({
    dir: {
        type: String,
        index: true
    },
    dir_empty: Number,
    empty: Number,
    fs_id: Number,
    isdir: Number,
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
