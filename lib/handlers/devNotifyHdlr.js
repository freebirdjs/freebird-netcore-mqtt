var helper = require('../helper.js');

module.exports = function (netcore, qnode, data) {
    var permAddr = qnode.mac,
        auxId = data.oid + '/' + data.iid,
        notifyType = helper.notifyType(data),
        valueToReport = data.data,
        rscObj;

    if (notifyType === 'instance') {
        netcore.commitGadReporting(permAddr, auxId, valueToReport);
    } else if (notifyType === 'resource') {
        rscObj = {};
        rscObj[data.rid] = valueToReport;
        netcore.commitGadReporting(permAddr, auxId, rscObj);
    }
};
