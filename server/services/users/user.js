/**
 * Doctor API authentication part
 *
 * @date 2018-01-04
 * @author 김지원
 * @updated N/A
 *
 * Refer to https://www.npmjs.com/package/jsonwebtoken for jwt.
 */

'use strict';

const qs = require('qs');
const models = require('../../models');
const config = require('../../../configs')

function getUserProfile (req, res) {
    models.User.findOne({
        where: {
            user_code: req.decoded.user_code
        }
    }).then(user => {
        res.json({success: true, user: user});
    }).catch(function (err){
        res.status(500).json({
            success: false,
            message: 'Server Error getuserInfo(), err: ' + err.message
        });
    })
}

function isAdmin(req, res){
    models.User.findOne({
        where: {
            user_code: req.decoded.user_code
        }
    }).then(user => {
       console.log('user retrieved with user_code: ' + user.user_code + ', is_admin: ' + user.is_admin)
        return res.status(200).json({success:true, isAdmin: user.is_admin})
    }).catch(function (err){
        return res.status(500).json({
            success: false,
            message: 'Server error isAdmin(), err: ' + err.message
        })
    })
}

function checkUserIsAdmin (req, res, next){

    models.User.findOne({
        where: {
            user_code: req.decoded.user_code
        }
    }).then(user => {
        if (user.is_admin){
            next();
        } else {
            console.log('User is not admin')
            return res.status(403).json({success: false, message: 'User is not admin.'})
        }
    }).catch(err => {
        return res.status(403).json({success: false, message: err.message})
    })
}


module.exports = {
    getUserProfile,
    isAdmin,
    checkUserIsAdmin,
};
