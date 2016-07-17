var express = require('express');
var router = express.Router();

var constants = require('../config/index');
var registerFunction = require('../lib/register');
var devicesFunction = require('../lib/devices');
var sendFunction = require('../lib/send-message');

router.post('/devices',function(req,res) {
    var deviceName = req.body.deviceName;
    var deviceId   = req.body.deviceId;
    var registrationId = req.body.registrationId;

    if ( typeof deviceName  == 'undefined' || typeof deviceId == 'undefined' || typeof registrationId  == 'undefined' ) {
        console.log(constants.error.msg_invalid_param.message);

        res.json(constants.error.msg_invalid_param);

    } else if ( !deviceName.trim() || !deviceId.trim() || !registrationId.trim() ) {
        console.log(constants.error.msg_empty_param.message);

        res.json(constants.error.msg_empty_param);

    } else {
        registerFunction.register( deviceName, deviceId, registrationId, function(result) {
            res.json(result);

        });
    }
});

router.get('/devices',function(req,res) {
    devicesFunction.listDevices(function(result) {
        res.json(result);

    });
});

router.post('/send',function(req,res){
    var title = req.body.title;
    var message = req.body.message;
    var registrationId = req.body.registrationId;

    sendFunction.sendMessage(message, title, registrationId,function(result){
        res.json(result);

    });
});

module.exports = router;
