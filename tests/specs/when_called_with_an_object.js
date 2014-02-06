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

		new AsyncSpec(this).it("should pass the original module to the mock", function(done){
			moquire({
				"module1": function(original){
					return {name:original.name+"mock1"};
				}
			}, ["module1"], function(module1){
				expect(module1.name).toBe("module1mock1");
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

		new AsyncSpec(this).it("should pass the original module to the mock", function(done){
			moquire({
				"module1": function(original){
					return {name:original.name+"mock1"};
				}
			}, ["module2"], function(module2){
				expect(module2.module1.name).toBe("module1mock1");
				done();
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

		new AsyncSpec(this).it("should pass the original module to the mock when the original name is used", function(done){
			moquire({
				"module1": "mock2"
			}, ["module2"], function(module2){
				expect(module2.module1.name).toBe("module1mock2");
				done();
			});
		});

		new AsyncSpec(this).it("should pass the original module to the mock when the __mocked__ name is used", function(done){
			moquire({
				"module1": "mock3"
			}, ["module2"], function(module2){
				expect(module2.module1.name).toBe("module1mock3");
				done();
			});
		});
	});
});