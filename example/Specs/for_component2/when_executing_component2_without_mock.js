moquire(["component2"], function(component1){
	describe("when executing component2 without mock", function(){
		
		it("should give the correct result", function(){
			expect(component1.execute()).toBe("component2.commonLib");
		});
		
	});
});