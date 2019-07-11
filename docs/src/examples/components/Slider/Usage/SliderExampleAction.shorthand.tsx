import * as React from 'react'
import { Button, Input, Slider, Flex, SliderProps } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

interface SliderAction {
  type: 'toggle_mute' | 'change_value'
  value?: React.ReactText
}

interface SliderState {
  mute: boolean
  value: React.ReactText
  currentValue: React.ReactText
  minValue: React.ReactText
}

const stateReducer = (state: SliderState, action: SliderAction) => {
  switch (action.type) {
    case 'toggle_mute':
      const mute = !state.mute
      const value = mute ? state.minValue : state.currentValue

      if (!mute && value <= state.minValue) return { ...state }
      return { ...state, mute, value, currentValue: state.value }

    case 'change_value':
      return { ...state, mute: action.value <= state.minValue, value: action.value }

    default:
      throw new Error(`Action ${action.type} is not supported`)
  }
}

const SliderWithAction: React.FunctionComponent<
  Pick<SliderProps, 'min' | 'max' | 'defaultValue' | 'vertical'>
> = props => {
  const { min, max, defaultValue, vertical } = props

  const [state, dispatch] = React.useReducer(stateReducer, {
    mute: false,
    value: defaultValue,
    currentValue: min,
    minValue: min,
  })

  const handeChange = React.useCallback(
    (e, data) => dispatch({ type: 'change_value', value: Number(data.value) }),
    [],
  )

  const commonProps = { vertical, min, max, value: state.value, onChange: handeChange }

  return (
    <Flex inline hAlign="center" vAlign="center" gap="gap.smaller" column={vertical}>
      <Button
        text
        iconOnly
        icon={state.mute ? 'mic-off' : 'mic'}
        onClick={() => dispatch({ type: 'toggle_mute' })}
      />
      <Slider {...commonProps} />
      <Input type="number" input={{ styles: { width: '64px' } }} {...commonProps} />
    </Flex>
  )
}

const SliderExampleActionShorthand = () => {
  const [vertical] = useBooleanKnob({ name: 'vertical', initialValue: false })
  return <SliderWithAction min="0" max="100" defaultValue="50" vertical={vertical} />
}

export default SliderExampleActionShorthand
