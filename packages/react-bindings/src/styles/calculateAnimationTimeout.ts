import convertCssTimeToNumber from './convertCssTimeToNumber'

const calculateAnimationTimeout = (duration: string, delay: string): number => {
  console.log("duration " + duration)
  console.log("delay " + delay)
  const result = convertCssTimeToNumber(duration) + convertCssTimeToNumber(delay)
  console.log("duration in num " + convertCssTimeToNumber(duration))
  console.log("delay in num " + convertCssTimeToNumber(delay))
  console.log("result "+ result)
  return result
}

export default calculateAnimationTimeout
