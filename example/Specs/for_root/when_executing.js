require(["root"], function(root){
	describe("when executing", function(){
		
		it("should give the correct result", function(){
			expect(root.execute()).toBe("root.component1.commonLib\nroot.component2.commonLib");
		});
		
	});
});