describe("when called with two levels of objects", function(){

	/*
	*All modules requirering module1 should get mock1 instead
	*/
	describe("when the root object has a '*' name", function(){
		new AsyncSpec(this).it("should replace the requested module for all modules", function(done){
			moquire({
				"*": {
					"module1": "mock1"
				}
			}, ["module1", "module2", "module3"], function(module1, module2, module3){
				expect(module1.name).toBe("mock1");
				expect(module2.name).toBe("module2");
				expect(module2.module1.name).toBe("mock1");
				expect(module3.name).toBe("module3");
				expect(module3.module1.name).toBe("mock1");
				done();
			});
		});

		new AsyncSpec(this).it("should pass the original to the mock when the original name is used", function(done){
			moquire({
				"*": {
					"module1": "mock2"
				}
			}, ["module1", "module2", "module3"], function(module1, module2, module3){
				expect(module1.name).toBe("module1mock2");
				expect(module2.name).toBe("module2");
				expect(module2.module1.name).toBe("module1mock2");
				expect(module3.name).toBe("module3");
				expect(module3.module1.name).toBe("module1mock2");
				done();
			});
		});

		new AsyncSpec(this).it("should pass the original to the mock when the __mocked__ name is used", function(done){
			moquire({
				"*": {
					"module1": "mock3"
				}
			}, ["module1", "module2", "module3"], function(module1, module2, module3){
				expect(module1.name).toBe("module1mock3");
				expect(module2.name).toBe("module2");
				expect(module2.module1.name).toBe("module1mock3");
				expect(module3.name).toBe("module3");
				expect(module3.module1.name).toBe("module1mock3");
				done();
			});
		});
	
	});
	
	/*
	*Only module2 should have its module1 replace with mock1. Module3 should not have its module1 replaced
	*/
	describe("when the root object has a 'key' name", function(){
		new AsyncSpec(this).it("should replace the requested module only for modules with the correct name", function(done){
			moquire({
				"module2": {
					"module1" : "mock1"
				}
			}, ["module2", "module3"], function(module2, module3){
				expect(module2.name).toBe("module2");
				expect(module2.module1.name).toBe("mock1");
				expect(module3.name).toBe("module3");
				expect(module3.module1.name).toBe("module1");
				done();
			});
		});

		new AsyncSpec(this).it("should pass the original to the mock when the original name is used", function(done){
			moquire({
				"module2": {
					"module1" : "mock2"
				}
			}, ["module2", "module3"], function(module2, module3){
				expect(module2.name).toBe("module2");
				expect(module2.module1.name).toBe("module1mock2");
				expect(module3.name).toBe("module3");
				expect(module3.module1.name).toBe("module1");
				done();
			});
		});

		new AsyncSpec(this).it("should pass the original to the mock when the __mocked_ name is used", function(done){
			moquire({
				"module2": {
					"module1" : "mock3"
				}
			}, ["module2", "module3"], function(module2, module3){
				expect(module2.name).toBe("module2");
				expect(module2.module1.name).toBe("module1mock3");
				expect(module3.name).toBe("module3");
				expect(module3.module1.name).toBe("module1");
				done();
			});
		});
	});
});