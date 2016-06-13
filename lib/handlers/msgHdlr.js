var msgHdlrs = {
    devIncoming: require('./handlers/devIncomingHdlr'),
    devLeaving: require('./handlers/devLeavingHdlr'),
    devUpdate: require('./handlers/devUpdateHdlr'),
    devNotify: require('./handlers/devNotifyHdlr'),
    devChange: require('./handlers/devChangeHdlr'),
    devStatus: require('./handlers/devStatusHdlr')
};

module.exports = msgHdlrs;
