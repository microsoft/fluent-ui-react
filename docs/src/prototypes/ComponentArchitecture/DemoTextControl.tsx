import { compose } from '@fluentui/react-theming'
import { BaseTextControl } from './BaseTextControl'
import { defaultTheme } from './theme'

export const DemoTextControl = compose(BaseTextControl, {
  defaultTheme,
  tokens: {
    bg: (_: any, t: any) => t.colors.brand,
  },
  styles: t => {
    return {
      root: {
        backgroundColor: t.bg,
        color: 'white',
      },
    }
  },
})
