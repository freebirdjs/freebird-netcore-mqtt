var _ = require('busyman');
var helper = require('../helper.js');

function read(permAddr, attrName, callback) {
    // callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
    var shepherd = this;
        realAddr = helper.parsePermAddr(permAddr),
        qnode = shepherd.find(realAddr.clientId);
    // Be careful! read device attr, not gadget attr

    if (qnode) {
        qnode.readReq('device/0', function (err, rsp) {
            var val,
                readData;

            if (err) {
                callback(err);
            } else {
                readData = _.isObject(rsp) ? rsp.data : {};

                switch (attrName) {
                    case 'manufacturer':
                        val = readData.manuf;
                        break;
                    case 'model':
                        val = readData.model;
                        break;
                    case 'serial':
                        val = '';
                        break;
                    case 'version':
                        val = {
                            hw: readData.hwVer,
                            sw: readData.swVer,
                            fw: ''
                        };
                        break;
                    case 'power':
                        val = {
                            type: readData.availPwrSrc,
                            voltage: readData.pwrSrcVoltage.toString()
                        };
                        break;
                    case 'devType':
                        val = readData.devType;
                        break;
                    case 'clientId':
                        val = qnode.dump().clientId;
                        break;
                    case 'lifetime':
                        val = qnode.dump().lifetime;
                        break;
                    case 'lwmqnVersion':
                        val = qnode.dump().version;
                        break;
                }

                callback(null, val);
            }
        });
    } else {
        callback(new Error('Device not found.'));
    }
}

function write(permAddr, attrName, val, callback) {
    // [TODO] almost cannot write
    // callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
    var shepehrd = this,
        realAddr = helper.parsePermAddr(permAddr),
        qnode = shepherd.find(realAddr.clientId),
        resrcPath;

    if (qnode) {
        switch (attrName) {
            //     case 'manufacturer':
            //         resrcPath = 'device/0/manuf';
            //         break;
            //     case 'model':
            //         resrcPath = 'device/0/model';
            //         break;
            //     case 'serial':
            //         val = '';
            //         break;
            //     case 'version':
            //         // cannot write

            //         // resrcPath = 'device/0/hwVer';
            //         // resrcPath = 'device/0/swVer';
            //         val = {
            //             hw: readData.hwVer,
            //             sw: readData.swVer,
            //             fw: ''
            //         };
            //         break;
            //     case 'power':
            //         // cannot write
            //         // resrcPath = 'device/0/availPwrSrc';
            //         // resrcPath = 'device/0/pwrSrcVoltage';
            //         val = {
            //             type: readData.availPwrSrc,
            //             voltage: readData.pwrSrcVoltage.toString()
            //         };
            //         break;
            //     case 'devType':
            //         // resrcPath = 'device/0/devType';
            //         val = readData.devType;
            //         break;
            //     case 'clientId':
            //     case 'lifetime':
            //     case 'lwmqnVersion':
            //         // cannot write
            //         break;
            // }
    } else {
        callback(new Error('Device not found.'));
    }
}

module.exports = {
    read: read,
    write: write,
    // identify: identify   // no need to implement
};
