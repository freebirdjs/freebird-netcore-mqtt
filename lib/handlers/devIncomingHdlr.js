'use strict';

var _ = require('busyman'),
    helper = require('../helper');

module.exports = function (netcore, qnode) {
    // listen shepherd event: 'DEV_INCOMING'
    var rawDev = qnode.dump(),
        mac = rawDev.mac,
        clientId = rawDev.clientId,
        permAddr = helper.buildPermAddr(mac, clientId), // '00:aa:bb:...:ee/fooId'
        smartobjects = rawDev.so;


    process.nextTick(function () {
        netcore.commitDevIncoming(permAddr, rawDev);

        _.forEach(smartobjects, function (gadGroup, oid) {
            var classId = helper.getGadClassId(oid);

            if (classId)
                _commitGadGroup(netcore, permAddr, classId, gadGroup)
        });
    });
};

function _commitGadGroup(netcore, permAddr, classId, gadGroup) {
    _.forEach(gadGroup, function (resrcs, iid) {
        _commitSingleGad(netcore, permAddr, classId, iid, resrcs);
    });
}

function _commitSingleGad(netcore, permAddr, classId, iid, resrcs) {
    setImmediate(function () {
        var auxId = classId + '/' + iid;
        netcore.commitGadIncoming(permAddr, auxId, {
            classId: classId,
            auxId: auxId,
            attrs: resrcs
        });
    });
}
