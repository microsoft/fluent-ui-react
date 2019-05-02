import { UseKnobOptions } from './types'
import useKnob from './useKnob'

const useRangeKnob = (options: UseKnobOptions<number | string>) =>
  useKnob<number | string>({
    initialValue: 3,
    type: 'range',
    ...options,
  })

export default useRangeKnob
