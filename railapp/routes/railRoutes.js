const express = require('express');
const router = express.Router();
const railController = require('../controllers/railController');

router.get('/trains', railController.getAllTrainInfo);
router.get('/trains/search', railController.getTrainByRoute);
router.post('/trains', railController.createTrainInfo);
router.put('/trains/:train_no', railController.updateTrainInfo);
router.delete('/trains/:id', railController.deleteTrainInfo);

module.exports = router;
