describe("when called with only two arguments", function(){
	
	describe("when called with no requirements", function(){
		new AsyncSpec(this).it("should work like requrie", function(done){
			moquire([], function(){
				expect(true).toBe(true);
				done();
			});
		});
	});
	
	describe("when called with a module requirement", function(){
		new AsyncSpec(this).it("should load a single module", function(done){
			moquire(["module1"], function(module1){
				expect(module1.name).toBe("module1");
				done();
			});
		});
	});
	
	describe("when called with two modules", function(){
		new AsyncSpec(this).it("should load both modules", function(done){
			moquire(["module1", "module2"], function(module1, module2){
				expect(module1.name).toBe("module1");
				expect(module2.name).toBe("module2");
				done();
			});
		});
	});

	describe("when called with a module with a requirement", function(){
		new AsyncSpec(this).it("should recursively load modules", function(done){
			moquire(["module2"], function(module2){
				expect(module2.module1.name).toBe("module1");
				done();
			});
		});
	});

	describe("when requesting a module in the config map", function(){
		new AsyncSpec(this).it("should return the mapped module", function(done){
			moquire(["test"], function(test){
				expect(test.module1.name).toBe("module1");
				done();
			});
		});
	});
	
});