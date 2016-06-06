var gadDrivers = {
    controller: null
};

module.exports = function (controller) {
    netDrivers.controller = controller;
    netDrivers.read = read.bind(controller);
    netDrivers.write = write.bind(controller);
    netDrivers.exec = exec.bind(controller);
    netDrivers.setReportCfg = setReportCfg.bind(controller);
    netDrivers.getReportCfg = getReportCfg.bind(controller);

    return gadDrivers;
};
