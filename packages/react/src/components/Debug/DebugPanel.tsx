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

class ScrollToBottom extends React.Component<any> {
  ref = React.createRef()

  componentDidMount() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.ref.current.scrollTo({ behavior: 'smooth', top: 999999 })
  }

  render() {
    return <div ref={this.ref} {...this.props} />
  }
}

const Line: React.FC<{
  [key: string]: any
  children: React.ReactNode
  active?: boolean
  indent?: number
  style?: React.CSSProperties
  badge?: string
  actionable?: boolean
}> = ({ active, indent = 0, actionable, children, style, badge, ...rest }) => (
  <a
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: `${indent * 2}ch`,
      outline: 0,
      ...(actionable && {
        color: 'cornflowerblue',
        cursor: 'pointer',
      }),
      ...(active && {
        background: 'rgba(255, 255, 255, 0.1)',
      }),
      ...style,
    }}
    {...rest}
  >
    {children}
    {badge && <span style={{ padding: '0 4px', fontSize: 10, opacity: 0.75 }}>{badge}</span>}
  </a>
)

const removeNulls = o => {
  if (typeof o !== 'object' && o !== null) {
    return o
  }
  const result = {}

  Object.keys(o).forEach(k => {
    if (!o[k] || typeof o[k] !== 'object') {
      if (o[k]) {
        result[k] = o[k] // If not null or not an object, copy value
      }
    }

    // The property is an object
    const val = removeNulls(o[k])

    if (typeof val === 'object' && val != null && Object.keys(val).length > 0) {
      result[k] = val
    }
  })

  return result
}

const DebugPanel: React.FC<DebugPanelProps> = props => {
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

  const [slot, setSlot] = React.useState('root')
  const [selectedFiberNav, selectFiberNav] = React.useState(null)

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
  let siteVariablesUsedInComponentVariables = []

  debugData.componentVariables
    .map(val => val.input)
    .forEach(
      val =>
        (siteVariablesUsedInComponentVariables = _.concat(
          siteVariablesUsedInComponentVariables,
          getValues(val, val => val.indexOf('siteVariables.') > -1),
        )),
    )

  const uniqUsedSiteVariables = _.uniq(siteVariablesUsedInComponentVariables)
  const siteVariablesDataWithNulls = debugData.siteVariables.map(val => ({
    ...val,
    resolved: uniqUsedSiteVariables.reduce((acc, next) => {
      const key = _.replace(next, 'siteVariables.', '')
      _.set(acc, key, _.get(val['resolved'], key))
      return acc
    }, {}),
  }))

  const siteVariablesData = siteVariablesDataWithNulls.map(val => ({
    ...val,
    resolved: removeNulls(val.resolved),
  }))

  const ownerNav = fiberNav.owner

  const parentNavs = []
  let parentNav = fiberNav.parent

  while (parentNav && !parentNav.isEqual(ownerNav)) {
    if (parentNav.stardustDebug) parentNavs.unshift(parentNav)
    parentNav = parentNav.parent
  }

  const component = fiberNav.name && <Line>{fiberNav.jsxString}</Line>

  return (
    <div style={debugPanelRoot(left)}>
      <div style={debugPanelHeader}>
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

      <ScrollToBottom style={debugPanelComponents}>
        <Line
          indent={0}
          {...(ownerNav.stardustDebug && {
            actionable: true,
            badge: 'debuggable',
            tabIndex: 0,
            onClick: e => {
              e.preventDefault()
              onFiberChanged(ownerNav)
            },
            onMouseEnter: e => selectFiberNav(ownerNav),
            onMouseLeave: e => selectFiberNav(null),
          })}
        >
          {ownerNav.name}
        </Line>
        <Line indent={1} style={{ color: '#ba645e' }}>
          render()
        </Line>
        {parentNavs.map((parent, i) => (
          <Line
            key={i}
            indent={2 + i}
            actionable
            badge="debuggable"
            tabIndex="0"
            onClick={e => {
              e.preventDefault()
              onFiberChanged(parent)
            }}
            onMouseEnter={e => selectFiberNav(parent)}
            onMouseLeave={e => selectFiberNav(null)}
          >
            {parent.jsxString}
          </Line>
        ))}
        <Line
          indent={3 + parentNavs.length}
          active
          badge="active"
          actionable
          tabIndex="0"
          onClick={e => {
            e.preventDefault()
            onFiberChanged(fiberNav)
          }}
          onMouseEnter={e => selectFiberNav(fiberNav)}
          onMouseLeave={e => selectFiberNav(null)}
        >
          {component}
        </Line>
      </ScrollToBottom>

      {selectedFiberNav && <DebugRect fiberNav={selectedFiberNav} />}

      <div style={debugPanelBody}>
        <div style={debugPanel}>
          <div style={debugHeaderContainer()}>
            <div style={debugHeader()}>Site variables</div>
          </div>
          {!_.isEmpty(siteVariablesData) && !_.isEmpty(uniqUsedSiteVariables) ? (
            <DebugPanelItem data={siteVariablesData} valueKey="resolved" idKey="debugId" />
          ) : (
            <div style={debugNoData()}>None in use</div>
          )}
        </div>

        <div style={debugPanel}>
          <div style={debugHeaderContainer()}>
            <div style={debugHeader()}>Variables</div>
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
            <div style={debugHeader()}>Styles</div>
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
          <div style={debugHeader()}>HTML Styles</div>
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

const debugPanelHeader: React.CSSProperties = {
  position: 'sticky',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 0 2px',
  top: '0',
  background: '#fff',
}

const commonIconStyle: React.CSSProperties = {
  display: 'inline-block',
  cursor: 'pointer',
  lineHeight: 1,
  margin: '0 4px',
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
  fontSize: '24px',
  color: 'grey',
  marginTop: '-4px',
  outline: '0',
}

const debugPanelIcon = (left, isLeftActive): React.CSSProperties => ({
  ...commonIconStyle,
  borderWidth: '2px',
  borderStyle: 'solid ',
  borderColor: '#888',
  [left ? 'borderLeftWidth' : 'borderRightWidth']: '6px',
  width: '16px',
  height: '14px',
  ...(left === isLeftActive && {
    borderColor: '#6495ed',
  }),
})

const debugPanelRoot = (left): React.CSSProperties => ({
  position: 'fixed',
  [left ? 'left' : 'right']: 0,
  top: 0,
  zIndex: 999999999,
  width: '350px',
  height: '100vh',
  color: '#222',
  background: '#fff',
  lineHeight: 1.1,
  fontSize: '12px',
  overflowY: 'scroll',
  boxShadow: '0 0 8px rgba(0, 0, 0, .1)',
})

const debugHeaderContainer = (): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
})

const debugHeader = (): React.CSSProperties => ({
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
  width: 'auto',
})

const debugPanelComponents: React.CSSProperties = {
  fontSize: '14px',
  padding: '8px',
  whiteSpace: 'pre',
  marginBottom: '8px',
  lineHeight: 1.4,
  background: '#222',
  overflowY: 'auto',
  color: '#CCC',
  fontFamily: 'monospace',
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
