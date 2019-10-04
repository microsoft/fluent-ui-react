import { Slider, Tokens, tokens as brandedTokens } from '../../mybrand/components/Slider/Slider'
import { compose } from '../../lib/compose'
import { SliderProps } from '../../base/components/Slider/props'
import { Theme } from '../../lib/theme'

export const MostlyRedSlider = compose<SliderProps>(
  Slider as any,
  {
    name: 'MostlyRedSlider',
    tokens: (theme: Theme): Tokens => {
      const baseTokens = brandedTokens(theme) // get base tokens and override selectively
      return {
        ...baseTokens,
        trackAfterColor: '#f66',
        trackBeforeColor: '#a00',
      }
    },
  },
)

export const ThumbOverridenSlider = compose<SliderProps>(
  Slider as any,
  {
    name: 'ThumbOverridenSlider',
    tokens: (theme: Theme): Tokens => {
      const baseTokens = brandedTokens(theme) // get base tokens and override selectively
      return {
        ...baseTokens,
        thumbBackgroundColor: '#0f0',
        thumbBorderColor: '#f0f',
      }
    },
  },
)

export const TrackUpdateSlider = compose<SliderProps>(
  MostlyRedSlider as any,
  {
    name: 'ThumbOverridenSlider',
    tokens: (theme: Theme): Tokens => {
      const baseTokens = brandedTokens(theme) // get base tokens and override selectively
      return {
        ...baseTokens,
        trackBeforeColor: theme.brandDarkColor,
      }
    },
  },
)
