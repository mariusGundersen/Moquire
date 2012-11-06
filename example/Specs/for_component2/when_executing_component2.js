moquire(
	{'commonLib': function(){
		return {
			execute: function(){
				return "commonFactoryMoq2";
			}
		};
	}}, 
	["component2"], function(component1){
		describe("when executing component2", function(){
			
			it("should give the correct result", function(){
				expect(component1.execute()).toBe("component2.commonFactoryMoq2");
			});
			
		});
	}
);