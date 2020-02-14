import convertCssTimeToNumber from './convertCssTimeToNumber'

const calculateAnimationTimeout = (duration: string, delay: string): number => {
  return convertCssTimeToNumber(duration) + convertCssTimeToNumber(delay)
}

export default calculateAnimationTimeout
