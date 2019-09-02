import * as React from 'react'
import { KnobContext, LogContext } from './KnobContexts'

const LogInspector: React.FunctionComponent = () => {
  const { components } = React.useContext(KnobContext)
  const context = React.useContext(LogContext)

  return React.createElement(components.LogInspector, {
    clearLog: context.clear,
    lines: context.lines,
  })
}

export default LogInspector
