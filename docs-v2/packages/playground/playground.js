import "./index.css"
import React from "react"
import {observer} from "mobx-react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons"
import {
  themes,
  Provider as StardustProvider,
  Checkbox
} from "@stardust-ui/react"
import {usePlayground} from "./context"
import {PlaygroundExamples} from "./examples"
import {PlaygroundPreview} from "./preview"
import {PlaygroundProvider} from "./context"
import {PlaygroundAPI} from "./api"

export function Playground({schema, onRequestMaximize}) {
  const playground = React.useMemo(() => new PlaygroundAPI(schema), [schema])
  const stardustTheme = themes.teams

  return (
    <StardustProvider theme={stardustTheme} styles={{background: "none"}}>
      <PlaygroundProvider value={playground}>
        <div className="playground">
          <PlaygroundBanner onRequestMaximize={onRequestMaximize} />
          <div className="playground-body">
            <PlaygroundExamples />
            <PlaygroundPreview />
          </div>
        </div>
      </PlaygroundProvider>
    </StardustProvider>
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
