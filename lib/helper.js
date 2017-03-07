'use strict';

var _ = require('busyman'),
    lwm2mId = require('lwm2m-id');
var helper = {};

helper.getGadClassId = function (classId) {
    var oidItem = lwm2mId.getOid(classId),
        validId;

    if (oidItem && oidItem.value >= 3200 && oidItem.value < 4000) {
        validId = oidItem.key;
    }

    return validId;
};

helper.notifyType = function (data) {
    if (_.isNil(data.oid) || _.isNil(data.iid))
        return 'unknown';
    else if (_.isNil(data.rid))
        return 'instance';
    else
        return 'resource';
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
    _.forEach(gadAttrs, function (v, k) {
        mapGadAttrToDevAttr(devAttrsContainer, k, v);
    });
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

module.exports = helper;

