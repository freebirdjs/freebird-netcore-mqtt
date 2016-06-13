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
var nc = new Netcore('mqtt-shepherd', shepherd, {
    phy: 'ieee802',
    tl: 'tcp',
    nwk: 'ip',
    apl: 'mqtt'
});

nc.registerNetDrivers(netDrivers);
nc.registerDevDrivers(devDrivers);
nc.registerGadDrivers(gadDrivers);

shepherd.on('DEV_REPORTING', function (devChanges) {
    var dev = devChanges.dev,
        attrs = {};
    // devChanges: { dev, data }
    if (devChanges.data.hasOwnProperty('ip')) {
        nc.commitDevNetChanging(dev.mac, { address: { dynamic: devChanges.data.ip } });
    }

    if (Object.keys(attrs).length) 
        nc.commitDevReporting(dev.mac, attrs);
});

shepherd.on('GAD_REPORTING', function (gadChanges) {
    // gadChanges = { dev, oid, iid, rid, data }
    var dev = gadChanges.dev,
        attrData = gadChanges.data;
    var oidStr = lwm2mId.getOid(gadChanges.oid).key,
        ridStr = lwm2mId.getRid(gadChanges.oid, gadChanges.rid).key,
        auxId = oidStr + '/' + gadChanges.iid;

    // var ridsToGet = [ 'manuf', 'model', 'hwVer', 'swVer', 'availPwrSrc', 'pwrSrcVoltage' ];

    var devAttrs = {},
        gadAttrs = {};

    if (oidStr === 'device' && gadChanges.iid === 0) {
        switch (ridStr) {
            case 'manuf':
                devAttrs.manufacturer = attrData;
                break;
            case 'model':
                devAttrs.model = attrData;
                break;
            case 'hwVer':
                devAttrs.version = devAttrs.version || {};
                devAttrs.version.hw = attrData;
                break;
            case 'swVer':
                devAttrs.version = devAttrs.version || {};
                devAttrs.version.sw = attrData;
                break;
            case 'availPwrSrc':
                devAttrs.power = devAttrs.power || {};
                devAttrs.power.type = attrData;
                break;
            case 'pwrSrcVoltage':
                devAttrs.power = devAttrs.power || {};
                devAttrs.power.voltage = attrData.toString();
                break;
        }

        if (Object.keys(devAttrs).length)
            nc.commitDevReporting(dev.mac, devAttrs);
    } else if (getGadClass(oidStr)) {
        gadAttrs[ridStr] = attrData;
        nc.commitGadReporting(dev.mac, auxId, gadAttrs);
    }
});



module.exports = nc;
