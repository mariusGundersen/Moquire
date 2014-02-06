describe("when moquire.then is passed a callback", function(){

	var requireSpy,
		factorySpy;

	beforeEach(function(){
		requireSpy = sinon.stub(moquire, "require"); 
		factorySpy = sinon.spy();
	});

	afterEach(function(){
		requireSpy.restore();
	});
	
	describe("before the modules are done loading", function(){
		new AsyncSpec(this).it("should call the callback after the modules are done loading", function(done){
			moquire(["module1"], function(module1){
				factorySpy();
			});
			moquire(["module2"], function(module2){
				factorySpy();
			});
			expect(requireSpy.callCount).toBe(2);

			moquire.then(function(){
				expect(factorySpy.callCount).toBe(2);
				done();
			});

			requireSpy.getCall(0).args[1]();
			requireSpy.getCall(1).args[1]();
		});
	
	});
	
	describe("after the modules are done loading", function(){
		it("should call the callback right away", function(){
			moquire(["module1"], function(module1){
				factorySpy();
			});
			moquire(["module2"], function(module2){
				factorySpy();
			});
			expect(requireSpy.callCount).toBe(2);

			requireSpy.getCall(0).args[1]();
			requireSpy.getCall(1).args[1]();

			moquire.then(function(){
				expect(factorySpy.callCount).toBe(2);
			});
		});
	
	});
});