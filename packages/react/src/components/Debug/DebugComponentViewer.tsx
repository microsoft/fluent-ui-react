import * as React from 'react'
import FiberNavigator from './FiberNavigator'
import DebugLine from './DebugLine'
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

  const component = fiberNav.name && <DebugLine>{fiberNav.jsxString}</DebugLine>

  return (
    <ScrollToBottom style={style}>
      <DebugLine
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
      </DebugLine>
      <DebugLine indent={1} style={{ color: '#ba645e' }}>
        render()
      </DebugLine>
      {parentNavs.map((parent, i) => (
        <DebugLine
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
        </DebugLine>
      ))}
      <DebugLine
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
      </DebugLine>
    </ScrollToBottom>
  )
}

export default DebugComponentViewer
