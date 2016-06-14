// Each function will bind to shepherd in drivers.js when requiring

function start(callback) {
    // callback(err)
    var shepherd = this;
    return shepherd.start(callback);
}

function stop(callback) {
    // callback(err)
    var shepherd = this;
    return shepherd.stop(callback);
}

// [TODO]
function reset(mode, callback) {
    // callback(err)
    var shepherd = this;

    if (mode) {

    } else {

    }
}

function permitJoin(duration, callback) {
    // callback(err, result), result: timeLeft (Number, ex: 180)
    var shepherd = this;

    duration = Math.floor(duration);

    try {
        shepherd.permitJoin(duration);
        callback(null, duration);
    } catch (err) {
        callback(err);
    }
}

function remove(permAddr, callback) {
    // callback(err, result), result: permAddr (String, ex: '0x12345678')
    var shepherd = this;

}

function ban(permAddr, callback) {      // [TODO] no need to implement
    var shepherd = this;
    // callback(err, result), result: permAddr (String, ex: '0x12345678')
}

function unban(permAddr, callback) {    // [TODO] no need to implement
    var shepherd = this;
    // callback(err, result), result: permAddr (String, ex: '0x12345678')
}

function ping(permAddr, callback) {
    var shepherd = this;
    // callback(err, result), result: timeInMs (Number, ex: 16)
}

module.exports = {
    start: start,
    stop: stop,
    reset: reset,
    permitJoin: permitJoin,
    remove: remove,
    ban: ban,
    unban: unban,
    ping: ping
};
