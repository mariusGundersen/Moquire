moquire({'commonLib':'Moq/commonMoq1'}, ["component1"], function(component1){
	describe("when executing component1", function(){
		
		it("should give the correct result", function(){
			expect(component1.execute()).toBe("component1.commonMoq1");
		});
		
	});
});