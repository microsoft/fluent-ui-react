import { createContext } from '@fluentui/react-context-selector'
import { ComponentVariablesInput } from '@fluentui/styles'
import * as React from 'react'

export type ListContextValue = {
  debug: boolean
  selectable: boolean
  navigable: boolean
  truncateContent: boolean
  truncateHeader: boolean
  variables: ComponentVariablesInput

  onItemClick: (e: React.KeyboardEvent | React.MouseEvent, itemIndex: number) => void
  selectedIndex: number
}

export const ListContext = createContext<ListContextValue>(null)
export const Provider = ListContext.Provider
