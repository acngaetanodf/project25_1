sap.ui.define([
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("customer.project251.controller.View1", {
            onInit: function () {

            },
            onPressCreateProduct: function () {
                this.getRouter().navTo("RouteView2")
            }
        });
    });
