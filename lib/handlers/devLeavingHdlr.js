'use strict';

module.exports = function (netcore, builtPermAddr) {
    // listen shepherd event: 'DEV_LEAVING'
    // builtPermAddr has been built in netcore-mqtt ind handler
    netcore.commitDevLeaving(builtPermAddr);
};
