By default, **freebird-netcore-mqtt** is designed for freebird framework, but you can use it as a standalone network manager.
If you decide to do this, you have to deal with the instances of Device and Gadget on your own. For example, use an array to manage all these instance. It is suggested to use this module with freebird, since it has prepared devices and gadgets management and persistance for you. If you just don't want to use freebird, then there is another oppertunity for you to use **LWMQN** solution.

Anyway, if you do really use this module as a standalone one, you have to implements the following message handlers on your own.

```js

mqttCore.onError = function (err) {
    // your implementation
};

mqttCore.onReady = function () {
    // your implementation
};

mqttCore.onEnabled = function () {
    // your implementation
};

mqttCore.onPermitJoin = function () {
    // your implementation
};

mqttCore.onDevIncoming = function () {
    // your implementation
};

mqttCore.onDevLeaving = function () {
    // your implementation
};

mqttCore.onDevReporting = function () {
    // your implementation
};

mqttCore.onDevNetChanging = function () {
    // your implementation
};

mqttCore.onGadIncoming = function () {
    // your implementation
};

mqttCore.onGadReporting = function () {
    // your implementation
};

mqttCore.onBannedDevIncoming = function () {
    // your implementation
};

mqttCore.onBannedDevReporting = function () {
    // your implementation
};

mqttCore.onBannedGadIncoming = function () {
    // your implementation
};

mqttCore.onBannedGadReporting = function () {
    // your implementation
};

mqttCore.onDevError = function () {
    // your implementation
};

mqttCore.onDevNetChanged = function () {
    // your implementation
};

mqttCore.onDevPropsChanged = function () {
    // your implementation
};

mqttCore.onDevAttrsChanged = function () {
    // your implementation
};

mqttCore.onGadError = function () {
    // your implementation
};

mqttCore.onGadPanelChanged = function () {
    // your implementation
};

mqttCore.onGadPropsChanged = function () {
    // your implementation
};

mqttCore.onGadAttrsChanged = function () {
    // your implementation
};

```
