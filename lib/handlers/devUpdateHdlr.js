'use strict';

var _ = require('busyman'),
    helper = require('../helper');

module.exports = function (netcore, qnode, attrs) {
    var permAddr = helper.buildPermAddr(qnode.mac, qnode.clientId);

    if (attrs.ip) {
        netcore.commitDevNetChanging(permAddr, {
            address: {
                dynamic: attrs.ip
            }
        });

        delete attrs.ip;
    }

    if (_.keys(attrs).length)   // there is something to report
        netcore.commitDevReporting(permAddr, attrs);
};
