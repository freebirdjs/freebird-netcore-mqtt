module.exports = function (netcore, qnode, statusString) {
    var permAddr = qnode.mac;

    if (statusString === 'online')
        netcore.commitDevNetChanging(permAddr, {}); // nothing change, just tell netcore the device is there
    else if (statusString === 'offline')
        netcore.commitDevLeaving(permAddr);
};
