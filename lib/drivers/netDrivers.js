var netDrivers = {
    controller: null
};

module.exports = function (controller) {
    netDrivers.controller = controller;
    netDrivers.start = start.bind(controller);
    netDrivers.stop = stop.bind(controller);
    netDrivers.reset = reset.bind(controller);
    netDrivers.remove = remove.bind(controller);
    netDrivers.ban = ban.bind(controller);
    netDrivers.unban = unban.bind(controller);
    netDrivers.ping = ping.bind(controller);

    return netDrivers;
};
