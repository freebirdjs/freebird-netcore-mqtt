var EventEmitter = require('events');
var lwm2mId = require('lwm2m-id'),
    FreebirdBase = require('freebird-base'),
    Netcore = FreebirdBase.Netcore,
    shepherd = require('./mqtt-shepherd.js');

var cookRawDev = require('./components/cookRawDev'),
    cookRawGad = require('./components/cookRawGad');

var msgHdlr = require('./handlers/msgHdlr');

var netDrvs = require('./drivers/netDrivers')(shepherd),
    devDrvs = require('./drivers/devDrivers')(shepherd),
    gadDrvs = require('./drivers/gadDrivers')(shepherd);

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
    start: netDrvs.start,
    stop: netDrvs.stop,
    reset: netDrvs.reset,
    permitJoin: netDrvs.permitJoin,
    remove: netDrvs.remove,
    ban: netDrvs.ban,
    unban: netDrvs.unban,
    ping: netDrvs.ping
};

var devDrivers = {
    read: devDrvs.read,
    write: devDrvs.write,
    identify: devDrvs.identify
};

var gadDrivers = {
    read: gadDrvs.read,
    write: gadDrvs.write,
    exec: gadDrvs.exec,
    setReportCfg: gadDrvs.setReportCfg,
    getReportCfg: gadDrvs.getReportCfg,
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

nc.cookRawDev = cookRawDev;
nc.cookRawGad = cookRawGad;

nc.registerNetDrivers(netDrivers);
nc.registerDevDrivers(devDrivers);
nc.registerGadDrivers(gadDrivers);

shepherd.on('ready', msgHdlr.readyHdlr);    // [TODO] need bind to nc
shepherd.on('ind', function (msg) {
    switch (msg.type) {
        case 'devIncoming':
            msgHdlr.devIncomingHdlr(msg);
            break;
        case 'devLeaving':
            msgHdlr.devLeavingHdlr(msg);
            break;
        case 'devUpdate':
            msgHdlr.devUpdateHdlr(msg);
            break;
        case 'devNotify':
            msgHdlr.devNotifyHdlr(msg);
            break;
        case 'devChange':
            msgHdlr.devChangeHdlr(msg);
            break;
        case 'devStatus':
            msgHdlr.devStatusHdlr(msg);
            break;
        default:
            break;
    }
});

module.exports = nc;
