import { SliderVariables } from './sliderVariables'
import { SliderProps, SliderState } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const sliderStyles: ComponentSlotStylesInput<SliderProps & SliderState, SliderVariables> = {
  icon: (): ICSSInJSStyle => ({
    ...getIconFillOrOutlineStyles({ outline: true }),
    ':hover': getIconFillOrOutlineStyles({ outline: false }),
  }),

  thumb: ({ props: p, variables: v, theme: { siteVariables } }) => ({
    ...getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: p.isFromKeyboard,
      borderPadding: v.thumbBorderPadding,
    })[':focus'],
  }),
}

export default sliderStyles
