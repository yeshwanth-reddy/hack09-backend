var mongoose = require('mongoose');
var request = require('request');
var device = require('../device/device');
var constants = require('../config/index');


exports.listDevices = function(callback) {

    device.find( {}, {_id : false,__v : false }, function(err,devices){

        if(!err){

            callback(devices)

        }
    });
}