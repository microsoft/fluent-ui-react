import { SliderVariables } from './sliderVariables'
import { SliderProps, SliderState } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { selectors } from '../../../../styles/selectors'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const sliderStyles: ComponentSlotStylesInput<SliderProps & SliderState, SliderVariables> = {
  input: ({ props: p, variables: v }): ICSSInJSStyle => {
    const thumbFocusStyles: React.CSSProperties = { outline: 'auto' }

    const activeThumbStyles: React.CSSProperties = {
      height: v.activeThumbHeight,
      width: v.activeThumbWidth,
      background: v.activeThumbColor,
      marginTop: `calc((${v.trackWidth} - ${v.activeThumbHeight}) / 2)`,
    }

    return {
      ':active': {
        [selectors.WEBKIT_THUMB]: activeThumbStyles,
        [selectors.MOZ_THUMB]: activeThumbStyles,
        [selectors.MS_THUMB]: activeThumbStyles,
      },

      ':focus': {
        outline: 0,

        ...(p.isFromKeyboard && {
          [`&${selectors.WEBKIT_THUMB}`]: thumbFocusStyles,
          [`&${selectors.MOZ_THUMB}`]: thumbFocusStyles,
          [`&${selectors.MS_THUMB}`]: thumbFocusStyles,
        }),
      },
    }
  },

  icon: (): ICSSInJSStyle => ({
    ...getIconFillOrOutlineStyles({ outline: true }),
    ':hover': getIconFillOrOutlineStyles({ outline: false }),
  }),
}

export default sliderStyles
