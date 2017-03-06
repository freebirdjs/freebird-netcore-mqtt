'use strict';

var helper = require('../helper.js');

module.exports = function (dev, rawDev, done) {
    // rawDev = qnode.dump()
    var mac = rawDev.mac,
        dynAddr = rawDev.ip,
        clientId = rawDev.clientId,
        permAddr = helper.buildPermAddr(mac, clientId),
        deviceInfo = rawDev.so.device ? rawDev.so.device[0] : {};

    dev.set('net', {
        address: {
            permanent: permAddr,
            dynamic: dynAddr
        },
        role: 'mqtt-node',
        parent: '0',
        maySleep: false,
        sleepPeriod: 60
    });

    dev.set('attrs', {
        manufacturer: deviceInfo.manuf || '',
        model: deviceInfo.model || '',
        serial: '',
        version: {
            hw: deviceInfo.hwVer || '',
            sw: deviceInfo.swVer || '',
            fw: ''
        },
        power: {
            type: deviceInfo.availPwrSrc || '',
            voltage: deviceInfo.pwrSrcVoltage.toString() || ''
        }
    });

    dev.extra = rawDev;

    done(null, dev);
};
