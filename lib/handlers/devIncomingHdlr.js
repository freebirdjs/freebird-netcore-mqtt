var helper = require('../helper');

module.exports = function (netcore, qnode) {
    // listen shepherd event: 'DEV_INCOMING'
    var rawDev = qnode.dump(),
        permAddr = rawDev.mac,
        smartobjects = rawDev.so;

    netcore.commitDevIncoming(permAddr, rawDev);

    process.nextTick(function () {
        for (var oid in smartobjects) {
            var gadGroup = smartobjects[oid],
                classId = helper.getGadClassId(oid);

            if (classId) {
                for (var iid in gadGroup) {
                    var auxId = classId + '/' + iid;
                    netcore.commitGadIncoming(permAddr, auxId, {
                        classId: classId,
                        auxId: auxId,
                        attrs: gadGroup[iid]
                    });
                }
            }
        }
    });
};
