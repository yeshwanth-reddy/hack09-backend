var config = {
    google_key : "AIzaSyDqwhVOtkJlUszHKErUhblyefx_kXiBEQo",
    gcm_api_key : "AIzaSyBjO-NyT7GfOZtOCQ6YyYaSbHIU5n5csRM",
    eventBrite_api_key : "3LGGIPJC7M5YZZ27FWCS",

    error : {

        "msg_invalid_param" 	: {

            "result" 	: "error",
            "message"	: "Invalid request parameters."

        },

        "msg_empty_param" 	: {

            "result"	:"error",
            "message"	:"Parameters should not be empty."

        },

        "msg_reg_failure" 	: {

            "result"	:"error",
            "message"	:"Registration failure."

        },

        "msg_reg_exists" 	: {

            "result"	:"error",
            "message"	:"Device already registered."

        },

        "msg_del_failure" : {

            "result" : "error",
            "message" : "Unable to remove device"

        },

        "msg_send_failure" : {

            "result" : "error",
            "message" : "Unable to send message"

        }

    },

    "success" : {

        "msg_reg_success"	: {

            "result"	: "success",
            "message"   : "Device successfully registered."

        },

        "msg_del_success"  : {

            "result" :  "success",
            "message" : "Device successfully removed"

        },

        "msg_send_success"  : {

            "result" :  "success",
            "message" : "Message successfully sent !"

        }
    }
};

module.exports = config