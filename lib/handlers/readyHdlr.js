module.exports = function (netcore) {
    // listen shepherd event: 'SYS_READY'
    netcore.commitReady();  // netcore.enable() inside netcore
};
