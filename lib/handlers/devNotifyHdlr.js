var _ = reuqire('busyman'),
    helper = require('../helper.js');

module.exports = function (netcore, qnode, data) {
    var permAddr = helper.buildPermAddr(qnode.mac, qnode.clienId),
        classId = helper.getGadClassId(data.oid),
        notifyType = helper.notifyType(data),
        valueToReport = data.data,
        auxId,
        rscObj,
        devAttrsToReport;


    if (_.isNil(classId))
        return;
    else
        auxId = classId + '/' + data.iid;
   
    if (auxId === 'device/0') {
        devAttrsToReport = {};

        if (notifyType === 'instance')
            helper.mapGadAttrsToDevAttrs(devAttrsToReport, valueToReport);
        else if (notifyType === 'resource')
            helper.mapGadAttrToDevAttr(devAttrsToReport, data.rid, valueToReport);

        if (_.keys(devAttrsToReport).length)   // there is something to report
            netcore.commitDevReporting(permAddr, devAttrsToReport);

    } else {
        if (notifyType === 'instance') {
            netcore.commitGadReporting(permAddr, auxId, valueToReport);
        } else if (notifyType === 'resource') {
            rscObj = {};
            rscObj[data.rid] = valueToReport;
            netcore.commitGadReporting(permAddr, auxId, rscObj);
        }
    }
};
