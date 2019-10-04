import { Slider, Tokens, tokens as brandedTokens } from './../../mybrand/components/slider/slider'
import { composed } from './../../lib/composed'
import { SliderProps } from './../../base/components/slider/props'
import { Theme } from '../../lib/theme'

export const MostlyRedSlider = composed<SliderProps>(Slider as any, {
  name: 'MostlyRedSlider',
  tokens: (theme: Theme): Tokens => {
    const baseTokens = brandedTokens(theme) // get base tokens and override selectively
    return {
      ...baseTokens,
      trackAfterColor: '#f66',
      trackBeforeColor: '#a00',
    }
  },
})

export const ThumbOverridenSlider = composed<SliderProps>(Slider as any, {
  name: 'ThumbOverridenSlider',
  tokens: (theme: Theme): Tokens => {
    const baseTokens = brandedTokens(theme) // get base tokens and override selectively
    return {
      ...baseTokens,
      thumbBackgroundColor: '#0f0',
      thumbBorderColor: '#f0f',
    }
  },
})

export const TrackUpdateSlider = composed<SliderProps>(MostlyRedSlider as any, {
  name: 'ThumbOverridenSlider',
  tokens: (theme: Theme): Tokens => {
    const baseTokens = brandedTokens(theme) // get base tokens and override selectively
    return {
      ...baseTokens,
      trackBeforeColor: theme.brandDarkColor,
    }
  },
})
