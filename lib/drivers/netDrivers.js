var _ = require('busyman'),
    helper = require('../helper.js');

// Each function will bind to shepherd in drivers.js when requiring

function start(callback) {              // callback(err)
    return this.start(callback);
}

function stop(callback) {               // callback(err)
    return this.stop(callback);
}

function reset(mode, callback) {        // callback(err)
    var shepherd = this;

    if (mode) { // hard, clear all records
        var allDevs = shepherd.listDevices();
        _.forEach(allDevs, function (dev) {
            if (dev)
                shepherd.remove(dev.clientId);
        });
    }

    // soft and hard
    shepherd.stop(function (err) {
        if (err)
            callback(err);
        else
            shepherd.start(callback);
    });
}

function permitJoin(duration, callback) {   // callback(err, result), result: timeLeft (Number, ex: 180)
    var duration = Math.floor(duration);

    try {
        this.permitJoin(duration);
        callback(null, duration);
    } catch (err) {
        callback(err);
    }
}

function remove(permAddr, callback) {       // callback(err, result), result: permAddr (String, ex: '0x12345678/xxxx')
    var realAddr = helper.parsePermAddr(permAddr);

    this.remove(realAddr.clientId, function (err, clientId) {
        if (!err)
            callback(null, permAddr);
        else
            callback(err, null);
    });
}

function ping(permAddr, callback) {
    var realAddr = helper.parsePermAddr(permAddr),
        qnode = this.find(realAddr.clientId);

    if (qnode) {
        qnode.pingReq(function (err, rsp) {
            if (err)
                callback(err);
            else if (rsp.status !== 200)
                callback(new Error('Bad response: ' + rsp.status));
            else
                callback(null, rsp.data);
        });
    } else {
        callback(new Error('Device not found.'));
    }
}

module.exports = {
    start: start,
    stop: stop,
    reset: reset,
    permitJoin: permitJoin,
    remove: remove,
    // ban: ban,       // no need to implement
    // unban: unban,   // no need to implement
    ping: ping
};
