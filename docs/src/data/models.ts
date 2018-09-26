import { ThemeManager } from './theme-manager'

export class AppStateStore {
  public readonly name = 'app-state-store'
  public readonly themeStore: ThemeManager

  constructor() {
    this.themeStore = new ThemeManager()
  }
}

export default () => new AppStateStore()
