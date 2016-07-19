var lwm2mId = require('lwm2m-id'),
    MqttShepherd = require('mqtt-shepherd'),
    fBase = require('freebird-base');

var shepherd = new MqttShepherd('freebird-mqtt-netcore');

var drivers = require('./drivers/drivers.js')(shepherd),
    cookRawDev = require('./components/cookRawDev.js'),
    cookRawGad = require('./components/cookRawGad.js'),
    msgHdlrs = require('./handlers/msgHdlrs.js'),
    helper = require('./helper.js');

var protocol = {
        phy: 'ieee802',
        tl: 'tcp',
        nwk: 'ip',
        apl: 'mqtt'
    };

/***********************************************************************/
/*** Create Netcore                                                  ***/
/***********************************************************************/
var netcore = fBase.createNetcore('freebird-netcore-mqtt', shepherd, protocol);

netcore.cookRawDev = cookRawDev;
netcore.cookRawGad = cookRawGad;
console.log('*********');
console.log(netcore.cookRawGad);

netcore.registerNetDrivers(drivers.net);
netcore.registerDevDrivers(drivers.dev);
netcore.registerGadDrivers(drivers.gad);

/***********************************************************************/
/*** Event Transducer                                                ***/
/***********************************************************************/
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
            var macAddr = msg.data,
                cliendId = qnode,
                permAddr = helper.buildPermAddr(macAddr, cliendId);
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
            msgHdlrs.devChange(netcore, qnode, msg.data);
            break;
        case 'devStatus':
            var statusString = msg.data;
            msgHdlrs.devStatus(netcore, qnode, statusString);
            break;
        default:
            break;
    }
});

module.exports = netcore;
