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
                var oRouter = this.getRouter();
                oRouter.getRoute("RouteView1").attachMatched(this._onRouteMatched, this);
            },
            onPressCreateProduct: function () {
                this.getRouter().navTo("RouteView2")
            },
            _onRouteMatched: function (oEvent){
                this.getView().getModel().refresh();
            }
        });
    });
