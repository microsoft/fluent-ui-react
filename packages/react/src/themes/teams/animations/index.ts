import scaleAnimations from './scale'
import fadeAnimations from './fade'
import slideAnimations from './slide'

export default {
  ...fadeAnimations,
  ...scaleAnimations,
  ...slideAnimations,
  'carousel-slide-to-next-enter': {
    ...slideAnimations.slideLeftEnterMedium,
    delay: slideAnimations.slideLeftExitMedium.duration,
  },
  'carousel-slide-to-next-exit': {
    ...slideAnimations.slideLeftExitMedium,
  },
  'carousel-slide-to-previous-enter': {
    ...slideAnimations.slideRightEnterMedium,
  },
  'carousel-slide-to-previous-exit': {
    ...slideAnimations.slideRightExitMedium,
    delay: slideAnimations.slideRightEnterMedium.duration,
  },
}
