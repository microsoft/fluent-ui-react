import { compose } from '../../../lib/compose'
import { SliderProps } from '../../../base/components/slider/props'
import { Slider as BaseSlider } from '../../../base/components/slider/slider'
import { Theme } from '../../../lib/theme'
import { theme as myBrandTheme } from '../../theme'

export interface Tokens {
  trackAfterColor: any
  trackBeforeColor: string
  thumbBackgroundColor: string
  thumbBorderColor: string
}

export const tokens = (theme: Theme): Tokens => {
  return {
    trackBeforeColor: theme.brandColor,
    thumbBackgroundColor: 'white',
    thumbBorderColor: theme.brandDarkColor,
    trackAfterColor: '#bbc',
  }
}

const styles = (theme: Theme, tokens: Tokens) => {
  return {
    root: {
      position: 'relative',
      height: '28px',

      '&:focus': {
        outline: 'none',
      },

      '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '4px',
        backgroundColor: tokens.trackAfterColor,
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
    track: {
      position: 'absolute',
      left: '8px',
      right: '8px',
      height: '100%',
    },

    selectedTrack: {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      height: '4px',
      backgroundColor: tokens.trackBeforeColor,
    },
    thumb: {
      position: 'absolute',
      boxSizing: 'border-box',
      height: '16px',
      width: '16px',
      borderRadius: '16px',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: tokens.thumbBackgroundColor,
      border: `2px solid ${tokens.thumbBorderColor}`,
    },
  }
}

export const Slider = compose<SliderProps>(
  BaseSlider as any,
  {
    name: 'Slider',
    styles,
    tokens,
    defaultTheme: myBrandTheme,
  },
)
