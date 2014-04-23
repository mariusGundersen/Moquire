module.exports = function(config){
  config.set({
  
    files: [
      'tests/libs/*.js',
      'source/*.js',
      'tests/main.js',
      'tests/specs/*.js',
      {pattern: 'tests/modules/**/*.js', included: false}
    ],

    frameworks: [
      'jasmine'
    ],
    
    exclude: [

    ],
    
    reporters: [
      'dots'
    ],

    autoWatch: true

  });
};