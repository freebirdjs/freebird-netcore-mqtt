var devDrivers = {
    controller: null,
    read: function (permAddr, attr, callback) {
        // function(permAddr, attr, callback) {}
        // callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
        var qnodes = this.findByMacAddr(permAddr);  // returns an array

        // [TODO] be careful! read device attr, not gadget attr
        if (qnode)
            qnode.readReq();
    },
    write: function (permAddr, attr, val, callback) {
        // function(permAddr, attr, val, callback) {}
        // callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
        var qnodes = this.findByMacAddr(permAddr);  // returns an array

        // [TODO] anything writable?
    },
    identify: function (permAddr, callback) {
        // function(permAddr, callback) {},             callback(err)

        // [TODO] do we have this feature on firmware? What if not?
    }
};

module.exports = function (controller) {
    devDrivers.controller = controller;
    devDrivers.read = read.bind(controller);
    devDrivers.write = write.bind(controller);
    devDrivers.identify = identify.bind(controller);
    return devDrivers;
};

function shouldReadFromDeviceSo() {
    // (1) read from device[0]
    // (2) discover

    // var matchedKeys = {
    //     manufacturer: 'manuf',
    //     model: 'model',
    //     version: 'model',
    // };
}

    // dev.setAttrs({
    //     manufacturer: rawDev.so.device[0].manuf,
    //     model: rawDev.so.device[0].model,
    //     serial: '',
    //     version: {
    //         hw: rawDev.so.device[0].hwVer,
    //         sw: rawDev.so.device[0].swVer,
    //         fw: ''
    //     },
    //     power: {
    //         type: rawDev.so.device[0].availPwrSrc,
    //         voltage: rawDev.so.device[0].pwrSrcVoltage.toString()
    //     },
    //     clientId: rawDev.clientId,
    //     lifetime: rawDev.lifetime,
    //     lwmqnVersion: rawDev.version,
    //     devType: rawDev.so.device[0].devType
    // });