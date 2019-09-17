import * as React from 'react'
import PortalInner from '../Portal/PortalInner'
import DebugPanelItem from './DebugPanelItem'

const DebugPanel = props => {
  const [left, setLeft] = React.useState(false)
  const { debugData } = props

  return (
    <PortalInner>
      <div style={debugPanelRoot(left)}>
        <div style={debugPanelOptions}>
          <div style={debugPanelIcon(true, left)} onClick={e => setLeft(true)} />
          <div style={debugPanelIcon(false, left)} onClick={e => setLeft(false)} />
        </div>
        <div style={debugPanelBody}>
          <div style={debugPanelVariables}>
            <div style={debugHeader()}>Variables</div>
            <DebugPanelItem data={debugData.componentVariables} />
          </div>
          <div style={debugPanelStyles}>
            <div style={debugHeader()}>Styles</div>
            <DebugPanelItem data={debugData.componentStyles.root} />
          </div>
        </div>
      </div>
    </PortalInner>
  )
}

const debugPanelRoot = (left): React.CSSProperties => ({
  position: 'fixed',
  [left ? 'left' : 'right']: 0,
  top: 0,
  zIndex: 999999999,
  width: '300px',
  height: '100vh',
  color: '#222',
  background: '#fff',
  lineHeight: 1.1,
  fontSize: '12px',
  overflowY: 'auto',
  boxShadow: '0 0 .25em .5em rgba(0, 0, 0, .1)',
})

const debugHeader = (): React.CSSProperties => ({
  marginBottom: '0.5em',
  fontSize: '16px',
  fontWeight: 'bold',
})

const debugPanelIcon = (left, isLeftActive): React.CSSProperties => ({
  display: 'inline-block',
  borderWidth: '2px',
  borderStyle: 'solid ',
  borderColor: '#888',
  backgroundColor: 'white',
  [left ? 'borderLeftWidth' : 'borderRightWidth']: '6px',
  width: '16px',
  height: '14px',
  ...(left && {
    marginRight: '10px',
  }),
  ...(left === isLeftActive && {
    borderColor: '#6495ed',
  }),
})

const debugPanelOptions: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  float: 'right',
  padding: '10px',
}

const debugPanelBody: React.CSSProperties = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  hyphens: 'auto',
}

const debugPanelVariables: React.CSSProperties = {
  padding: '10px',
}

const debugPanelStyles: React.CSSProperties = {
  padding: '10px',
}

export default DebugPanel
