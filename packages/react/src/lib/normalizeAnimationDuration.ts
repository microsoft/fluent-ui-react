/**
 * Normalizes the duration of an animation.
 * @param {number|object} duration The value to normalize.
 * @param {'hide'|'show'} type The type of animation.
 * @returns {number}
 */
export default (duration, type) =>
  typeof duration === 'number' || typeof duration === 'string' ? duration : duration[type]
