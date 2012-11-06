define(["commonLib"], function(commonLib){
	return {
		execute: function(){
			return "component2." + commonLib.execute();
		}
	}
});