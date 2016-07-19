var helper = require('../helper.js');

module.exports = function (netcore, qnode, data) {
    var permAddr = helper.buildPermAddr(qnode.mac, qnode.clienId),
        classId = helper.getGadClassId(data.oid),
        auxId = classId + '/' + data.iid,
        notifyType = helper.notifyType(data),
        valueToReport = data.data,
        devAttrsToReport,
        rscObj;

    if (helper.isGadReportActuallyDevAttr(auxId)) {
        devAttrsToReport = {};

        if (notifyType === 'instance')
            helper.mapGadAttrsToDevAttrs(devAttrsToReport, valueToReport);
        else if (notifyType === 'resource')
            helper.mapGadAttrToDevAttr(devAttrsToReport, data.rid, valueToReport);

        if (Object.keys(devAttrsToReport).length)   // there is something to report
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
