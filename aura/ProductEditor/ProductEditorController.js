({
    productInitializer : function(component, event, helper) {
		let products = component.get("v.prods");
        if(products.length > 0 && !component.get("v.initialised"))
            helper.initialiseProductLines(component);
        	
	},
    close : function(component){
        component.find("overlayLibDemo1").notifyClose();
    },
    save : function(component, event, helper) {
        helper.saveLineItems(component, event);
	},
    back : function(component, event, helper) {
        var StepEmitter = component.getEvent("stepEmitter");
        StepEmitter.setParams({ "step" : 1 });
        StepEmitter.fire();
	}
})