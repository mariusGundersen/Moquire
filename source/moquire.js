var moquire = (function(require){

  var whenDone = function(){};
  var requirementsRemaining = 0;
  var requirementsLoaded = 0;
  var requireConfig = {};
  var contextCounter = 0;
  var contextCreatedEventListeners = [];
  
  
  function createContextName(){
    return "$__MoquireContext" + (contextCounter++) + "__$";
  }
  
  var moduleCounter = 0;
  function createModuleName(){
    return "$__MoquireModule" + (moduleCounter++) + "__$";
  }
  
  function typeOf(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  }
  
  function typeOfArray(array){
    return Array.prototype.map.call(array, typeOf);
  }
  
  function testArguments(args, expectedTypes){
    if(args.length != expectedTypes.length){
      return false;
    }
    var givenTypes = typeOfArray(args);
    
    return expectedTypes.every(function(expectedType, i){
      return expectedType == givenTypes[i];
    });
  }


  function cloneObjectInto(b, a){
    for(var prop in b){
      if (typeof b[prop] === 'object') {
        a[prop] = a[prop] !== undefined ? a[prop] : {};
        cloneObjectInto(b[prop], a[prop]);
      } else {
        a[prop] = b[prop];
      }
    }
  }
  
  function extendConfig(source, name, map){
    var target = {};  
    cloneObjectInto(source, target);
    cloneObjectInto({map:map}, target);
    cloneObjectInto({context:name}, target);
    return target;
  }

  function createRequireContext(config, then){
    var requireContext = moquire.require.config(config);
    var doneContextCreatedEventListeners = 0;

    function done(){
      doneContextCreatedEventListeners++;
      if(doneContextCreatedEventListeners === contextCreatedEventListeners.length){
        then(requireContext);
      }
    }
    if(contextCreatedEventListeners.length == 0){
      then(requireContext);
    }else{
      contextCreatedEventListeners.forEach(function(listener){
        listener(requireContext, done);
      });
    }
  }
  
  function createModule(replacement, original, factory){
    define(replacement, [original], factory);
  }

  function addReplacementToMap(map, scope, original, replacement){
    map[scope] = map[scope] || {};
    map[scope][original] = replacement;
    map[replacement] = {};
    map[replacement][original] = original;
    map[replacement]["__mocked__"] = original;
  }
  
  function createMap(inputMap, outputMap, scope){
    outputMap = outputMap || {};
    scope = scope || '*';
    for(var original in inputMap){
      var replacement = inputMap[original];
      if(typeof replacement === "function"){
        var replacementName = createModuleName();
        createModule(replacementName, original, replacement);
        addReplacementToMap(outputMap, scope, original, replacementName);
      } else if (typeof replacement === "object"){
        createMap(replacement, outputMap, original);
      } else {
        addReplacementToMap(outputMap, scope, original, replacement);
      }
    }
    return outputMap;
  }

  function requirementLoaded(){
    requirementsLoaded++;
    if(requirementsLoaded == requirementsRemaining && typeof whenDone == "function"){
      whenDone();
    }
  }

  function callRequire(method, dependencies, factory){
    requirementsRemaining++;
    method(dependencies, function(){
      factory.apply(this, arguments);
      requirementLoaded();
    });
  }
  
  function requireWithMap(map, dependencies, factory){
    var config = extendConfig(requireConfig, createContextName(), createMap(map));

    createRequireContext(config, function(mappedRequire){
      callRequire(mappedRequire, dependencies, factory);
    });
  }
  
  function requireWithoutMap(dependencies, factory){
    callRequire(moquire.require, dependencies, factory);
  }
  
  function moquire(arg0, arg1, arg2){
    
    if(testArguments(arguments, ["array", "function"])){
      requireWithoutMap(arg0, arg1);
    }else if(testArguments(arguments, ["object", "array", "function"])){
      requireWithMap(arg0, arg1, arg2);
    }else{
      throw new Error("could not moquire\n" + 
      "Invalid argument types (" + typeOfArray(arguments).join(", ") + ")\n" + 
      "expected (array, function) or (object, array, function)");
    }
  }
  
  moquire.config = function(config){
    requireConfig = config;
    return config;
  };

  moquire.then = function(callback){
    if(requirementsRemaining != 0 && requirementsRemaining == requirementsLoaded){
      callback();
    }else{
      whenDone = callback;
    }
  }
  
  moquire.onContextCreated = function(listener){
    contextCreatedEventListeners.push(listener);
  };

  moquire.onContextCreated.dont = function(listener){
    var index = contextCreatedEventListeners.indexOf(listener);

    if(index >= 0){
      contextCreatedEventListeners.splice(index, 1);
    }
  };

  moquire.require = require;
  
  return moquire;

})(require);