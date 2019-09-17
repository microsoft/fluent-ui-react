import * as React from 'react'
import * as _ from 'lodash'

const VariablesDebugPanel = props => {
  const { data } = props

  const reversedData = JSON.parse(JSON.stringify(data)).reverse()
  const mergedThemes = []
  mergedThemes.push({}) // init

  for (let i = 1; i < data.length; i++) {
    mergedThemes.push(_.merge({}, mergedThemes[i - 1], reversedData[i - 1]))
  }

  return reversedData.map((themeVariables, idx) => {
    const mergedData = mergedThemes[idx]
    return (
      <div key={idx}>
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
        <pre>
          {'{'}
          {Object.keys(themeVariables).map((key, idx) => {
            const overriden = !!mergedData[key]
            const value = themeVariables[key]

            return (
              <div key={key}>
                {'  '}
                <span style={{ textDecoration: overriden ? 'line-through' : 'none' }}>
                  <span style={{ color: 'red' }}>{key}</span>
                  {`: ${
                    typeof value === 'string'
                      ? `'${value}'`
                      : typeof value === 'object' && value !== null
                      ? '{ ... }' // TODO: recursively resolve variable objects
                      : value
                  }`}
                </span>
                {','} {/* {theme.input[key] !== theme.resolved[key] && ( */}
                {/* <small style={{ color: '#999' }}>{`// ${theme.input[key]}`}</small> */}
                {/* )} */}
              </div>
            )
          })}
          {'}'}
        </pre>
      </div>
    )
  })
}

export default VariablesDebugPanel
