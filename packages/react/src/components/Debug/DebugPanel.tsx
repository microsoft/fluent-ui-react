import * as React from 'react'
import * as _ from 'lodash'
import DebugPanelItem from './DebugPanelItem'
import FiberNavigator from './FiberNavigator'

export type DebugPanelProps = {
  cssStyles?: string[]
  fiberNav: FiberNavigator
  debugData: {
    componentStyles: { [key: string]: { styles: any; debugId: string } }
    componentVariables: {
      input: { [key: string]: any }
      resolved: { [key: string]: any }
    }[]
    siteVariables: object[]
  }
  onActivateDebugSelectorClick: (e) => void
  onClose: (e) => void
  onPositionLeft: (e) => void
  onPositionRight: (e) => void
  position: 'left' | 'right'
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
  const [slot, setSlot] = React.useState('root')
  const {
    cssStyles,
    debugData: inputDebugData,
    fiberNav,
    onActivateDebugSelectorClick,
    onClose,
    position,
    onPositionLeft,
    onPositionRight,
  } = props

  const left = position === 'left'

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

  const stardustParent = fiberNav.parent.find(
    fiber => fiber.instance && fiber.instance.stardustDebug,
    fiber => fiber.parent,
  )
  const stardustOwner = fiberNav.owner.find(
    fiber => fiber.instance && fiber.instance.stardustDebug,
    fiber => fiber.owner,
  )

  return (
    <div style={debugPanelRoot(left)}>
      <div style={debugPanelOptions}>
        <div tabIndex={0} onClick={onActivateDebugSelectorClick} style={debugPanelArrowIcon}>
          ⇱
        </div>
        <div style={{ float: 'right' }}>
          <div tabIndex={0} style={debugPanelIcon(true, left)} onClick={onPositionLeft} />
          <div tabIndex={0} style={debugPanelIcon(false, left)} onClick={onPositionRight} />
          <div tabIndex={0} onClick={onClose} style={debugPanelCloseIcon}>
            ✕
          </div>
        </div>
      </div>

      <div style={debugPanelBody}>
        <div style={debugPanel}>
          {stardustOwner && (
            <div style={debugHeader1()}>
              <span style={{ opacity: 0.5 }}>Owner:</span> {`<${stardustOwner.name} />`}
            </div>
          )}
          {stardustParent && (
            <div style={debugHeader1()}>
              <span style={{ opacity: 0.5 }}>Parent:</span> {`<${stardustParent.name} />`}
            </div>
          )}
          {fiberNav.name && (
            <div style={debugHeader1()}>
              <span style={{ opacity: 0.5 }}>Name:</span> {`<${fiberNav.name} />`}
            </div>
          )}
        </div>

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
          <div style={{ clear: 'both' }}>
            {cssStyles.map(l => (
              <pre key={l}>{l}</pre>
            ))}
          </div>
        </div>
      )}

      <div styles={{ padding: '200px 0' }} />
    </div>
  )
}

const commonIconStyle: React.CSSProperties = {
  display: 'inline-block',
  cursor: 'pointer',
}

const debugPanelCloseIcon: React.CSSProperties = {
  ...commonIconStyle,
  fontSize: '20px',
  color: 'grey',
  outline: '0',
  cursor: 'pointer',
}

const debugPanelArrowIcon: React.CSSProperties = {
  ...commonIconStyle,
  float: 'left',
  fontSize: '20px',
  color: 'grey',
  marginTop: '-4px',
  outline: '0',
}

const debugPanelIcon = (left, isLeftActive): React.CSSProperties => ({
  ...commonIconStyle,
  borderWidth: '2px',
  borderStyle: 'solid ',
  borderColor: '#888',
  backgroundColor: 'white',
  [left ? 'borderLeftWidth' : 'borderRightWidth']: '6px',
  width: '16px',
  height: '14px',
  marginRight: '0.8em',
  ...(left === isLeftActive && {
    borderColor: '#6495ed',
  }),
})

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
  boxShadow: '0 0 8px rgba(0, 0, 0, .1)',
})

const debugHeaderContainer = (): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
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
  padding: '8px',
  color: 'rgba(0, 0, 0, 0.75)',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.05)',
})

const debugPanelSelectContainer = (): React.CSSProperties => ({
  float: 'right',
})

const debugPanelOptions: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  padding: '8px',
}

const debugPanelBody: React.CSSProperties = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  hyphens: 'auto',
}

const debugPanel: React.CSSProperties = {
  padding: '8px',
}

export default DebugPanel
