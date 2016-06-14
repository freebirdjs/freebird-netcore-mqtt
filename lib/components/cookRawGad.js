var helper = require('../helper.js');

module.export = function (gad, rawGad, cb) {
    // rawGad = { classId, auxId, attrs }
    var gadClassId = helper.getGadClassId(rawGad.classId);

    if (!gadClassId) {
        cb(new Error('No matched gadget'));
    } else {
        gad.setPanelInfo({
            profile: 'none',
            classId: gadClassId
        });

        gad.setAttrs(rawGad.attrs);
        cb(null, gad);
    }
};

