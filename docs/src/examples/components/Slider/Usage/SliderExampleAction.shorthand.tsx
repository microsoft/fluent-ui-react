import * as React from 'react'
import { Button, Input, Slider, Flex } from '@stardust-ui/react'

interface SliderAction {
  type: 'toggle_mute' | 'change_value'
  value?: number
}

interface SliderState {
  mute: boolean
  value: number
  currentValue: number
}

const volumeValues = { min: 0, max: 100, default: 50 }

const stateReducer = (state: SliderState, action: SliderAction) => {
  switch (action.type) {
    case 'toggle_mute':
      const mute = !state.mute
      const value = mute ? volumeValues.min : state.currentValue

      if (!mute && value <= volumeValues.min) return { ...state }
      return { ...state, mute, value, currentValue: state.value }
    case 'change_value':
      return { ...state, mute: action.value <= volumeValues.min, value: action.value }
    default:
      throw new Error(`Action ${action.type} is not supported`)
  }
}

const SliderExampleActionShorthand = () => {
  const { min, max, default: defaultVolume } = volumeValues

  const [state, dispatch] = React.useReducer(stateReducer, {
    mute: false,
    value: defaultVolume,
    currentValue: min,
  })

  const handeChange = React.useCallback(
    (e, data) => dispatch({ type: 'change_value', value: Number(data.value) }),
    [],
  )

  return (
    <Flex gap="gap.smaller">
      <Button
        text
        iconOnly
        icon={state.mute ? 'mic-off' : 'mic'}
        onClick={() => dispatch({ type: 'toggle_mute' })}
      />
      <Slider min={min} max={max} value={state.value} onChange={handeChange} />
      <Input type="number" min={min} max={max} value={state.value} onChange={handeChange} />
    </Flex>
  )
}

export default SliderExampleActionShorthand
