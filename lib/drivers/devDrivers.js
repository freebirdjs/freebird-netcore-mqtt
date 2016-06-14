var helper = require('../helper.js');

function read(permAddr, attr, callback) {
    // callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
    var shepherd = this;
    // [TODO] be careful! read device attr, not gadget attr


    helper.findQnode(shepehrd, permAddr, function (err, qnode) {
        if (err) {
            callback(err);
        } else {
            qnode.readReq();
        }
    });


    // qnode.readReq('device/0', function (err, rsp) {
    //     var val,
    //         readData = rsp.data;

    //     switch (attrName) {
    //         case 'manufacturer':
    //             val = readData.manuf;
    //             break;
    //         case 'model':
    //             val = readData.model;
    //             break;
    //         case 'serial':
    //             val = '';
    //             break;
    //         case 'version':
    //             val = {
    //                 hw: readData.hwVer,
    //                 sw: readData.swVer,
    //                 fw: ''
    //             };
    //             break;
    //         case 'power':
    //             val = {
    //                 type: readData.availPwrSrc,
    //                 voltage: readData.pwrSrcVoltage.toString()
    //             };
    //             break;
    //         case 'devType':
    //             val = readData.devType;
    //             break;
    //         case 'clientId':
    //             val = qnode.dump().clientId;
    //             break;
    //         case 'lifetime':
    //             val = qnode.dump().lifetime;
    //             break;
    //         case 'lwmqnVersion':
    //             val = qnode.dump().version;
    //             break;
    //     }
    // });
}

function write(permAddr, attr, val, callback) {
    // callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
    var shepehrd = this;

    helper.findQnode(shepehrd, permAddr, function (err, qnode) {
        if (err) {
            callback(err);
        } else {
            qnode.writeReq();
        }
    });

}

function identify(permAddr, callback) {
    // callback(err)

    // [TODO] do we have this feature on firmware? What if not?
}

module.exports = {
    read: read,
    write: write,
    identify: identify
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

