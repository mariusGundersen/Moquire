require.config(moquire.config({
  baseUrl: "/base/tests/modules",
  map: {
      '*': {
          'test': 'module2'
      }
  },
  packages: [
    'pkg'
  ]
}));