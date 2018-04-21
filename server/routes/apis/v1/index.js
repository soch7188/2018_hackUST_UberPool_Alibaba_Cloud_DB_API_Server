'use strict';

const
    express = require('express'),
    ridesController = require('../../../controllers/apis/rides')

let router = express.Router();

router.use('/*', (req, res, next) => {
    console.log('v1 router called: ' + req.url);
    next();
});

router.use('/rides', ridesController);


module.exports = router;
