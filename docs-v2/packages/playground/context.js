import React from "react"

const PlaygroundContext = React.createContext()

export const PlaygroundProvider = PlaygroundContext.Provider

export function usePlayground() {
  return React.useContext(PlaygroundContext)
}
