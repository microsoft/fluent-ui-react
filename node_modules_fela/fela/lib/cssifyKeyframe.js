'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyKeyframe;

var _arrayReduce = require('fast-loops/lib/arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

var _objectReduce = require('fast-loops/lib/objectReduce');

var _objectReduce2 = _interopRequireDefault(_objectReduce);

var _cssifyObject = require('css-in-js-utils/lib/cssifyObject');

var _cssifyObject2 = _interopRequireDefault(_cssifyObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssifyKeyframe(frames, animationName) {
  var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];

  var keyframe = (0, _objectReduce2.default)(frames, function (css, frame, percentage) {
    return '' + css + percentage + '{' + (0, _cssifyObject2.default)(frame) + '}';
  }, '');

  return (0, _arrayReduce2.default)(prefixes, function (cssKeyframe, prefix) {
    return cssKeyframe + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
  }, '');
}