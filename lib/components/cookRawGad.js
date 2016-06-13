var helper = require('../helper.js');

module.export = function (gad, rawGad, cb) {
    var oid = Object.keys(rawGad)[0],
        gadClassId = helper.getGadClassId(oid);

    if (!gadClassId) {
        cb(new Error('No matched gadget'));
    } else {
        gad.setPanelInfo({
            profile: 'none',
            classId: gadClassId
        });

        gad.setAttrs(rawGad[gadId]);
        cb(null, gad);
    }
};
