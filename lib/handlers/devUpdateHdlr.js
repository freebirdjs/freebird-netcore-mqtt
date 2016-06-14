module.exports = function (netcore, qnode, attrs) {
    var permAddr = qnode.mac,
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

    if (Object.keys(devAttrsToReport).length)   // there is something to report
        netcore.commitDevReporting(permAddr, devAttrsToReport);
};
