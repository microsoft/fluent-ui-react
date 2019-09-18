import * as React from 'react'
import * as _ from 'lodash'
import DebugPanelItem from './DebugPanelItem'

export type DebugPanelProps = {
  cssStyles?: string[]
  componentName: string
  debugData: {
    componentStyles: { [key: string]: { styles: any; debugId: string } }
    componentVariables: {
      input: { [key: string]: any }
      resolved: { [key: string]: any }
    }[]
    siteVariables: object[]
  }
  onActivateDebugSelectorClick: (e) => void
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
  const {
    cssStyles,
    componentName,
    debugData: inputDebugData,
    onActivateDebugSelectorClick,
  } = props

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
    <div style={debugPanelRoot(left)}>
      <div style={debugPanelOptions}>
        <div tabIndex={0} onClick={onActivateDebugSelectorClick} style={debugPanelArrowIcon}>
          {'\u21f1'}
        </div>
        <div style={{ float: 'right' }}>
          <div style={debugPanelIcon(true, left)} onClick={e => setLeft(true)} />
          <div style={debugPanelIcon(false, left)} onClick={e => setLeft(false)} />
        </div>
      </div>

      <div style={debugPanelBody}>
        {componentName && (
          <div style={debugPanel}>
            <div style={debugHeader1()}>{`<${componentName} />`}</div>
          </div>
        )}

        <div style={debugPanel}>
          <div style={debugHeaderContainer()}>
            <div style={debugHeader2()}>Site variables</div>
          </div>
          {!_.isEmpty(siteVariablesData) && !_.isEmpty(uniqSiteVariables) ? (
            <DebugPanelItem data={siteVariablesData} />
          ) : (
            <div style={debugNoData()}>None in use</div>
          )}
        </div>

        <div style={debugPanel}>
          <div style={debugHeaderContainer()}>
            <div style={debugHeader2()}>Variables</div>
          </div>
          {!_.isEmpty(debugData.componentVariables) ? (
            <DebugPanelItem
              data={debugData.componentVariables}
              valueKey="resolved"
              commentKey="input"
              commentKeyPredicate={val =>
                typeof val === 'string' && val.indexOf('siteVariables.') > -1
              }
            />
          ) : (
            <div style={debugNoData()}>None in use</div>
          )}
        </div>

        <div style={debugPanel}>
          <div style={debugHeaderContainer()}>
            <div style={debugHeader2()}>Styles</div>
            {!_.isEmpty(debugData.componentStyles) && (
              <div style={debugPanelSelectContainer()}>
                <select value={slot} onChange={e => setSlot(e.target.value)}>
                  {styleSlots.map(val => (
                    <option value={val} key={val}>
                      Slot: {val}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {!_.isEmpty(debugData.componentStyles) ? (
            <DebugPanelItem
              data={debugData.componentStyles[slot]}
              valueKey="styles"
              idKey="debugId"
            />
          ) : (
            <div style={debugNoData()}>None in use</div>
          )}
        </div>
      </div>

      {!_.isEmpty(cssStyles) && (
        <div style={debugPanel}>
          <div style={debugHeader2()}>HTML Styles</div>
          <div style={{ clear: 'both', paddingBottom: '10rem' }}>
            {cssStyles.map(l => (
              <pre key={l}>{l}</pre>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const debugPanelArrowIcon: React.CSSProperties = {
  float: 'left',
  fontSize: '20px',
  color: 'grey',
  marginTop: '-4px',
  outline: '0',
  cursor: 'pointer',
}

const debugPanelRoot = (left): React.CSSProperties => ({
  position: 'fixed',
  [left ? 'left' : 'right']: 0,
  top: 0,
  zIndex: 999999999,
  width: '25rem',
  height: '100vh',
  color: '#222',
  background: '#fff',
  lineHeight: 1.1,
  fontSize: '12px',
  overflowY: 'auto',
  boxShadow: '0 0 .5em rgba(0, 0, 0, .1)',
})

const debugHeaderContainer = (): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5em',
})

const debugHeader1 = (): React.CSSProperties => ({
  fontSize: '16px',
  fontWeight: 'bold',
})

const debugHeader2 = (): React.CSSProperties => ({
  float: 'left',
  fontSize: '14px',
  fontWeight: 'bold',
})

const debugNoData = (): React.CSSProperties => ({
  padding: '0.5em',
  color: 'rgba(0, 0, 0, 0.75)',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.05)',
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
    marginRight: '0.5em',
  }),
  ...(left === isLeftActive && {
    borderColor: '#6495ed',
  }),
  cursor: 'pointer',
})

const debugPanelOptions: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  padding: '0.5em',
}

const debugPanelBody: React.CSSProperties = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  hyphens: 'auto',
}

const debugPanel: React.CSSProperties = {
  padding: '0.5em',
}

export default DebugPanel
