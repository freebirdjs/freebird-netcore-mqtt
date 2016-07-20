var _ = require('busyman'),
    lwm2mId = require('lwm2m-id'),
    fBase = require('freebird-base'),
    MqttShepherd = require('mqtt-shepherd');

var helper = require('./helper.js'),
    msgHdlrs = require('./handlers/msgHdlrs.js'),
    cookRawDev = require('./components/cookRawDev.js'),
    cookRawGad = require('./components/cookRawGad.js');

module.exports = function (name, settings) {
    if (!_.isString(name)) {
        settings = name;
        name = undefined;
    }

    if (!_.isUndefined(settings) && !_.isPlainObject(settings))
        throw new TypeError('settings should be an object if given.');

    var netcore,
        ncName = (name || 'freebird-netcore-mqtt'),
        shepherd = new MqttShepherd(ncName, settings),
        drivers = require('./drivers/drivers.js')(shepherd);

    /***********************************************************************/
    /*** Create Netcore                                                  ***/
    /***********************************************************************/
    netcore = fBase.createNetcore(ncName, shepherd, {
        phy: 'ieee802',
        tl: 'tcp',
        nwk: 'ip',
        apl: 'mqtt'
    });

    netcore.cookRawDev = cookRawDev;
    netcore.cookRawGad = cookRawGad;

    netcore.registerNetDrivers(drivers.net);
    netcore.registerDevDrivers(drivers.dev);
    netcore.registerGadDrivers(drivers.gad);

    /***********************************************************************/
    /*** Event Transducer                                                ***/
    /***********************************************************************/
    shepherd.on('error', function (err) {
        if (_.isFunction(netcore.commitError))
            netcore.commitError('net', err);
    });

    shepherd.on('ready', function () {
        netcore.commitReady();  // netcore.enable() inside netcore
    });

    shepherd.on('ind', function (msg) {
        var type = msg.type,
            qnode = msg.qnode;  // just pass qnode, no need to dump first

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

    return netcore;
};
