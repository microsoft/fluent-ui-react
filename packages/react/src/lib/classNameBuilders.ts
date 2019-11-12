/**
 * Props where only the prop key is used in the className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label tag />
 * <div class="ui tag label"></div>
 */
export const useKeyOnly = (val, key) => val && key

/**
 * Props that require both a key and value to create a className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <MenuItem pointing='end' />
 * <div class="ui-label "></div>
 */
export const useValueAndKey = (val, key) => val && val !== true && `${key}--${val}`
