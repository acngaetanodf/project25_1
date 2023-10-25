sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox"
], function(Controller, History, UIComponent, MessageBox) {
	"use strict";

	return Controller.extend("customer.project251.controller.BaseController", {

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function (sDefaultRoute) {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo(sDefaultRoute, {}, true /*no history*/);
			}
		},

		// Check if the string is empty or contains white spaces
		isEmptyOrWhiteSpace: function (/** @type {String} */ str) {
			return (str.match(/^\s*$/) || []).length > 0;
		},

		getServiceUrl: function () {
			return this.getOwnerComponent().getModel().sServiceUrl;
		},

		postMyOdata: function (sEntity, oData) {
			// @ts-ignore
			var jurl = this.getServiceUrl() + sEntity;
			// @ts-ignore
			return new Promise(
				function (/** @type {Object} */ resolve) {
					// @ts-ignore
					$.ajax({
						method: "POST",
						url: jurl,
						data: JSON.stringify(oData),
						contentType:"application/json",
						async: false,
					}).done(function (/** @type {Object} */ data) {
						resolve(data);
					}).fail(function (/** @type {{ responseText: any; }} */ jqXHR, /** @type {any} */ textStatus) {
						MessageBox.error(jqXHR.responseText);
					});
				});
		},

	});

});