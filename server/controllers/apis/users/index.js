'use strict';

const
    express = require('express'),
	authService = require('../../../services/users/user.js');

let router = express.Router();


// router.use('/*', models.verifyAPIKEY);
// ^Middleware. Make sure to put all the routes which needs authentication below this middleware.

// Authentication related User APIs.
router.post('/register', authService.registerUser)
router.post('/login', authService.userLogin);
router.get('/verify_token', authService.verifyToken)
router.get('/logout', authService.userLogout);

// AUTHENTICATE HERE: APIs below this line needs to verify token. "req.decoded" variable is updated.
// router.use(authService.verifyToken);
router.use(authService.checkTokenVerified);
router.get('/get_user_profile', authService.getUserProfile);
router.get('/is_admin', authService.isAdmin);

router.use(authService.checkUserIsAdmin);
router.get('/get_all_users', authService.getAllUsers);

module.exports = router;
