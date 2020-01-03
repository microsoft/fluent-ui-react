import createManager from '../createManager'
import { Manager, ManagerConfig } from '../types'

export type MenuState = {
  activeIndex?: number
}

export type MenuActions = {
  select: (index: number) => void
}

export type MenuManager = Manager<MenuState, MenuActions>

export const createMenuManager = (
  config: Partial<ManagerConfig<MenuState, MenuActions>> = {},
): MenuManager =>
  createManager<MenuState, MenuActions>({
    ...config,
    actions: {
      select: index => () => ({ activeIndex: index }),
    },
    state: {
      activeIndex: -1,
      ...config.state,
    },
  })
