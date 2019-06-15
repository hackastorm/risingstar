({
	initialiseProductLines : function(component) {
		var action = component.get("c.InitialiseProductLines");
        action.setParams({ 
                          ProductWrapperList : component.get("v.prods")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.lineItems", response.getReturnValue());
                component.set("v.initialised", true);
            }
            else{
                $A.get("e.force:closeQuickAction").fire();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type" : "error",
                    "title": "Error!",
                    "message": "Error occured while loading products!"
                });
                toastEvent.fire();  
            }
        });
        $A.enqueueAction(action);
	},
    saveLineItems : function(component, event) {
        var action = component.get("c.StoreLineItems");
        action.setParams({ 
            ParentID : component.get("v.parentId"), 
            LineItemsList : component.get("v.lineItems"), 
            ParentAPIName : component.get("v.parentAPI"),
            ObjectAPIName : component.get("v.objectAPI"),
            ProductAPIName : component.get("v.productAPI"), 
            SalesPriceAPIName : component.get("v.salesPriceAPI"),
            QuantityAPIName : component.get("v.quantityAPI"), 
            DiscountAPIName : component.get("v.discountAPI")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type" : "success",
                    "title": "Success!",
                    "message": "All information is stored successfully!"
                });
                toastEvent.fire();
                
                $A.get('e.force:refreshView').fire();
                
 				component.find("overlayLibDemo1").notifyClose();
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type" : "error",
                    "title": "Error!",
                    "message": "Error occured while storing information. Please contact system admin for more details!"
                });
                toastEvent.fire();           
            }
        });
        $A.enqueueAction(action);
    }
})