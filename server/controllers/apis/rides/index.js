'use strict';

const
    express = require('express'),
    rideService = require('../../../services/rides');

let router = express.Router();

router.post('/create_ride', rideService.createRide());
// router.get('/get_order_items', rideService.getOrderItems);

module.exports = router;
