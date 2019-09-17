import * as React from 'react'
import { find, isOverridden } from './utils'

const DebugPanelData = props => {
  const { data, indent = 2, highlightKey, prevMergedData } = props

  if (typeof data === 'undefined') {
    return <span>undefined</span>
  }

  if (data === null || typeof data !== 'object') {
    return <span>{JSON.stringify(data)}</span>
  }

  return (
    <>
      {'{'}
      {Object.keys(data).map(key => {
        const value = data[key]
        const highlight = find(data, key, highlightKey)
        const overridden = isOverridden(data, key, prevMergedData)

        return (
          <div key={key}>
            <span style={{ background: highlight ? 'rgb(255,255,224)' : '' }}>
              {' '.repeat(indent)}
              <span style={{ textDecoration: overridden ? 'line-through' : 'none' }}>
                <span style={{ color: typeof value === 'object' ? 'grey' : 'red' }}>{key}</span>
                {': '}
                <DebugPanelData
                  data={value}
                  indent={indent + 2}
                  prevMergedData={prevMergedData ? prevMergedData[key] : null}
                  highlightKey={highlightKey}
                />
              </span>
              {','}
            </span>
          </div>
        )
      })}
      {`${indent > 2 ? ' '.repeat(indent - 2) : ''}}`}
    </>
  )
}

export default DebugPanelData
