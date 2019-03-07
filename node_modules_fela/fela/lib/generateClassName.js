'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateClassName;
var chars = 'abcdefghijklmnopqrstuvwxyz';
var charLength = chars.length;

function generateUniqueClassName(id) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (id <= charLength) {
    return chars[id - 1] + className;
  }

  // Bitwise floor as safari performs much faster
  // https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateUniqueClassName(id / charLength | 0, chars[id % charLength] + className);
}

function generateClassName(getId) {
  var filterClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return true;
  };

  var startId = getId();
  var generatedClassName = generateUniqueClassName(startId);

  if (!filterClassName(generatedClassName)) {
    return generateClassName(getId, filterClassName);
  }

  return generatedClassName;
}