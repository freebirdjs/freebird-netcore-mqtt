'use strict';

var msgHdlrs = {
    devIncoming: require('./devIncomingHdlr'),
    devLeaving: require('./devLeavingHdlr'),
    devUpdate: require('./devUpdateHdlr'),
    devNotify: require('./devNotifyHdlr'),
    devChange: require('./devChangeHdlr'),
    devStatus: require('./devStatusHdlr')
};

module.exports = msgHdlrs;
