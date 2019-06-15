({
	handleComponentEvent : function(component, event, helper) {
        component.set("v.step", event.getParam("step"));
        component.set("v.products", event.getParam("data"));
	}
})