import * as React from 'react'
import * as _ from 'lodash'
import PortalInner from '../Portal/PortalInner'
import DebugPanelItem from './DebugPanelItem'

export type DebugPanelProps = {
  cssStyles: string[]
  componentName: string
  debugData: {
    componentStyles: { [key: string]: { styles: any; debugId: string } }
    componentVariables: {
      input: { [key: string]: any }
      resolved: { [key: string]: any }
    }[]
    siteVariables: object[]
  }
}

const getValues = (value, predicate) => {
  if (_.isNil(value)) {
    return []
  }

  if (typeof value === 'string') {
    if (predicate(value)) {
      return [value]
    }
  }

  if (typeof value === 'object') {
    let arr = []
    Object.keys(value).forEach(key => {
      arr = _.concat(arr, getValues(value[key], predicate))
    })
    return arr
  }

  return []
}

const DebugPanel: React.FC<DebugPanelProps> = props => {
  const [left, setLeft] = React.useState(false)
  const [slot, setSlot] = React.useState('root')
  const { cssStyles, componentName, debugData: inputDebugData } = props

  const debugData =
    _.isNil(inputDebugData) || _.isEmpty(inputDebugData)
      ? {
          componentStyles: {},
          componentVariables: [],
          siteVariables: [],
        }
      : inputDebugData

  debugData.componentStyles = debugData.componentStyles || {}
  debugData.componentVariables = debugData.componentVariables || []
  debugData.siteVariables = debugData.siteVariables || []

  const styleSlots = Object.keys(debugData.componentStyles)
  let siteVariablesKey = []

  debugData.componentVariables
    .map(val => val.input)
    .forEach(
      val =>
        (siteVariablesKey = _.concat(
          siteVariablesKey,
          getValues(val, val => val.indexOf('siteVariables.') > -1),
        )),
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
          {componentName && (
            <div style={debugPanel}>
              <h2 style={{ marginTop: 0 }}>{componentName}</h2>
            </div>
          )}

          {!_.isEmpty(siteVariablesData) && !_.isEmpty(uniqSiteVariables) ? (
            <div style={debugPanel}>
              <div style={debugHeaderContainer()}>
                <div style={debugHeader()}>Site variables</div>
              </div>
              <DebugPanelItem data={siteVariablesData} />
            </div>
          ) : (
            <div style={debugNoDataHeader()}>No site variables defined/used</div>
          )}

          {!_.isEmpty(debugData.componentVariables) ? (
            <div style={debugPanel}>
              <div style={debugHeaderContainer()}>
                <div style={debugHeader()}>Variables</div>
              </div>
              <DebugPanelItem
                data={debugData.componentVariables}
                valueKey="resolved"
                commentKey="input"
                commentKeyPredicate={val =>
                  typeof val === 'string' && val.indexOf('siteVariables.') > -1
                }
              />
            </div>
          ) : (
            <div style={debugNoDataHeader()}>No variables defined</div>
          )}

          {!_.isEmpty(debugData.componentStyles) ? (
            <div style={debugPanel}>
              <div style={debugHeaderContainer()}>
                <div style={debugHeader()}>Styles</div>
                <div style={debugPanelSelectContainer()}>
                  <select value={slot} onChange={e => setSlot(e.target.value)}>
                    {styleSlots.map(val => (
                      <option value={val} key={val}>
                        Slot: {val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <DebugPanelItem
                data={debugData.componentStyles[slot]}
                valueKey="styles"
                idKey="debugId"
              />
            </div>
          ) : (
            <div style={debugNoDataHeader()}>No styles defined</div>
          )}
        </div>

        <div style={debugPanel}>
          <div style={debugHeader()}>HTML Styles</div>
          <div style={{ clear: 'both', paddingBottom: '10rem' }}>
            {cssStyles.map(l => (
              <pre key={l}>{l}</pre>
            ))}
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

const debugHeaderContainer = (): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5em',
})

const debugHeader = (): React.CSSProperties => ({
  float: 'left',
  fontSize: '1rem',
  fontWeight: 'bold',
})

const debugNoDataHeader = (): React.CSSProperties => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: '10px',
})

const debugPanelSelectContainer = (): React.CSSProperties => ({
  float: 'right',
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

const debugPanel: React.CSSProperties = {
  padding: '10px',
}

export default DebugPanel
