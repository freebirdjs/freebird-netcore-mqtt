module.exports = function (netcore, qnode, status) {
    var permAddr = qnode.mac;

    if (status === 'online')
        netcore.commitDevNetChanging(permAddr, {}); // nothing change, just tell netcore the device is there
    else if (status === 'offline')
        netcore.commitDevLeaving(permAddr);
};
