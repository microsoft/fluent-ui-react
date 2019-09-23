import React from "react"
import {decorate, observable, action} from "mobx"

export class Store {
  theme = this.getInitialTheme()

  setTheme(theme) {
    if (theme !== this.theme) {
      this.theme = theme
    }
  }

  getInitialTheme() {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        this.setTheme(savedTheme)
      }
    }
    return "light"
  }
}
decorate(Store, {
  theme: observable,
  setTheme: action
})

export const StoreContext = React.createContext()
export const StoreProvider = StoreContext.Provider
export const useStore = () => React.useContext(StoreContext)
