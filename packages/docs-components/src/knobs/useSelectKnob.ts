import { UseKnobOptions } from './types'
import useKnob from './useKnob'

const useSelectKnob = <T extends string>(options: UseKnobOptions<T>) =>
  useKnob<T>({ initialValue: '' as T, type: 'select', ...options })

export default useSelectKnob
