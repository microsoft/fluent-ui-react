'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = enhance;

var _arrayReduce = require('fast-loops/lib/arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function enhance() {
  for (var _len = arguments.length, enhancers = Array(_len), _key = 0; _key < _len; _key++) {
    enhancers[_key] = arguments[_key];
  }

  return function (createRenderer) {
    return function (config) {
      return (0, _arrayReduce2.default)(enhancers, function (enhancedRenderer, enhancer) {
        enhancedRenderer = enhancer(enhancedRenderer);
        return enhancedRenderer;
      }, createRenderer(config));
    };
  };
}