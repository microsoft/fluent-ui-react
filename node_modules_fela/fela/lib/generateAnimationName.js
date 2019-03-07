'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateAnimationName;
function generateAnimationName(id) {
  var rendererId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return rendererId + 'k' + id;
}