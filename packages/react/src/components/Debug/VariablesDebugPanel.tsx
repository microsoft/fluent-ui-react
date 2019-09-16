import * as React from 'react'
import * as _ from 'lodash'

const VariablesDebugPanel = props => {
  const { name, data } = props
  return (
    <div>
      <b>{`${_.upperCase(name)}:`}</b>
      <hr />
      {data.reverse().map((themeVariables, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          <i>{`Theme ${idx}`}</i>
          <br />
          <pre>
            {'{'}
            <br />
            {Object.keys(themeVariables).map(key => (
              <div key={key}>
                <span>
                  {'  '}
                  {`${key}: ${
                    typeof themeVariables[key] === 'string'
                      ? `"${themeVariables[key]}"`
                      : themeVariables[key]
                  }`}
                  {','} {/* {theme.input[key] !== theme.resolved[key] && ( */}
                  {/* <small style={{ color: '#999' }}>{`// ${theme.input[key]}`}</small> */}
                  {/* )} */}
                </span>
              </div>
            ))}
            {'}'}
          </pre>
        </div>
      ))}
    </div>
  )
}

export default VariablesDebugPanel
