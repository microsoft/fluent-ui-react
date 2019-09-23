import React from "react"
import {Store, StoreProvider} from "./store"

export const store = new Store()

export function wrapRootElement({element}) {
  return <StoreProvider value={store}>{element}</StoreProvider>
}
