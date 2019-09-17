import * as React from 'react'
import PortalInner from '../Portal/PortalInner'
import VariablesDebugPanel from './VariablesDebugPanel'
import StylesDebugPanel from './StylesDebugPanel'

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
          {/* <SiteVariablesDebugPanel data={debugData.siteVariables}/> */}
          <VariablesDebugPanel data={debugData.componentVariables} name="variables" />
          <StylesDebugPanel data={debugData.componentStyles.root} name={'styles'} />
        </div>
      </div>
    </PortalInner>
  )
}

const debugPanelRoot = (left): React.CSSProperties => ({
  position: 'fixed',
  [left ? 'left' : 'right']: '0px',
  top: '0px',
  zIndex: 999999999,
  width: '350px',
  height: '100%',
  backgroundColor: 'white',
  lineHeight: 1,
  fontSize: '12px',
  overflowY: 'auto',
  border: '1px solid grey',
})

const debugPanelIcon = (left, isLeftActive) => ({
  display: 'inline-block',
  border: '2px solid black',
  [left ? 'borderLeftWidth' : 'borderRightWidth']: '5px',
  width: '15px',
  height: '15px',
  ...(left && {
    marginRight: '10px',
  }),
  ...(left === isLeftActive && {
    borderColor: '#6495ed',
  }),
})

const debugPanelOptions: React.CSSProperties = {
  float: 'right',
  padding: '10px',
}

const debugPanelBody: React.CSSProperties = {
  marginTop: '20px',
  padding: '10px',
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  hyphens: 'auto',
}

export default DebugPanel
