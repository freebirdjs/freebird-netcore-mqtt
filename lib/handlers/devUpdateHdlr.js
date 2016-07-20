var _ = require('busyman'),
    helper = require('../helper');

module.exports = function (netcore, qnode, attrs) {
    var permAddr = helper.buildPermAddr(qnode.mac, qnode.clientId),
        devAttrsToReport = {};

    if (attrs.ip) {
        netcore.commitDevNetChanging(permAddr, {
            address: {
                dynamic: attrs.ip
            }
        });
    }

    if (attrs.lifetime)
        devAttrsToReport.lifetime = attrs.lifetime;

    if (attrs.version)
        devAttrsToReport.lwmqnVersion = attrs.version;

    if (_.keys(devAttrsToReport).length)   // there is something to report
        netcore.commitDevReporting(permAddr, devAttrsToReport);
};
