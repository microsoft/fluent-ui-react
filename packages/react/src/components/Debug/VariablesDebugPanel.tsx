import * as React from 'react'
import * as _ from 'lodash'

const VariablesDebugPanel = props => {
  const { name, data } = props

  const reversedData = JSON.parse(JSON.stringify(data)).reverse()
  const mergedThemes = []
  mergedThemes.push({}) // init

  for (let i = 1; i < data.length; i++) {
    mergedThemes.push(_.merge({}, mergedThemes[i - 1], reversedData[i - 1]))
  }

  return (
    <div>
      <b style={{ fontSize: '18px' }}>{name}</b>
      {reversedData.map((themeVariables, idx) => {
        const mergedData = mergedThemes[idx]
        return (
          <div key={idx} style={{ marginBottom: '10px' }}>
            {idx > 0 && (
              <hr
                style={{
                  height: '1px',
                  color: '#ccc',
                  backgroundColor: '#ccc',
                  border: 'none',
                }}
              />
            )}
            <br />
            <pre>
              {'{'}
              <br />
              {Object.keys(themeVariables).map((key, idx) => {
                const overriden = !!mergedData[key]

                return (
                  <div key={key}>
                    <span>
                      {'  '}
                      <span style={{ ...(overriden && { textDecoration: 'line-through' }) }}>
                        <span style={{ color: 'red' }}>{key}</span>
                        {`: ${
                          typeof themeVariables[key] === 'string'
                            ? `"${themeVariables[key]}"`
                            : themeVariables[key]
                        }`}
                      </span>
                      {','} {/* {theme.input[key] !== theme.resolved[key] && ( */}
                      {/* <small style={{ color: '#999' }}>{`// ${theme.input[key]}`}</small> */}
                      {/* )} */}
                    </span>
                  </div>
                )
              })}
              {'}'}
            </pre>
          </div>
        )
      })}
    </div>
  )
}

export default VariablesDebugPanel
