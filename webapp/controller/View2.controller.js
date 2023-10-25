sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("customer.project251.controller.View2", {
            onInit: function () {
                var oRouter = this.getRouter();
                oRouter.getRoute("RouteView2").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
                /*
                //senza modello
                this.getView().byId("inputProductID").setValue("");
                this.getView().byId("inputProductName").setValue("");
                this.getView().byId("inputQuantityPerUnit").setValue("");
                this.getView().byId("inputUnitPrice").setValue("");
                */
                //con modello
                var oNewProduct = {
                    ProductID: "",
                    ProductName: "",
                    QuantityPerUnit: "",
                    UnitPrice: ""
                };
                this.getView().setModel(new JSONModel(oNewProduct), "NewProduct");
            },
            handleSavePress: async function (oEvent) {
                /*
                //senza modello
                var oData ={};
                oData.ProductID = this.getView().byId("inputProductID").getValue();
                oData.ProductName = this.getView().byId("inputProductName").getValue();
                oData.QuantityPerUnit = this.getView().byId("inputQuantityPerUnit").getValue();
                oData.UnitPrice = this.getView().byId("inputUnitPrice").getValue();
                */

                const oData = this.getView().getModel("NewProduct").getData();
                if (oData.ProductID.length !== 0) {
                    oData.ProductID = parseInt(oData.ProductID);
                    const oResult = await this.postMyOdata("Products", oData);
                    if (oResult) {
                        //prodotto aggiunto
                        MessageBox.success(
                            "Product: " + oResult.ProductID + " ('" + oResult.ProductName + "') created.", {
                            actions: [MessageBox.Action.OK],
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: function (oAction) {
                                this.onNavBack("RouteView1");
                            }.bind(this)
                        }
                        );
                    }
                } else {
                    MessageBox.error("Insert 'ProductID'");
                }

            },

        });
    });
