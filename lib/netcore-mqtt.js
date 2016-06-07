var EventEmitter = require('events');
var lwm2mId = require('lwm2m-id'),
    FreebirdBase = require('freebird-base'),
    Netcore = FreebirdBase.Netcore,
    shepherd = require('./mqtt-shepherd.js');

var validGads = [ 'dIn', 'dOut', 'aIn', 'aOut', 'generic', 'illuminance', 'presence',
                  'temperature', 'humidity', 'pwrMea', 'actuation', 'setPoint', 'loadCtrl',
                  'lightCtrl', 'pwrCtrl', 'accelerometer', 'magnetometer', 'barometer' ];

var protocol = {
    phy: 'ieee802',
    tl: 'tcp',
    nwk: 'ip',
    apl: 'mqtt'
};
var netcore = new Netcore('freebird-netcore-mqtt', shepherd, protocol);

var netDrivers = require('./drivers/netDrivers')(shepherd),
    devDrivers = require('./drivers/devDrivers')(shepherd),
    gadDrivers = require('./drivers/gadDrivers')(shepherd);

var cookRawDev = require('./components/cookRawDev'),
    cookRawGad = require('./components/cookRawGad');

var msgHdlr = require('./handlers/msgHdlr')(netcore);
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
/*** Start Building Netcore                                          ***/
/***********************************************************************/
netcore.cookRawDev = cookRawDev;
netcore.cookRawGad = cookRawGad;

netcore.registerNetDrivers(netDrivers);
netcore.registerDevDrivers(devDrivers);
netcore.registerGadDrivers(gadDrivers);

shepherd.on('ready', function () {
    msgHdlr.readyHdlr(netcore);
});

shepherd.on('ind', function (msg) {
    var type = msg.type,
        qnode = msg.qnode,
        data = msg.data;

    switch (type) {
        case 'devIncoming':
            msgHdlr.devIncomingHdlr(netcore, qnode, data);
            break;
        case 'devLeaving':
            msgHdlr.devLeavingHdlr(netcore, qnode, data);
            break;
        case 'devUpdate':
            msgHdlr.devUpdateHdlr(netcore, qnode, data);
            break;
        case 'devNotify':
            msgHdlr.devNotifyHdlr(netcore, qnode, data);
            break;
        case 'devChange':
            msgHdlr.devChangeHdlr(netcore, qnode, data);
            break;
        case 'devStatus':
            msgHdlr.devStatusHdlr(netcore, qnode, data);
            break;
        default:
            break;
    }
});

module.exports = netcore;
