import parseValue from './lib/parseRangeValue'
import { UseKnobOptions } from './types'
import useKnob from './useKnob'

type UseRangeKnobOptions = UseKnobOptions<number | string> & {
  min?: number | string
  max?: number | string
  step?: number | string
  unit?: string
}

const useRangeKnob = (options: UseRangeKnobOptions) => {
  const { initialValue = 3, min = 0, max = parseValue(initialValue), step = 1 } = options
  const unit = `${initialValue}`.replace(`${parseValue(initialValue)}`, '')

  return useKnob<number | string>({
    initialValue,
    min,
    max,
    step,
    unit,
    type: 'range',
    ...options,
  })
}

export default useRangeKnob
