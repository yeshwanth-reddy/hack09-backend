var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/index.js');

var get_data = function (url, callback) {
    var data ={
        info: {},
        events:[]
    };
    request.get({
            url: url
        }, function (err, res, body) {
            if (err) {
                console.log(err)
                return;
            }
            body = JSON.parse(body);
            console.log(body);
            if (body.pagination.object_count === 0){
                data.info['total'] = 0;
                callback(data);
            } else {
                for (i in body.events) {
                    if (i == 5) {
                        data.info['total'] = 5;
                        break;
                    }
                    console.log('results', body.results);
                    data.events.push({
                        "name": body.events[i].name.text,
                        "desc": body.events[i].description.text,
                        "start": body.events[i].start.local,
                        "url": body.events[i].url
                    });
                    // console.log(data);
                }
                data.info['total'] = i;
                callback(data);
            }
        }
    );
}

router.post('/', function(req, res) {

    console.log(req.body.lat,' ',req.body.lon);

    var url = 'https://www.eventbriteapi.com/v3/events/search/?location.latitude='+req.body.lat+'&location.longitude='+req.body.lon+'&location.within=10km&token='+config.eventBrite_api_key;
    console.log(url);
    get_data(url, function (events) {
        res.json(events);
    });
});

module.exports = router;
