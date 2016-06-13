var netDrivers = {
    controller: null,
    start: function (callback) {
        // function(callback) {}
        // callback(err)
    },
    stop: function (callback) {
        // function(callback) {}
        // callback(err)
    },
    reset: function (mode, callback) {
        // function(mode, callback) {}
        // callback(err)
    },
    permitJoin: function (duration, callback) {
        // function(duration, callback) {}
        // callback(err, result), result: timeLeft (Number, ex: 180)
    },
    remove: function (permAddr, callback) {
        // function(permAddr, callback) {}
        // callback(err, result), result: permAddr (String, ex: '0x12345678')
    },
    ban: function (permAddr, callback) {      // [TODO] no need to implement
        // function(permAddr, callback) {}
        // callback(err, result), result: permAddr (String, ex: '0x12345678')
    },
    unban: function (permAddr, callback) {    // [TODO] no need to implement
        // function(permAddr, callback) {}
        // callback(err, result), result: permAddr (String, ex: '0x12345678')
    },
    ping: function (permAddr, callback) {
        // function(permAddr, callback) {}
        // callback(err, result), result: timeInMs (Number, ex: 16)
    }
};

module.exports = function (controller) {
    netDrivers.controller = controller;
    netDrivers.start = start.bind(controller);
    netDrivers.stop = stop.bind(controller);
    netDrivers.reset = reset.bind(controller);
    netDrivers.permitJoin = permitJoin.bind(controller);
    netDrivers.remove = remove.bind(controller);
    netDrivers.ban = ban.bind(controller);
    netDrivers.unban = unban.bind(controller);
    netDrivers.ping = ping.bind(controller);

    return netDrivers;
};
