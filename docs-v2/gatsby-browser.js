import "./src/global-css/main.css"
import {autorun} from "mobx"
import {store, wrapRootElement} from "./src/wrap-root-element"

// Wrap the React tree in our providers
export {wrapRootElement}

// Watch for changes to the global theme; changing the theme causes the new
// theme to be downloaded and applied to the document.
autorun(() => loadTheme(store.theme))
async function loadTheme(theme) {
  switch (theme) {
    case "light":
      await import("./src/global-css/themes/light.css")
      break
    case "dark":
      await import("./src/global-css/themes/dark.css")
      break
    default:
      throw new Error("Unknown theme: " + theme)
  }
  document.body.setAttribute("data-theme", theme)
}

// Expose debug tools when in development
if (process.env.NODE_ENV === "development") {
  window.store = store
}
