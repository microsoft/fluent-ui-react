import "./index.css"
import React from "react"
import {observer} from "mobx-react"
import {Checkbox} from "@stardust-ui/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons"
import {usePlayground} from "./context"
import {PlaygroundExamples} from "./examples"
import {PlaygroundPreview} from "./preview"

export function Playground({onRequestMaximize}) {
  return (
    <div className="playground">
      <PlaygroundBanner onRequestMaximize={onRequestMaximize} />
      <div className="playground-body">
        <PlaygroundExamples />
        <PlaygroundPreview />
      </div>
    </div>
  )
}

function PlaygroundBanner({onRequestMaximize}) {
  return (
    <header className="playground-banner">
      <div className="playground-preview-controls">
        <ThemeControl />
        <RTLControl />
        <TransparencyControl />
      </div>
      <button className="playground-maximize" onClick={onRequestMaximize}>
        <FontAwesomeIcon icon={faExpandArrowsAlt} />
      </button>
    </header>
  )
}

const ThemeControl = observer(() => {
  const playground = usePlayground()

  function handleChange(e) {
    playground.selectTheme(e.target.value)
  }

  return (
    <div
      className="playground-preview-control"
      style={{marginRight: "1.25rem"}}
    >
      <span className="playground-preview-control-label">Theme:</span>
      <select value={playground.theme.id} onChange={handleChange}>
        {playground.themes.map(theme => {
          return (
            <option key={theme.id} value={theme.id}>
              {theme.id}
            </option>
          )
        })}
      </select>
    </div>
  )
})

const RTLControl = observer(() => {
  const playground = usePlayground()

  const label = (
    <span className="playground-preview-control-label" style={{margin: 0}}>
      RTL
    </span>
  )
  return (
    <div className="playground-preview-control">
      <Checkbox
        toggle
        label={label}
        checked={playground.rtl}
        onChange={playground.toggleRTL}
        labelPosition="start"
      />
    </div>
  )
})

const TransparencyControl = observer(() => {
  const playground = usePlayground()

  const label = (
    <span className="playground-preview-control-label" style={{margin: 0}}>
      Transparency
    </span>
  )
  return (
    <div className="playground-preview-control">
      <Checkbox
        toggle
        label={label}
        checked={playground.transparent}
        onChange={playground.toggleTransparent}
        labelPosition="start"
      />
    </div>
  )
})

// import "./component-playground.css"
// import React from "react"
// import {navigate} from "gatsby"
// import {Provider as ThemeProvider, themes} from "@stardust-ui/react"
// import {
//   Playground,
//   PlaygroundAPI,
//   PlaygroundProvider,
//   PlaygroundPluginHost,
//   EditorPlugin,
//   HTMLPlugin,
//   StylesPlugin
// } from "@stardust-ui/docs-playground"
// import {useTheme} from "./theme"

// export function ComponentPlayground({schema}) {
//   const theme = useTheme()
//   const playground = React.useMemo(() => {
//     const playground = new PlaygroundAPI(schema)

//     playground.addTheme("Teams Light", themes.teams)
//     playground.addTheme("Teams Dark", themes.teamsDark)
//     playground.addTheme("Teams High Contrast", themes.teamsHighContrast)

//     return playground
//   }, [schema])

//   // Abuse of memo for synchronous side-effect (useLayoutEffect does not work)
//   React.useMemo(() => {
//     playground.selectTheme(theme === "light" ? "Teams Light" : "Teams Dark")
//   }, [theme, playground])

//   // TODO: render statically on server. Currently unable to because Stardust
//   // expects a document to exist.
//   if (typeof window === "undefined") {
//     return null
//   }

//   function handleRequestMaximize() {
//     if (window.location.href.includes("playground")) {
//       navigate(`/components/${schema.slug}`)
//     } else {
//       navigate(`/components/${schema.slug}/playground`)
//     }
//   }

//   const stardustTheme = theme === "light" ? themes.teams : themes.teamsDark
//   return (
//     <PlaygroundProvider value={playground}>
//       <ThemeProvider theme={stardustTheme} styles={{background: "none"}}>
//         <Playground onRequestMaximize={handleRequestMaximize} />
//         <PlaygroundPluginHost
//           plugins={[EditorPlugin, HTMLPlugin, StylesPlugin]}
//         />
//       </ThemeProvider>
//     </PlaygroundProvider>
//   )
// }
