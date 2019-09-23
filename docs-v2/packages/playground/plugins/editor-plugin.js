import React from "react"
import {observer} from "mobx-react"
import {usePlayground} from "../context"

let AceEditor

const Editor = observer(() => {
  const ace = React.useRef()
  const playground = usePlayground()

  React.useMemo(() => {
    if (typeof window !== "undefined") {
      AceEditor = require("react-ace").default
      require("brace")
      require("brace/ext/language_tools")
      require("brace/mode/jsx")
      require("brace/theme/dracula")
    }
  }, [])

  function handleChange(source) {
    playground.activeExample.source = source
  }

  if (!AceEditor || !playground.activeExample) {
    return null
  }

  const value = playground.activeExample.source
  return (
    <div className="editor-controls">
      <AceEditor
        ref={ace}
        value={value}
        mode="jsx"
        theme="dracula"
        width="100%"
        fontSize="1.35rem"
        active
        enableBasicAutocompletion
        enableLiveAutocompletion
        highlightActiveLine
        highlightGutterLine
        editorProps={{$blockScrolling: Infinity}}
        setOptions={{fixedWidthGutter: true, showFoldWidgets: false}}
        showPrintMargin={false}
        tabSize={2}
        maxLines={Infinity}
        readOnly={false}
        showCursor
        onChange={handleChange}
      />
    </div>
  )
})

export default {
  title: "Editor",
  render() {
    return <Editor />
  }
}
