({
	handleShowModal : function(component, event, helper) {
		var modalBody;
        $A.createComponent("c:LineItemEditor", {
            	"parentId": component.get("v.recordId"),
                "objectAPI": component.get("v.objectAPI"),
                "parentAPI": component.get("v.parentAPI"),
            	"productAPI": component.get("v.productAPI"),
            	"salesPriceAPI": component.get("v.salesPriceAPI"),
            	"quantityAPI": component.get("v.quantityAPI"),
            	"discountAPI": component.get("v.discountAPI"),
            	"pricebookAPI" : component.get("v.pricebookAPI")
           },
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   component.find('overlayLib').showCustomModal({
                       header: "Line Item Management",
                       body: modalBody,
                       showCloseButton: true,
                       cssClass: "mymodal"
                   })
               }
           });
	}
})