var _ = require('busyman'),
    helper = require('../helper.js');

function read(permAddr, attrName, callback) {
    // callback(err, result),
    // result: value read (Type denpends, ex: 'hello', 12, false)
    var realAddr = helper.parsePermAddr(permAddr),
        qnode = this.find(realAddr.clientId);
    // Be careful! read device attr, not gadget attr

    if (!qnode)
        return callback(new Error('Device not found.'));


    qnode.readReq('device/0', function (err, rsp) {
        var val,
            readData;

        if (err)
            return callback(err);

        readData = _.isObject(rsp) ? rsp.data : {};

        if (!_.isObject(readData))
            return callback('Bad data read');

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
            // case 'devType':
            //     val = readData.devType;
            //     break;
            // case 'clientId':
            //     val = qnode.clientId;
            //     break;
            // case 'lifetime':
            //     val = qnode.lifetime;
            //     break;
            // case 'lwmqnVersion':
            //     val = qnode.version;
            //     break;
        }
        callback(null, val);
    });
}

function write(permAddr, attrName, val, callback) {
    // callback(err, result)
    // result: value written (optional, Type denpends, ex: 'hello', 12, false)
    var realAddr = helper.parsePermAddr(permAddr),
        qnode = this.find(realAddr.clientId),
        resrcPath;

    if (qnode)
        callback(new Error('Device attribute ' + attrName + ' is read-only.'));
    else
        callback(new Error('Device not found.'));
}

module.exports = {
    read: read,
    write: write,
    // identify: identify   // [TODO] add a new interface to lwmqn
};
