const mongoose = require('mongoose');

const railInfoSchema = new mongoose.Schema({
    train_no: { type: String, required: true },
    train_name: { type: String, required: true },
    src_station: { type: String, required: true },
    dest_station: { type: String, required: true },
    platform_no: { type: String, required: true },
    dep_time: { type: String, required: true },
    arr_time: { type: String, required: true }
});

const RailInfo = mongoose.model('RailInfo', railInfoSchema);
module.exports = RailInfo;