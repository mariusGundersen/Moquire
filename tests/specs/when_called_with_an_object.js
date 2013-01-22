describe("when called with an object", function(){

	describe("when the object has a 'key':function(){} entry", function(){
		new AsyncSpec(this).it("should replace the requested module", function(done){
			moquire({
				"module1": function(){
					return {name:"mock"};
				}
			}, ["module1"], function(module1){
				expect(module1.name).toBe("mock");
				done();
			});
		});
		
		new AsyncSpec(this).it("should replace nested modules", function(done){
			moquire({
				"module1": function(){
					return {name:"mock"};
				}
			}, ["module2"], function(module2){
				expect(module2.module1.name).toBe("mock");
				done()
			});
		});
	
	});
	
	describe("when the object has a 'key':'value' entry ", function(){
		new AsyncSpec(this).it("should load the value file as a mock", function(done){
			moquire({
				"module1" : "mock1"
			}, ["module2"], function(module2){
				expect(module2.module1.name).toBe("mock1");
				done();
			});
		});
	});
});