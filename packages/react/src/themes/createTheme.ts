import { ThemeInput, ThemePrepared } from './types'
import withMemoryId from '../utils/withMemoryId'
import withDebugId from '../utils/withDebugId'

export const createTheme = <T = ThemeInput | ThemePrepared>(themeInput: T, debugId): T => {
  return withMemoryId(withDebugId(themeInput, debugId))
}
