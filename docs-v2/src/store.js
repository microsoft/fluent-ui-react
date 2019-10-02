import React from "react"
import {decorate, observable, action} from "mobx"

export class Store {
  theme = this.getInitialTheme()

  setTheme(theme) {
    this.theme = theme
  }

  toggleTheme() {
    this.setTheme(this.theme === "light" ? "dark" : "light")
  }

  getInitialTheme() {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme
      }
    }
    return "light"
  }
}
decorate(Store, {
  theme: observable,
  setTheme: action.bound,
  toggleTheme: action.bound
})

export const StoreContext = React.createContext()
export const StoreProvider = StoreContext.Provider
export const useStore = () => React.useContext(StoreContext)
