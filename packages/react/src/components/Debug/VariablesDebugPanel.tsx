import * as React from 'react'
import * as _ from 'lodash'

const VariablesDebugPanel = props => {
  const { name, data } = props
  return (
    <div>
      <b>{`${_.upperCase(name)}:`}</b>
      <hr />
      {data.reverse().map((theme, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          <i>{`Theme ${idx}`}</i>
          <br />
          <pre>
            {'{'}
            <br />
            {Object.keys(theme.input).map(key => (
              <>
                <span>
                  {'  '}
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

export default VariablesDebugPanel
