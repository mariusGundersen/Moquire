describe("when using packages", function(){
  
  var package;
  
  new AsyncSpec(this).beforeEach(function(done){
    moquire({}, ['pkg'], function(pkg){
      package = pkg;
      done();
    });
  });
  
  it("should not mess with the packages array in the config", function(){
    expect(package).toBe('package');
  });
});