import * as React from 'react'
import debugData from './debugData'
import PortalInner from '../Portal/PortalInner'
import VariablesDebugPanel from './VariablesDebugPanel'
import StylesDebugPanel from './StylesDebugPanel'

const DebugPanel = props => {
  // TODO get the debugData...
  // const debugData = getDebugData(props.debugElement)

  const node = document.createElement('div')
  document.body.parentElement.appendChild(node)
  document.body.setAttribute('style', 'width: 80%')
  return (
    <PortalInner mountNode={node}>
      <div
        style={{
          position: 'fixed',
          right: '0px',
          bottom: '0px',
          zIndex: 9999999,
          width: '300px',
          background: '#222',
          color: '#EEE',
          height: '100%',
          marginLeft: '10px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            padding: '10px',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            hyphens: 'auto',
          }}
        >
          {/* <SiteVariables data={debugData.siteVariables}/> */}
          <VariablesDebugPanel data={debugData.variables} name="variables" />
          <StylesDebugPanel data={debugData.styles.root} name={'styles'} />
        </div>
      </div>
    </PortalInner>
  )
}
export default DebugPanel
