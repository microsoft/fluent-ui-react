import { action, configure, observable } from 'mobx'

configure({
  enforceActions: true,
})

export interface IThemeManagerManager {
  themeName: string

  changeTheme(newThemeName: string): void
}

export class ThemeManager implements IThemeManagerManager {
  @observable public themeName: string

  @action
  public changeTheme(newThemeName: string): void {
    this.themeName = newThemeName
  }

  constructor() {
    this.themeName = 'teams'
  }
}
