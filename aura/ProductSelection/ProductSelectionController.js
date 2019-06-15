({
	doInit : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Product Name', fieldName: 'productName', type: 'text'},
            {label: 'Product Code', fieldName: 'productCode', type: 'text'},
            {label: 'List Price', fieldName: 'price', type: 'currency'},
            {label: 'Product Description', fieldName: 'description', type: 'text'},
            {label: 'Product Family', fieldName: 'family', type: 'text'},
        ]);
        
       
	},
    close : function(component){
        component.find("overlayLibDemo1").notifyClose();
    },
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "LOADED") {
             helper.fetchProducts(component);
        }
    },
    next : function(component, event, helper) {
        let lines = component.find('productTable').getSelectedRows();

        var StepEmitter = component.getEvent("stepEmitter");
        StepEmitter.setParams({ "step" : 2,
        "data" : lines});
        StepEmitter.fire();
    }
})