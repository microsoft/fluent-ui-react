import { createContext, useContext } from 'react'

import { Theme } from './theme'

export const ThemeContext = createContext<Theme | undefined>(undefined)
export const useTheme = () => useContext(ThemeContext)
