var msgHdlrs = {
    devIncomingHdlr: require('./handlers/devIncomingHdlr'),
    devLeavingHdlr: require('./handlers/devLeavingHdlr'),
    devUpdateHdlr: require('./handlers/devUpdateHdlr'),
    devNotifyHdlr: require('./handlers/devNotifyHdlr'),
    devChangeHdlr: require('./handlers/devChangeHdlr'),
    devStatusHdlr: require('./handlers/devStatusHdlr')
};

module.exports = msgHdlrs;