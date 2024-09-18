const RailInfo = require('../models/railInfo');

// Fetch All Train Info
exports.getAllTrainInfo = async (req, res) => {
    const trains = await RailInfo.find();
    if(trains.length === 0 ){
        res.status(200).json({'msg': 'No data found.', data: trains, count: trains.length });
    }
    res.json({data: trains, count: trains.length });
};

// Find Specific Train Info based on src_station and dest_station
exports.getTrainByRoute = async (req, res) => {
    const { src_station, dest_station } = req.query;
    const trains = await RailInfo.find({ src_station, dest_station });
    if(trains.length === 0 ){
        res.status(200).json({'msg': 'No data found.', data: trains, count: trains.length });
    }
    res.json(trains);
};

// Insert Train Info
exports.createTrainInfo = async (req, res) => {
    try{
        const newTrain = new RailInfo(req.body);
        await newTrain.save();
        res.json({data:newTrain, 'msg': 'Train data stored.'});
    }catch(error){
        console.error(error);
    }
};

// Update Train Info based on train_no
exports.updateTrainInfo = async (req, res) => {
    const { train_no } = req.params;
    const updatedTrain = await RailInfo.findOneAndUpdate({ train_no }, req.body, { new: true });
    if(updatedTrain){
        res.json({updatedTrain: updatedTrain, 'msg': 'Record updated successfully.' });
    }else{
        res.json({'msg': 'Record not found. Please Try Again.'});
    }
};

// Delete Train Info based on train_id
exports.deleteTrainInfo = async (req, res) => {
    const { id } = req.params;
     
    const data = await RailInfo.findByIdAndDelete(id);
    
    if(data ){
        res.json({ message: 'Train info deleted' }); 
    }else{
        res.json({ 'msg': 'Train not  found. Please Try Again.'});  
    }
    
};