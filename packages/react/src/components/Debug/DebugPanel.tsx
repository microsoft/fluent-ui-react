import * as React from 'react'
import * as _ from 'lodash'
import debugData from './debugData'
import PortalInner from '../Portal/PortalInner'

const DebigPanelitem = props => {
  const { name, data } = props
  return (
    <div>
      <b>{`${_.upperCase(name)}:`}</b>
      <hr />
      {data.map((theme, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          {' '}
          {/* fix the key */}
          <i>{`Theme ${idx}`}</i>
          <br />
          <p>
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
                  }`}{' '}
                  {','}{' '}
                  {theme.input[key] !== theme.resolved[key] && (
                    <small style={{ color: '#999' }}>{`// ${theme.input[key]}`}</small>
                  )}
                </span>
                <br />
              </>
            ))}
            {'}'}
          </p>
        </div>
      ))}
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
          <DebigPanelitem data={debugData.variables} name="variables" />
          {/* <Styles data={debugData.styles}/> */}
        </p>
      </div>
    </PortalInner>
  )
}
export default DebugPanel
