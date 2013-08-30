describe("when creating a new context", function(){

	var contextCreatedSpy;

	beforeEach(function(){
		contextCreatedSpy = sinon.spy(function(require, done){
			setTimeout(done, 1);
		});

		moquire.onContextCreated(contextCreatedSpy);
	});

	afterEach(function(){
		moquire.onContextCreated.dont(contextCreatedSpy);
	});

	new AsyncSpec(this).it("should call the onContextCreated function with two arguments", function(done){

		moquire({
			"module1": function(){}
		}, ["module1"], function(module1){
			done();
		});
		expect(contextCreatedSpy.firstCall.args.length).toBe(2);
	});

	new AsyncSpec(this).it("should call the onContextCreated function", function(done){

		moquire({
			"module1": function(){}
		}, ["module1"], function(module1){
			done();
		});
		expect(contextCreatedSpy.callCount).toBe(1);
	});

	new AsyncSpec(this).it("should not call the moquire factory until the onContextCreated done method is called", function(done){

		var factorySpy = sinon.spy(function(){
			done();
		});

		moquire({
			"module1": function(){}
		}, ["module1"], factorySpy);

		expect(contextCreatedSpy.calledBefore(factorySpy)).toBe(true);
	});

	new AsyncSpec(this).it("should not call the onContextCreated listeners when no mocks are needed", function(done){


		moquire(["module1"], function(){
			done();
		});

		expect(contextCreatedSpy.callCount).toBe(0);
	});
});