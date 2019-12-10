import { ThemeInput, ThemePrepared } from './types'
import withDebugId from '../utils/withDebugId'

export const createTheme = <T = ThemeInput | ThemePrepared>(themeInput: T, debugId): T => {
  return withDebugId(themeInput, debugId)
}
