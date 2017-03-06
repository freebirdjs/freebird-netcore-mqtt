'use strict';

var helper = require('../helper');

module.exports = function (netcore, qnode, status) {
    var permAddr = helper.buildPermAddr(qnode.mac, qnode.clientId);
    netcore.commitDevNetChanging(permAddr, { status: status });
};
