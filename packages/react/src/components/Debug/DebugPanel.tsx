import * as React from 'react'
import * as _ from 'lodash'
import DebugPanelItem from './DebugPanelItem'
import FiberNavigator from './FiberNavigator'
import DebugRect from './DebugRect'

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
  onFiberChanged?: (f: FiberNavigator) => void
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

const removeNulls = object =>
  _.transform(
    object,
    (result, value, key) => {
      // Exclude null values.
      if (value !== null) {
        let val = value

        // Recurse into arrays and objects.
        if (Array.isArray(value) || _.isPlainObject(value)) {
          val = removeNulls(value)
        }

        if (Array.isArray(result)) {
          result.push(val)
        }

        result[key] = val
      }
      return result
    },
    {},
  )

const DebugPanel: React.FC<DebugPanelProps> = props => {
  const [slot, setSlot] = React.useState('root')
  const [showOwnerRect, setShowOwnerRect] = React.useState(false)
  const [showParentRect, setShowParentRect] = React.useState(false)

  const {
    cssStyles,
    debugData: inputDebugData,
    fiberNav,
    onActivateDebugSelectorClick,
    onClose,
    position,
    onPositionLeft,
    onPositionRight,
    onFiberChanged,
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
  const siteVariablesDataWithNulls = debugData.siteVariables.map(val => {
    return uniqSiteVariables.reduce((acc, next) => {
      const key = _.replace(next, 'siteVariables.', '')
      _.set(acc, key, _.get(val, key))
      return acc
    }, {})
  })

  const siteVariablesData = siteVariablesDataWithNulls.map(val => {
    return removeNulls(val)
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

        <div style={{ marginTop: '8px', clear: 'both' }}>
          {stardustOwner && (
            <div style={debugHeader2()}>
              <span style={{ display: 'inline-block', width: '60px', opacity: 0.5 }}>Owner:</span>{' '}
              <span
                style={{ cursor: 'pointer', outline: 0 }}
                tabIndex={0}
                onClick={() => onFiberChanged(stardustOwner)}
                onMouseEnter={e => setShowOwnerRect(true)}
                onMouseLeave={e => setShowOwnerRect(false)}
              >
                {`<${stardustOwner.name} />`}
              </span>
            </div>
          )}
          {stardustParent && (
            <div style={debugHeader2()}>
              <span style={{ display: 'inline-block', width: '60px', opacity: 0.5 }}>Parent:</span>{' '}
              <span
                style={{ cursor: 'pointer', outline: 0 }}
                tabIndex={0}
                onClick={() => onFiberChanged(stardustParent)}
                onMouseEnter={e => setShowParentRect(true)}
                onMouseLeave={e => setShowParentRect(false)}
              >
                {`<${stardustParent.name} />`}
              </span>
            </div>
          )}
          {fiberNav.name && (
            <div style={debugHeader1()}>
              <span style={{ display: 'inline-block', width: '60px', opacity: 0.5 }}>Name:</span>{' '}
              {`<${fiberNav.name} />`}
            </div>
          )}
        </div>
      </div>

      {showOwnerRect && <DebugRect fiberNav={stardustOwner} />}
      {showParentRect && <DebugRect fiberNav={stardustParent} />}

      <div style={debugPanelBody}>
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
              idKey="debugId"
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
            <div style={{ ...debugHeader2(), float: 'left' }}>Styles</div>
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

      <div style={{ padding: '50px 0' }} />
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
  padding: '8px',
  marginBottom: '8px',
  top: 0,
  background: '#fff',
  borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
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
