module.exports = function (netcore, permAddr) {
    // listen shepherd event: 'DEV_LEAVING'
    netcore.commitDevLeaving(permAddr);
};
