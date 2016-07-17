var express = require('express');
var router = express.Router();
var request = require('request');

var registerFunction = require('../lib/register');
var sendFunction = require('../lib/send-message');

var upcomingBookingStatusCodes = [1,2,3,4,5,6,7,8,9,10,11,12,13,21,23,32,35,24,26,27,33];

var get_data = function (url, callback) {
    var booking ={
        info: {},
        data:[]
    };
    request.get({
            url: url
        }, function (err, res, body) {
            if (err) {
                console.log(err);
                return;
            }
            body = JSON.parse(body);
            console.log(body);
            if (body.info.length !== 0) {
                booking.info.push(body.info)
                callback(booking);
            } else {
                for (i in body.data) {
                    if (upcomingBookingStatusCodes.indexOf(body.data[i].statusCode) > -1) {
                        booking.data.push(body.data[i])
                    }
                    // console.log(data);
                }
                callback(booking);
            }
        });
}

router.post('/', function(req, res) {
    var deviceID = req.body.deviceID;
    // console.log(req.body.lat,' ',req.body.lon);
    registerFunction.register( "test-hack09", "test-hack09", deviceID, function(result) {
        sendFunction.sendMessage("Welcome to Stayzilla Postbooking service!", "Hey there..", deviceID,function(result){
            console.log(result);
        });
        
    });
    var url = 'https://search.stayzilla.com/v1/json/bookinggetall/1467189693159hpAbSgsAxv61QfngAM8TmBYb6Sz';
    console.log(url);
    get_data(url, function (bookings) {
        res.json(bookings);
    });
});

module.exports = router;
