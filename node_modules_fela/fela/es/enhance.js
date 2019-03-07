import arrayReduce from 'fast-loops/lib/arrayReduce';

export default function enhance() {
  for (var _len = arguments.length, enhancers = Array(_len), _key = 0; _key < _len; _key++) {
    enhancers[_key] = arguments[_key];
  }

  return function (createRenderer) {
    return function (config) {
      return arrayReduce(enhancers, function (enhancedRenderer, enhancer) {
        enhancedRenderer = enhancer(enhancedRenderer);
        return enhancedRenderer;
      }, createRenderer(config));
    };
  };
}