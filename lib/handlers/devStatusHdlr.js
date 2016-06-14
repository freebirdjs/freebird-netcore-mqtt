var helper = require('../helper');

module.exports = function (netcore, qnode, status) {
    var permAddr = helper.buildPermAddr(qnode.mac, qnode.clientId);

    if (status === 'online')
        netcore.commitDevNetChanging(permAddr, {}); // nothing change, just tell netcore the device is there
    else if (status === 'offline')
        netcore.commitDevLeaving(permAddr);
};
