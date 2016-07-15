var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var key = require('../config/index.js');

var get_data = function (url, callback) {
    var data ={
        events: []
    };

    request.get({
            url: url
        }, function (err, res, body) {
            if (err) {
                console.log(err)
                return;
            }
        body = JSON.parse(body);
        // console.log(body.results.geometry);
            for(value in body.results) {
                // console.log(body.results[value]);
                data.events.push({"name":body.results[value].name,"lat":body.results[value].geometry.location.lat,"lon":body.results[value].geometry.location.lng});
                // console.log(data);
            }
            callback(data);
        }
    );
}
router.get('/:lat/:lon', function(req, res, next) {

    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+req.params.lat+','+req.params.lon+'&radius=10000&types=hindu_temple&key='+key.google_key;
    console.log(url);

    get_data(url, function (data) {
      res.json(data);
  });

});

module.exports = router;
