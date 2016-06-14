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

module.exports = helper;

