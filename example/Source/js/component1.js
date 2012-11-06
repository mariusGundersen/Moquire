define(["commonLib"], function(commonLib){
	return {
		execute: function(){
			return "component1." + commonLib.execute();
		}
	}
});