import { Accessibility } from '../../types'

/**
 * @description
 * Video can have both audio and visual aspects
 *
 * @specification
 * Adds 'role' presentation
 */

const videoBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
})

export default videoBehavior
