import React from 'react';
import { ISliderProps, ISliderSlots } from './Slider.types';
import { useSlider } from './useSlider';
import { IComponentWithSlots, getSlots } from '@fluentui/react-theming';

export const SliderBase: IComponentWithSlots<ISliderProps, ISliderSlots> = (
  props: ISliderProps,
) => {
  const slots = getSlots(SliderBase, props);
  const { slotProps } = useSlider(SliderBase, props);

  return (
    <slots.root {...slotProps.root}>
      <slots.rail {...slotProps.rail} />
      <slots.track {...slotProps.track} />
      <slots.thumb {...slotProps.thumb} />
    </slots.root>
  );
};

SliderBase.slots = {
  root: 'div',
  rail: 'div',
  thumb: 'div',
  track: 'div',
};
