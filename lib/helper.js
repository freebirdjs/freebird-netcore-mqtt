var lwm2mId = require('lwm2m-id');
var helper = {};

var validGadClassIds = [
    'dIn', 'dOut', 'aIn', 'aOut', 'generic', 'illuminance', 'presence', 'temperature', 'humidity', 'pwrMea',
    'actuation', 'setPoint', 'loadCtrl', 'lightCtrl', 'pwrCtrl', 'accelerometer', 'magnetometer', 'barometer'
];

helper.getGadClassId = function (classId) {
    var oidItem = lwm2mId.getOid(classId);

    if (oidItem)
        classId = oidItem.key;

    return validGadClassIds.find(function (vldGadId) {
        return (classId === vldGadId);
    });
};

helper.notifyType = function (data) {
    if (helper.isNil(data.oid) || helper.isNil(data.iid))
        return 'unknown';
    else if (helper.isNil(data.rid))
        return 'instance';
    else
        return 'resource';
};

helper.isGadReportActuallyDevAttr = function (auxId) {
    if (auxId !== 'device/0')
        return false;
    else
        return true;
};

helper.isNil = function (val) {
    return ((undefined === val) || (null === val));
};

helper.buildPermAddr = function (macAddr, clientId) {
    return macAddr + '/' + clientId;
};

helper.parsePermAddr = function (permAddr) {
    var splitAddr = permAddr.split('/');
    return {
        mac: splitAddr[0],
        clientId: splitAddr[1]
    };
};

helper.reqPath = function (auxId, attrName) {
    if (auxId.endsWith('/') || auxId.endsWith('.'))
        auxId = auxId.slice(0, auxId.length - 1);

    return auxId + '/' + attrName;
};

helper.mapGadAttrToDevAttr = function (devAttrsContainer, gadAttrName, value) {
    switch (gadAttrName) {
        case 'manuf':
            devAttrsContainer.manufacturer = value;
            break;
        case 'model':
            devAttrsContainer.model = value;
            break;
        case 'hwVer':
            devAttrsContainer.version = devAttrsContainer.version || {};
            devAttrsContainer.version.hw = value;
            break;
        case 'swVer':
            devAttrsContainer.version = devAttrsContainer.version || {};
            devAttrsContainer.version.sw = value;
            break;
        case 'availPwrSrc':
            devAttrsContainer.power = devAttrsContainer.power || {};
            devAttrsContainer.power.type = value;
            break;
        case 'pwrSrcVoltage':
            devAttrsContainer.power = devAttrsContainer.power || {};
            devAttrsContainer.power.voltage = value.toString();
            break;
        case 'devType':
            devAttrsContainer.devType = value;
            break;
    }

    return devAttrsContainer;
};

helper.mapGadAttrsToDevAttrs = function (devAttrsContainer, gadAttrs) {
    for (var k in gadAttrs) {
        mapGadAttrToDevAttr(devAttrsContainer, k, gadAttrs[k]);
    }

    return devAttrsContainer;
};


helper.getRspCode = function (code) {
    var rspItem = lwm2mId.getRspCode(code);
    return rspItem ? { key: rspItem.key, value: rspItem.value } : undefined;
};

helper.isGoodResponse = function (status) {
    var statusCode = helper.getRspCode(status),
        goodCodes = [ 200, 201, 202, 204, 205 ],
        included = false;

    if (typeof statusCode === 'undefined')
        return false;

    goodCodes.forEach(function (v) {
        if (v === statusCode.value)
            included = true;
    });

    return included;
};

helper.findQnode = function (shepehrd, permAddr, callback) {
        var err = null,
            qnode,
            qnodes,
            parsedAddr = helper.parsePermAddr(permAddr);

        if (parsedAddr.clientId)
            qnode = shepherd.find(parsedAddr.clientId);

        if (qnode) {
            callback(null, qnode);
            return;
        } else {
            qnodes = shepherd.findByMacAddr(parsedAddr.mac);
            if (qnodes.length === 0)
                err = new Error('Target not found.');
            else if (qnode.length !== 1)
                err = new Error('Ambiguous address, multiple targets found.');
            else
                qnode = qnode[0];
        }

        callback(err, qnode);
};

module.exports = helper;

