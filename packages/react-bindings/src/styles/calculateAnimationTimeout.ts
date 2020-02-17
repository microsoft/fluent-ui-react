import convertCssTimeToNumber from './convertCssTimeToNumber'
import * as _ from 'lodash'

const calculateAnimationTimeout = (duration: string, delay: string | undefined): number => {
  if(_.isNil(duration) || duration === 'inherit' || duration === 'initial') return 0
  if(!_.isNil(delay) && (delay === 'inherit' || delay === 'initial')) return 0
  return convertCssTimeToNumber(duration) + convertCssTimeToNumber(delay || '')
}

export default calculateAnimationTimeout
