module.exports = function (dev, rawDev, cb) {
    dev.setNetInfo({
        role: 'mqtt-node',
        parent: '0',
        maySleep: false,
        sleepPeriod: 60,
        address: {
            permanent: rawDev.mac,
            dynamic: rawDev.ip
        }
    });

    dev.setAttrs({
        manufacturer: rawDev.so.device[0].manuf,
        model: rawDev.so.device[0].model,
        serial: '',
        version: {
            hw: rawDev.so.device[0].hwVer,
            sw: rawDev.so.device[0].swVer,
            fw: ''
        },
        power: {
            type: rawDev.so.device[0].availPwrSrc,
            voltage: rawDev.so.device[0].pwrSrcVoltage.toString()
        },
        clientId: rawDev.clientId,
        lifetime: rawDev.lifetime,
        lwmqnVersion: rawDev.version,
        devType: rawDev.so.device[0].devType
    });

    dev.extra = rawDev;

    cb(null, dev);
};
