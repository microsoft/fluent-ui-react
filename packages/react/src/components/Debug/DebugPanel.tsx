import * as React from 'react'
import * as _ from 'lodash'
import PortalInner from '../Portal/PortalInner'
import DebugPanelItem from './DebugPanelItem'

const DebugPanel = props => {
  const [left, setLeft] = React.useState(false)
  const [slot, setSlot] = React.useState('root')
  const { debugData } = props

  const siteVariablesKey = []

  debugData.componentVariables
    .map(val => val.input)
    .forEach(val =>
      _.forEach(val, (val, key) => {
        if (val.indexOf('siteVariables.') > -1) {
          siteVariablesKey.push(val)
        }
      }),
    )

  const uniqSiteVariables = _.uniq(siteVariablesKey)
  const siteVariablesData = debugData.siteVariables.map(val => {
    return uniqSiteVariables.reduce((acc, next) => {
      const key = _.replace(next, 'siteVariables.', '')
      acc[key] = _.get(val, key)
      return acc
    }, {})
  })

  return (
    <PortalInner>
      <div style={debugPanelRoot(left)}>
        <div style={debugPanelOptions}>
          <div style={debugPanelIcon(true, left)} onClick={e => setLeft(true)} />
          <div style={debugPanelIcon(false, left)} onClick={e => setLeft(false)} />
        </div>
        <div style={debugPanelBody}>
          <div style={debugPanelSiteVariables}>
            <div style={debugHeader()}>Site variables</div>
            <DebugPanelItem data={siteVariablesData} />
          </div>
          <div style={debugPanelVariables}>
            <div style={debugHeader()}>Variables</div>
            <DebugPanelItem data={debugData.componentVariables} rootKey="resolved" />
          </div>
          <div style={debugPanelStyles}>
            <div style={debugHeader()}>Styles</div>
            <select value={slot} onChange={e => setSlot(e.target.value)} style={debugPanelSelect}>
              {Object.keys(debugData.componentStyles).map(val => (
                <option value={val} key={val}>
                  {val}
                </option>
              ))}
            </select>
            <DebugPanelItem data={debugData.componentStyles[slot]} />
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
  maxWidth: '500px',
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

const debugPanelSelect: React.CSSProperties = {
  width: '100%',
  marginBottom: '10px',
}

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

const debugPanelSiteVariables: React.CSSProperties = {
  padding: '10px',
}

const debugPanelVariables: React.CSSProperties = {
  padding: '10px',
}

const debugPanelStyles: React.CSSProperties = {
  padding: '10px',
}

export default DebugPanel
