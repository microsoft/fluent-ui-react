import * as React from 'react'
import FiberNavigator from './FiberNavigator'
import Line from './Line'
import ScrollToBottom from './ScrollToBottom'

export type DebugComponentViewerProps = {
  fiberNav: FiberNavigator
  onFiberChanged: (fiberNav: FiberNavigator) => void
  onFiberSelected: (fiberNav: FiberNavigator) => void
}

const style: React.CSSProperties = {
  padding: '8px',
  whiteSpace: 'pre',
  lineHeight: 1.4,
  background: '#222',
  overflowY: 'auto',
  color: '#CCC',
  fontFamily: 'monospace',
  fontWeight: 'bold',
}

const DebugComponentViewer: React.FC<DebugComponentViewerProps> = props => {
  const { fiberNav, onFiberChanged, onFiberSelected } = props

  const ownerNav = fiberNav.owner

  const parentNavs = []
  let parentNav = fiberNav.parent

  while (parentNav && !parentNav.isEqual(ownerNav)) {
    if (parentNav.stardustDebug) parentNavs.unshift(parentNav)
    parentNav = parentNav.parent
  }

  const component = fiberNav.name && <Line>{fiberNav.jsxString}</Line>

  return (
    <ScrollToBottom style={style}>
      <Line
        indent={0}
        {...(ownerNav.stardustDebug && {
          actionable: true,
          tabIndex: 0,
          onClick: e => {
            e.preventDefault()
            onFiberChanged(ownerNav)
          },
          onMouseEnter: e => onFiberSelected(ownerNav),
          onMouseLeave: e => onFiberSelected(null),
        })}
      >
        {ownerNav.jsxString}
      </Line>
      <Line indent={1} style={{ color: '#ba645e' }}>
        render()
      </Line>
      {parentNavs.map((parent, i) => (
        <Line
          key={i}
          indent={2 + i}
          actionable
          tabIndex="0"
          onClick={e => {
            e.preventDefault()
            onFiberChanged(parent)
          }}
          onMouseEnter={e => onFiberSelected(parent)}
          onMouseLeave={e => onFiberSelected(null)}
        >
          {parent.jsxString}
        </Line>
      ))}
      <Line
        indent={3 + (parentNavs.length - 1)}
        active
        badge="selected"
        actionable
        tabIndex="0"
        onClick={e => {
          e.preventDefault()
          onFiberChanged(fiberNav)
        }}
        onMouseEnter={e => onFiberSelected(fiberNav)}
        onMouseLeave={e => onFiberSelected(null)}
      >
        {component}
      </Line>
    </ScrollToBottom>
  )
}

export default DebugComponentViewer
