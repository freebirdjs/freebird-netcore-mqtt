var devDrivers = {
    controller: null
};

module.exports = function (controller) {
    devDrivers.controller = controller;
    devDrivers.read = read.bind(controller);
    devDrivers.write = write.bind(controller);
    devDrivers.identify = identify.bind(controller);
    return devDrivers;
};
