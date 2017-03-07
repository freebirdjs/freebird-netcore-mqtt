'use strict';

var helper = require('../helper.js');

module.exports = function (gad, rawGad, done) {
    // rawGad = { classId, auxId, attrs }
    var gadClassId = helper.getGadClassId(rawGad.classId);

    if (!gadClassId) {
        done(new Error('No matched gadget'));
    } else {
        gad.set('panel', {
            classId: gadClassId,    // string
            profile: ''
        });

        gad.set('attrs', rawGad.attrs);
        // setImmediate(function () {
            done(null, gad);
        // });
    }
};
