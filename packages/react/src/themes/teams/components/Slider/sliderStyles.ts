import { SliderVariables } from './sliderVariables'
import Slider, { SliderProps, SliderState } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'
import getBorderFocusStyles from '../../getBorderFocusStyles'

// this selector is used to identify the thumb slot from a previous sibling
const thumbFromPreviousSiblingSelector = `&+ .${Slider.slotClassNames.thumb}`

const sliderStyles: ComponentSlotStylesInput<SliderProps & SliderState, SliderVariables> = {
  icon: (): ICSSInJSStyle => ({
    ...getIconFillOrOutlineStyles({ outline: true }),
    ':hover': getIconFillOrOutlineStyles({ outline: false }),
  }),

  input: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const activeThumbStyles: React.CSSProperties = {
      height: v.activeThumbHeight,
      width: v.activeThumbWidth,
      background: v.activeThumbColor,
      marginTop: `calc(${v.height} / 2  - ${v.activeThumbHeight} / 2)`,
      marginLeft: `calc(-${v.activeThumbWidth} / 2)`,
    }

    return {
      ':active': {
        [thumbFromPreviousSiblingSelector]: activeThumbStyles,
      },

      ':focus': {
        [thumbFromPreviousSiblingSelector]: {
          ...(p.isFromKeyboard && activeThumbStyles),
          ...getBorderFocusStyles({
            siteVariables,
            isFromKeyboard: p.isFromKeyboard,
            borderPadding: v.thumbBorderPadding,
          })[':focus'],
        },
      },
    }
  },
}

export default sliderStyles
