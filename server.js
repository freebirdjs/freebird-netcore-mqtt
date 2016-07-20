var netcore = require('./index.js')();

var shepherd = netcore._controller;

netcore.start(function (err, res) {
    console.log('started');
    if (err) console.log(err);
    netcore.permitJoin(180, function () {
        console.log('permiJoin');
    });
});

netcore.onReady = function () {
    console.log('server ready11');
};

netcore.onDevIncoming = function (dev) {
    console.log(dev);
};

netcore.onDevIncoming = function (dev) {
    console.log(dev);
};

// shepherd.on('ready', function () {
//     console.log('shepherd ready');
//     //setTimeout(function () {
//         shepherd.permitJoin(20);
//     //}, 2000);
//     //console.log(shepherd);
//     shepherd.on('priphDisconnected', function (c) {
//         console.log('some one disconnected');
//         console.log(c.id);
//         // var n = shepherd.find(c.id);
//         // console.log(n.status);
//     });
// });

// shepherd.on('ind:status', function (qnode, status) {
//     console.log('ind:status');
//     console.log(qnode.status);
//     console.log(status);
// });

