module.exports = function (netcore, permAddr) {
    // listen shepherd event: 'DEV_LEAVING'
    // permAddr has been built in netcore-mqtt ind handler
    netcore.commitDevLeaving(permAddr);
};
