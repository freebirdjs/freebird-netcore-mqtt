var EventEmitter = require('events');

var lwm2mId = require('lwm2m-id'),
    shepherd = require('mqtt-shepherd'),
    fBase = require('freebird-base');

var protocol = { phy: 'ieee802', tl: 'tcp', nwk: 'ip', apl: 'mqtt' },
    netcore = fBase.createNetcore('freebird-netcore-mqtt', shepherd, protocol);

var netDrivers = require('./drivers/netDrivers')(shepherd),
    devDrivers = require('./drivers/devDrivers')(shepherd),
    gadDrivers = require('./drivers/gadDrivers')(shepherd);

var cookRawDev = require('./components/cookRawDev'),
    cookRawGad = require('./components/cookRawGad');

var msgHdlr = require('./handlers/msgHdlr');
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
        qnode = msg.qnode;

    switch (type) {
        case 'devIncoming':
            msgHdlr.devIncoming(netcore, qnode);
            break;
        case 'devLeaving':
            var permAddr = msg.data;
            msgHdlr.devLeaving(netcore, permAddr);
            break;
        case 'devUpdate':
            var devAttrChanges = msg.data;
            msgHdlr.devUpdate(netcore, qnode, devAttrChanges);
            break;
        case 'devNotify':
            var devAttrNotified = msg.data;
            msgHdlr.devNotify(netcore, qnode, devAttrNotified);
            break;
        case 'devChange':
            msgHdlr.devChange(netcore, qnode, data);
            break;
        case 'devStatus':
            var statusString = data;
            msgHdlr.devStatus(netcore, qnode, statusString);
            break;
        default:
            break;
    }
});

module.exports = netcore;
