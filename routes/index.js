var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var _ = require('lodash');
var config = require('../config/index.js');
var data ={
    events:[]
};

var get_data = function (url,type, callback) {
    // var events = [];
    request.get({
            url: url
        }, function (err, res, body) {
            if (err) {
                console.log(err)
                return;
            }
        body = JSON.parse(body);
        // console.log(body.results.geometry);
        if (body.status === "ZERO_RESULTS"){
            callback();
        } else {
            for (i in body.results) {
                if (i === 5) {
                    break;
                }
                console.log('results', body.results);
                data.events.push({
                    "name": body.results[i].name,
                    "lat": body.results[i].geometry.location.lat,
                    "lon": body.results[i].geometry.location.lng,
                    "type": type
                });
                // console.log(data);
            }
            callback();
        }
        }
    );
}
router.post('/', function(req, res) {

    console.log(req.body.lat,' ',req.body.lon,' ',req.body.types);
    async.forEachOf(req.body.types, function (value, key, cb) {
        var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+req.body.lat+','+req.body.lon+'&radius=10000&types='+value+'&key='+config.google_key;
        console.log(url);
        get_data(url, value, function () {
            cb();
        });
    }, function (err) {
        if (err) console.error(err.message);
        var result = _.cloneDeep(data);
        data.events = [];
        res.json(result);

    });

});

module.exports = router;
