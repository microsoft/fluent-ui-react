import * as React from 'react'

import { compose } from '../../../lib/compose'
import { useSliderSlots, useSliderState } from './useSlider'
import { SliderProps } from './props'

// Focus of the view is provide order and conditionals for the slots, and to mix props into the right places.
const view = ({ Slots, slotProps }: any) => {
  return (
    <Slots.root {...slotProps.root}>
      <Slots.selectedTrack {...slotProps.selectedTrack} />
      <Slots.track {...slotProps.track}>
        <Slots.thumb {...slotProps.thumb} />
      </Slots.track>
    </Slots.root>
  )
}

export const Slider = compose<SliderProps>(
  undefined,
  {
    name: 'Slider',
    slots: {
      root: 'div',
      selectedTrack: 'div',
      track: 'div',
      thumb: 'div',
    },
    state: useSliderState,
    slotProps: useSliderSlots,
    view,
  } as any,
)
