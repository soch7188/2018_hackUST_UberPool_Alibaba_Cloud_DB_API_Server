const models = require('../../models');

function createRide (req, res){

    const time= req.body.time;
    const user_id = req.body.user_id;
    const est_fare = req.body.est_fare;
    const est_time = req.body.est_time;
    const from = req.body.from;
    const to = req.body.to;

    models.Ride.create({

        ride_time: time,
        ride_passenger_number: 1,
        ride_passenger_1: user_id,
        est_fare: est_fare,
        est_time: est_time,
        from: from,
        to: to,

    }).then(ride => {
        res.status(201).json({success: true, message: 'Ok', ride_id: ride.ride_id});
    }).catch(function (err) {
        if (err) res.status(500).json({
            success: false,
            message: err.message,
            log: 'Error while creating ride in db.'
        });
    });

}

function getOrderItems (req, res){
	const user_code = req.decoded.user_code;

	models.Order.findAll({
		where: {
			user_code: user_code
		}
	}).then(result => {
		return res.status(200).json(result);
	}).catch(function (err){
		console.log((err.toString()))
		return res.status(403).json({success: false, message: err.toString()})
	})
}

module.exports = {
    createRide,
	getOrderItems,
};
