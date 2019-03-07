import arrayReduce from 'fast-loops/lib/arrayReduce';
import objectReduce from 'fast-loops/lib/objectReduce';
import cssifyObject from 'css-in-js-utils/lib/cssifyObject';

export default function cssifyKeyframe(frames, animationName) {
  var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];

  var keyframe = objectReduce(frames, function (css, frame, percentage) {
    return '' + css + percentage + '{' + cssifyObject(frame) + '}';
  }, '');

  return arrayReduce(prefixes, function (cssKeyframe, prefix) {
    return cssKeyframe + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
  }, '');
}