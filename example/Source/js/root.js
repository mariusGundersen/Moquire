define(["component1", "component2"], function(component1, component2){
	return {
		execute: function(){
			return "root." + component1.execute() + "\n" + 
			"root." + component2.execute();
		}
	};
});