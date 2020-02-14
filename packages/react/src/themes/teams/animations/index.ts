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
    fillMode: 'backwards',
  },
  'carousel-slide-to-next-exit': {
    ...slideAnimations.slideLeftExitMedium,
    fillMode: 'backwards',
  },
  'carousel-slide-to-previous-enter': {
    ...slideAnimations.slideRightEnterMedium,
    fillMode: 'backwards',
  },
  'carousel-slide-to-previous-exit': {
    ...slideAnimations.slideRightExitMedium,
    delay: slideAnimations.slideRightEnterMedium.duration,
    fillMode: 'backwards',
  },
}
