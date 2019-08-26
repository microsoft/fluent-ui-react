import * as React from 'react'
import { SliderVariables } from './sliderVariables'
import Slider, { SliderProps, SliderState } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import getBorderFocusStyles from '../../getBorderFocusStyles'

// this selector is used to identify the thumb slot from a previous sibling
const thumbFromPreviousSiblingSelector = `&+ .${Slider.slotClassNames.thumb}`

const sliderStyles: ComponentSlotStylesInput<SliderProps & SliderState, SliderVariables> = {
  input: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const activeThumbStyles: React.CSSProperties = {
      height: v.activeThumbHeight,
      width: v.activeThumbWidth,
      background: v.activeThumbColor,
      marginTop: `calc(${v.height} / 2  - ${v.activeThumbHeight} / 2)`,
      marginLeft: `calc(-${v.activeThumbWidth} / 2)`,
    }
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
      borderPadding: v.thumbBorderPadding,
    })

    return {
      ':active': { [thumbFromPreviousSiblingSelector]: activeThumbStyles },

      ':focus': {
        [thumbFromPreviousSiblingSelector]: borderFocusStyles[':focus'],
      },
      ':focus-visible': {
        [thumbFromPreviousSiblingSelector]: {
          ...borderFocusStyles[':focus-visible'],
          ...activeThumbStyles,
        },
      },
    }
  },
}

export default sliderStyles
