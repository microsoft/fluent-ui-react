import preset from 'jss-preset-default'
import jss from 'jss'

export { IClasses, ISlotProps, ISlottableProps, IStateProps } from './slots.types'
export {
  ICastableToString,
  IColorRamp,
  IResolvedTokens,
  ITheme,
  IToken,
  ITokenLiteral,
  ITokenResolver,
} from './theme.types'
export { mergeSlotProps } from './utilities/mergeSlotProps'
// Workaround for webpack warnings
import { IStandardProps as P } from './utilities/mergeSlotProps'

export type IStandardProps = P
export { compose, ForwardRefComponent } from './compose'
export { ThemeContext } from './themeContext'
export { ThemeProvider } from './components/ThemeProvider/ThemeProvider'
export { Box } from './components/Box/Box'
export { createTheme } from './utilities/createTheme'

jss.setup(preset())
