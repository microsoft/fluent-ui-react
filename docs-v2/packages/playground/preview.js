import React from "react"
import {observer} from "mobx-react"
import {Provider} from "@stardust-ui/react"
import {usePlayground} from "./context"

// prettier-ignore
const TRANSPARENT_BACKGROUND = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=)"

export const PlaygroundPreview = observer(() => {
  const playground = usePlayground()

  let styles
  let theme = playground.theme.config

  if (playground.transparent) {
    styles = {background: TRANSPARENT_BACKGROUND}
  }
  // Override the container background if the theme has a white background;
  // prefer a dim background.
  else if (theme.siteVariables.bodyBackground === "#fff") {
    styles = {background: "#ddd !important"}
  }

  // HACK: force re-render when active example changes
  // eslint-disable-next-line
  playground.activeExample && playground.activeExample.source

  function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Provider
      className="playground-preview"
      rtl={playground.rtl}
      theme={theme}
      styles={styles}
      onClick={handleClick}
    >
      <PlaygroundPreviewErrorBoundary
        key={playground.activeExample && playground.activeExample.title}
      >
        {playground.render()}
      </PlaygroundPreviewErrorBoundary>
    </Provider>
  )
})

class PlaygroundPreviewErrorBoundary extends React.Component {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({error})
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <p>An error occured while rendering this component:</p>
          <pre>{this.state.error.message}</pre>
        </div>
      )
    }
    return this.props.children || null
  }
}
