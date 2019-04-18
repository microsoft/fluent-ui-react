import { UseKnobOptions } from './types'
import useKnob from './useKnob'

const useSelectKnob = (options: UseKnobOptions<string>) =>
  useKnob<string>({
    initialValue: '',
    type: 'select',
    ...options,
  })

export default useSelectKnob
