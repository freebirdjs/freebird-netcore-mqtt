// [TODO] not finish yet
module.exports = function (netcore, qnode, devAttrChanges) {
    var permAddr = qnode.mac;

    if (devAttrChanges.ip) {
        netcore.commitDevNetChanging(permAddr, {
            address: {
                dynamic: devAttrChanges.ip
            }
        });
    }

    delete devAttrChanges.ip;

    if (Object.keys(devAttrChanges)) {  // there is other attributes
        // status, lifetime, ip, and version
    }
};
