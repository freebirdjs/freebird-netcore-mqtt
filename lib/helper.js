var helper = {};

var validGadClassIds = [
    'dIn', 'dOut', 'aIn', 'aOut', 'generic', 'illuminance', 'presence', 'temperature', 'humidity', 'pwrMea',
    'actuation', 'setPoint', 'loadCtrl', 'lightCtrl', 'pwrCtrl', 'accelerometer', 'magnetometer', 'barometer'
];

helper.getGadClassId = function (gadId) {
    // [TODO] use lwm2m-id to ensure again
    return validGadClassIds.find(function (vldGadId) {
        return (gadId === vldGadId);
    });
};

helper.notifyType = function (data) {
    if (helper.isNil(data.rid))
        return 'instance';
    else
        return 'resource';
};

helper.isNil = function (val) {
    return ((undefined === val) || (null === val));
};

module.exports = helper;
