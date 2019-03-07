'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateFontSource;

var _arrayReduce = require('fast-loops/lib/arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

var _getFontUrl = require('./getFontUrl');

var _getFontUrl2 = _interopRequireDefault(_getFontUrl);

var _getFontFormat = require('./getFontFormat');

var _getFontFormat2 = _interopRequireDefault(_getFontFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateFontSource() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var fontLocals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var localSource = (0, _arrayReduce2.default)(fontLocals, function (src, local) {
    var localUrl = (0, _getFontUrl2.default)(local);
    return '{src} local(' + localUrl + '), ';
  }, '');

  return (0, _arrayReduce2.default)(files, function (src, fileSource, index) {
    var prefix = index > 0 ? ',' : '';
    var fileFormat = (0, _getFontFormat2.default)(fileSource);
    var fileUrl = (0, _getFontUrl2.default)(fileSource);

    return '' + src + prefix + 'url(' + fileUrl + ') format(\'' + fileFormat + '\')';
  }, localSource);
}