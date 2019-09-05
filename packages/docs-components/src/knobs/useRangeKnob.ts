import parseValue from './lib/parseRangeValue'
import { UseKnobOptions } from './types'
import useKnob from './useKnob'

type UseRangeKnobSpecificOptions = {
  min?: number | string
  max?: number | string
  step?: number | string
  unit?: string
}
type UseRangeKnobOptions = UseKnobOptions<number | string> & UseRangeKnobSpecificOptions

const useRangeKnob = (options: UseRangeKnobOptions) => {
  const { initialValue = 3, min = 0, max = parseValue(initialValue), step = 1, ...rest } = options
  const unit = `${initialValue}`.replace(`${parseValue(initialValue)}`, '')

  return useKnob<number | string, Required<UseRangeKnobSpecificOptions>>({
    initialValue,
    unit,
    min: parseValue(min),
    max: parseValue(max),
    step: parseValue(step),
    type: 'range',
    ...rest,
  })
}

export default useRangeKnob
