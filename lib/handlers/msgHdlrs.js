var msgHdlrs = {
    ready: require('./readyHdlr'),
    devIncoming: require('./devIncomingHdlr'),
    devLeaving: require('./devLeavingHdlr'),
    devUpdate: require('./devUpdateHdlr'),
    devNotify: require('./devNotifyHdlr'),
    devChange: require('./devChangeHdlr'),
    devStatus: require('./devStatusHdlr')
};

module.exports = msgHdlrs;
