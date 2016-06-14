var lwm2mId = require('lwm2m-id'),
    shepherd = require('mqtt-shepherd'),
    fBase = require('freebird-base');

var cookRawDev = require('./components/cookRawDev.js'),
    cookRawGad = require('./components/cookRawGad.js'),
    msgHdlrs = require('./handlers/msgHdlrs.js');

var protocol = {
        phy: 'ieee802',
        tl: 'tcp',
        nwk: 'ip',
        apl: 'mqtt'
    },
    netcore = fBase.createNetcore('freebird-netcore-mqtt', shepherd, protocol);

var netDrivers = require('./drivers/netDrivers')(shepherd),
    devDrivers = require('./drivers/devDrivers')(shepherd),
    gadDrivers = require('./drivers/gadDrivers')(shepherd);

/***********************************************************************/
/*** Start Building Netcore                                          ***/
/***********************************************************************/
netcore.cookRawDev = cookRawDev;
netcore.cookRawGad = cookRawGad;

netcore.registerNetDrivers(netDrivers);
netcore.registerDevDrivers(devDrivers);
netcore.registerGadDrivers(gadDrivers);

shepherd.on('permitJoining', function (time) {
    if (typeof netcore.onPermitJoining === 'function')
        netcore.onPermitJoining(time);
});

shepherd.on('error', function (err) {
    if (typeof netcore.onError === 'function')
        netcore.onError(err);
});

shepherd.on('ready', function () {
    msgHdlrs.ready(netcore);
});

shepherd.on('ind', function (msg) {
    var type = msg.type,
        qnode = msg.qnode;

    switch (type) {
        case 'devIncoming':
            msgHdlrs.devIncoming(netcore, qnode);
            break;
        case 'devLeaving':
            var permAddr = msg.data;
            msgHdlrs.devLeaving(netcore, permAddr);
            break;
        case 'devUpdate':
            var devAttrChanges = msg.data;
            msgHdlrs.devUpdate(netcore, qnode, devAttrChanges);
            break;
        case 'devNotify':
            var devAttrNotified = msg.data;
            msgHdlrs.devNotify(netcore, qnode, devAttrNotified);
            break;
        case 'devChange':
            msgHdlrs.devChange(netcore, qnode, data);
            break;
        case 'devStatus':
            var statusString = data;
            msgHdlrs.devStatus(netcore, qnode, statusString);
            break;
        default:
            break;
    }
});

module.exports = netcore;
