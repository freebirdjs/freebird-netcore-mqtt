var helper = require('../helper');

module.exports = function (netcore, qnode) {
    // listen shepherd event: 'DEV_INCOMING'
    var rawDev = qnode.dump(),
        mac = rawDev.mac,
        clientId = rawDev.clientId,
        permAddr = helper.buildPermAddr(mac, clientId), // '00:aa:bb:...:ee/fooId'
        smartobjects = rawDev.so;

    netcore.commitDevIncoming(permAddr, rawDev);

    process.nextTick(function () {
        for (var oid in smartobjects) {
            var gadGroup = smartobjects[oid],
                classId = helper.getGadClassId(oid);

            if (classId)
                _commitGadGroup(netcore, permAddr, classId, gadGroup)
        }
    });
};

function _commitGadGroup(netcore, permAddr, classId, gadGroup) {
    for (var iid in gadGroup) {
        _commitSingleGad(netcore, permAddr, classId, iid, gadGroup);
    }
}

function _commitSingleGad(netcore, permAddr, classId, iid, gadGroup) {
    process.nextTick(function () {
        var auxId = classId + '/' + iid;
        netcore.commitGadIncoming(permAddr, auxId, {
            classId: classId,
            auxId: auxId,
            attrs: gadGroup[iid]
        });
    });
}