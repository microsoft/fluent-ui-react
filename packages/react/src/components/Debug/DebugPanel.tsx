import * as React from 'react'
import PortalInner from '../Portal/PortalInner'
import VariablesDebugPanel from './VariablesDebugPanel'
import StylesDebugPanel from './StylesDebugPanel'

const DebugPanel = props => {
  const [left, setLeft] = React.useState(false)
  const { debugData } = props

  const node = document.createElement('div')
  document.body.parentElement.appendChild(node)
  document.body.setAttribute('style', 'width: 80%')

  return (
    <PortalInner mountNode={node}>
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
  bottom: '0px',
  zIndex: 9999999,
  width: '300px',
  background: '#222',
  color: '#EEE',
  height: '100%',
  marginLeft: '10px',
  overflowY: 'auto',
})

const debugPanelIcon = (left, isLeftActive) => ({
  display: 'inline-block',
  border: '2px solid white',
  [left ? 'borderLeftWidth' : 'borderRightWidth']: '5px',
  width: '15px',
  height: '15px',
  ...(left && {
    marginRight: '10px',
  }),
  ...(left === isLeftActive && {
    borderColor: '#00b5ad',
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
