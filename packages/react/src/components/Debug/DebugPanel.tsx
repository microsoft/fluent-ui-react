import * as React from 'react'
import * as _ from 'lodash'
import debugData from './debugData'
import PortalInner from '../Portal/PortalInner'

const VariablesDebugPanel = props => {
  const { name, data } = props
  return (
    <div>
      <b>{`${_.upperCase(name)}:`}</b>
      <hr />
      {data.reverse().map((theme, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          {' '}
          {/* fix the key */}
          <i>{`Theme ${idx}`}</i>
          <br />
          <pre>
            {'{'}
            <br />
            {Object.keys(theme.input).map(key => (
              <>
                <span
                  key={key}
                  style={{
                    paddingLeft: '10px',
                    // ...(row.overriden && { textDecoration: 'line-through' }),
                  }}
                >
                  {`${key}: ${
                    typeof theme.resolved[key] === 'string'
                      ? `"${theme.resolved[key]}"`
                      : theme.resolved[key]
                  }`}
                  {','}{' '}
                  {theme.input[key] !== theme.resolved[key] && (
                    <small style={{ color: '#999' }}>{`// ${theme.input[key]}`}</small>
                  )}
                </span>
                <br />
              </>
            ))}
            {'}'}
          </pre>
        </div>
      ))}
    </div>
  )
}

const Data = props => {
  const { data, indent = 2, highlightKey } = props

  if (typeof data !== 'object' || data === null) {
    if (typeof data === 'string') {
      return `"${data}"`
    }
    return data
  }

  return (
    <>
      {'{'}
      <br />
      {Object.keys(data).map(key => {
        return (
          <>
            <span
              key={key}
              style={{
                // ...(row.overriden && { textDecoration: 'line-through' }),
                ...(highlightKey !== '' &&
                  _.toLower(key).indexOf(_.toLower(highlightKey)) !== -1 && {
                    backgroundColor: 'rgb(255,255,224)',
                    color: 'black',
                  }),
              }}
            >
              {' '.repeat(indent)}
              {`${key}: `}
              <Data data={data[key]} indent={indent + 2} highlightKey={highlightKey} />
              {','}{' '}
            </span>
            <br />
          </>
        )
      })}
      {`${indent > 2 ? ' '.repeat(indent - 2) : ''}}`}
    </>
  )
}

const StylesDebugPanel = props => {
  const [value, setValue] = React.useState('')
  const { name, data } = props

  const filterR = (search, theme) => {
    let result = false
    // TODO add breaks
    Object.keys(theme).forEach(key => {
      if (_.toLower(key).indexOf(_.toLower(search)) !== -1) {
        result = true
      }
      if (typeof theme[key] === 'object' && filterR(search, theme[key])) {
        result = true
      }
    })

    return result
  }

  return (
    <div>
      <b>{`${_.upperCase(name)}:`}</b>
      <hr />
      <input onChange={e => setValue(e.target.value)} style={{ width: '100%' }} />
      {data.reverse().map((theme, idx) => {
        const filteredTheme =
          value === ''
            ? theme
            : Object.keys(theme)
                .filter(key => {
                  if (_.toLower(key).indexOf(_.toLower(value)) !== -1) {
                    return true
                  }
                  if (typeof theme[key] === 'object' && theme[key] !== null) {
                    return filterR(value, theme[key])
                  }
                  return false
                })
                .reduce((obj, key) => {
                  obj[key] = theme[key]
                  return obj
                }, {})
        return (
          <div key={idx} style={{ marginBottom: '10px' }}>
            {/* fix the key */}
            <i>{`Theme ${idx}`}</i>
            <br />
            <pre>
              <Data data={filteredTheme} highlightKey={value} />
            </pre>
          </div>
        )
      })}
    </div>
  )
}

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
        <p
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
        </p>
      </div>
    </PortalInner>
  )
}
export default DebugPanel
