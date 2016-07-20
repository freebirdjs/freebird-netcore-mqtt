var _ = require('busyman'),
    helper = require('../helper.js');

function read(permAddr, attrName, callback) {
    // callback(err, result),
    // result: value read (Type denpends, ex: 'hello', 12, false)
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
                        val = qnode.clientId;
                        break;
                    case 'lifetime':
                        val = qnode.lifetime;
                        break;
                    case 'lwmqnVersion':
                        val = qnode.version;
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
    // callback(err, result)
    // result: value written (optional, Type denpends, ex: 'hello', 12, false)
    var shepehrd = this,
        realAddr = helper.parsePermAddr(permAddr),
        qnode = shepherd.find(realAddr.clientId),
        resrcPath;

    if (qnode)
        callback(new Error('Device attribute ' + attrName + ' is read-only.'));
    else
        callback(new Error('Device not found.'));
}

module.exports = {
    read: read,
    write: write,
    // identify: identify   // no need to implement
};
