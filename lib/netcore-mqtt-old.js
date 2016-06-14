var lwm2mId = require('lwm2m-id'),
    FreebirdBase = require('freebird-base'),
    Netcore = FreebirdBase.Netcore,
    shepherd = require('./mqtt-shepherd.js');

var EventEmitter = require('events');
var validGads = [ 'dIn', 'dOut', 'aIn', 'aOut', 'generic', 'illuminance', 'presence',
                  'temperature', 'humidity', 'pwrMea', 'actuation', 'setPoint', 'loadCtrl',
                  'lightCtrl', 'pwrCtrl', 'accelerometer', 'magnetometer', 'barometer' ];

/***********************************************************************/
/*** mqtt-shepherd events                                            ***/
/***********************************************************************/
// 'permitJoining', time
// 'ready', undefined
// 'registered', node
// 'deregistered', clientId
// 'error', error
// 'ind'; { type, qnode, data }
//      - { type: 'devIncoming', qnode: qnode, data: undefind }
//      - { type: 'devLeaving', qnode: clientId, data: undefind }
//      - { type: 'devUpdate', qnode: qnode, data: diffObj }
//      - { type: 'devNotify', qnode: qnode, data: notifyObj }, where notifyObj = { oid, iid, rid, data }
//      - { type: 'devChange', qnode: qnode, data: notifyObj }, where notifyObj = { oid, iid, rid, data }
//      - { type: 'devStatus', qnode: qnode, data: status }

/***********************************************************************/
/*** Drivers                                                         ***/
/***********************************************************************/
var netDrivers = {
    start: shepherd.start,            // function(callback) {}, callback(err)
    stop: shepherd.stop,              // function(callback) {}, callback(err)
//    reset: shepherd.reset,            // function(mode, callback) {}, callback(err)
    permitJoin: shepherd.permitJoin,  // function(duration, callback) {}, callback(err, result), result: timeLeft (Number, ex: 180)
    // shepherd.remove(clientId, cb)
    remove: shepherd.remove,          // function(permAddr, callback) {}, callback(err, result), result: permAddr (String, ex: '0x12345678')
//    ban: shepherd.ban,                // function(permAddr, callback) {}, callback(err, result), result: permAddr (String, ex: '0x12345678')
//    unban: shepherd.unban,            // function(permAddr, callback) {}, callback(err, result), result: permAddr (String, ex: '0x12345678')
//    ping: shepherd.ping               // function(permAddr, callback) {}, callback(err, result), result: timeInMs (Number, ex: 16)
};

var devDrivers = {
//    read: shepherd.devRead,           // function(permAddr, attr, callback) {},       callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
//    write: shepherd.devWrite,         // function(permAddr, attr, val, callback) {},  callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
//    identify: shepherd.devIdentify,   // function(permAddr, callback) {},             callback(err)
};

var gadDrivers = {
    read: shepherd.gadRead,               // function(permAddr, auxId, attr, callback) {},          callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
    write: shepherd.gadWrite,             // function(permAddr, auxId, attr, val, callback) {},     callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
    exec: shepherd.gadExec,               // function(permAddr, auxId, attr, args, callback) {},    callback(err, result), result: can be anything, depends on firmware implementation
//    setReportCfg: shepherd.setReportCfg,  // function(permAddr, auxId, attrName, cfg, callback) {}, callback(err, result), result: set succeeds? (Boolean, true or false)
//    getReportCfg: shepherd.getReportCfg,  // function(permAddr, auxId, attrName, callback) {},      callback(err, result), result: config object (Object, ex: { pmin: 10, pmax: 60, gt: 200 })
};

/***********************************************************************/
/*** Start Building Netcore                                          ***/
/***********************************************************************/



module.exports = nc;
