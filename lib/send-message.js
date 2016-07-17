var gcm = require('node-gcm');
var constants = require('../config/index');

exports.sendMessage = function(message, title, registrationId, callback){

    var message = new gcm.Message({data: {title: title, message: message}});
    var regTokens = [registrationId];
    var sender = new gcm.Sender(constants.gcm_api_key);
    sender.send(message, { registrationTokens: regTokens }, function (err, response) {

        if (err){
            console.error(err);
            callback(constants.error.msg_send_failure);

        } else 	{
            console.log(response);

            if (response.failure > 0) {
                callback(response.results[0]);
            } else {
                callback(constants.success.msg_send_success);
            }
        }

    });

}
