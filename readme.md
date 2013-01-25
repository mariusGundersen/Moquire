#Moquire#

##mock the dependencies of AMD modules when testing##

This is a simple JavaScript project for mocking AMD modules, which is useful when testing the functionality and behaviour of individual modules.
Moquire is designed to work like the require method provided by [require.js](http://www.requirejs.org/), taking an optional first argument which is an object of mocked modules.

Below are some example use cases. Have a look at the example directory on how to set everything up to work for a large project.

###Function exactly the same as require###

The following shows how to use moquire as a drop in replacement for require. 

```javascript
moquire(["dependency1", "dependency2"], function(dep1, dep2){
  //do something with dep1 and dep2
});
```

###Replace dependency with custom module###

Simple modules which don't have any dependencies can be mocked inline:

```javascript
//This module abstracts away the ajaxLib from the main application
define("backend", ["ajaxLib"], function(ajaxLib){
  return{
    sendToServer: function(data, callback){
      return ajaxLib.post("/ajax/postData", data, callback);
    }
  };
});

//This module lets you increment a value and send the result to the server
define("businessLogic1", ["backend"], function(backend){
  return {
    value: 0,
    incrementValue: function(){
      this.value++;
      //it uses the backend module to send data to the server
      backend.sendToServer(this.value+1, function(){
        console.log("success");
      });
    }
  };
});

moquire({
  //define a mock of backend which doesn't contact the server 
  //(no need to contact the server during desting)
  "backend":function(){
    return {
      sendToServer: function(data, callback){
        callback({success: true});
        return true;
      }
    };
  }
},["businessLogic"], function(businessLogic){
  //businessLogic has a dependency to backend, which has now been replaced
  //with the mock object defined above. 
});
```


###Replace dependency with another module###

You can place the mock module in another file, and require will find it for you

```javascript
//This could be in another file, named backendMock.js
define("backendMock", [], function(){
  return{
    sendToServer: function(data, callback){
      callback({success: true});
      return true;
    }
  };
});

moquire({ "backend":"backendMock"},["businessLogic"], function(businessLogic){
  //businessLogic has a dependency to backend, which has now been replaced
  //with backendMock.
});
```

###Replace dependency for only some objects###

You can place the mock module in another file, and require will find it for you

```javascript
moquire({
  "businessLogic1": {
    "backend":"backendMock"
  }
},["businessLogic1", "businessLogic2"], function(businessLogic1, businessLogic2){
  //Only businessLogic1 will have it's backend module replaced with backendMock. 
  //businessLogic2 will have the original backend module
});
```
