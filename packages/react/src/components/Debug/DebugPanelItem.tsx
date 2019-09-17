import * as React from 'react'
import * as _ from 'lodash'
import DebugPanelData from './DebugPanelData'
import { find } from './utils'

const DebugPanelItem = props => {
  const [value, setValue] = React.useState('')
  const { data } = props

  const reversedData = JSON.parse(JSON.stringify(data)).reverse()
  const mergedThemes = []

  mergedThemes.push({}) // init

  for (let i = 1; i < data.length; i++) {
    mergedThemes.push(_.merge({}, mergedThemes[i - 1], reversedData[i - 1]))
  }

  const filterR = (search, data) => {
    let result = false

    Object.keys(data).forEach(key => {
      const value = data[key]

      if (find(data, key, search)) {
        result = true
      }

      // If the value is object invoke again
      if (typeof value === 'object' && filterR(search, value)) {
        result = true
      }
    })

    return result
  }

  return (
    <>
      <input
        onChange={e => setValue(e.target.value)}
        style={{ padding: '2px 4px', width: '100%', border: '1px solid #ccc' }}
        placeholder="Filter"
      />
      {reversedData.map((theme, idx) => {
        const filteredTheme =
          value === ''
            ? theme
            : Object.keys(theme)
                .filter(key => {
                  if (find(theme, key, value)) {
                    return true
                  }

                  // if the value is object invoke again
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
          <pre
            key={idx}
            style={{
              padding: '0.5em 0',
              borderTop: idx > 0 ? '1px solid #ddd' : 'none',
            }}
          >
            <DebugPanelData
              data={filteredTheme}
              prevMergedData={mergedThemes[idx]}
              highlightKey={value}
            />
          </pre>
        )
      })}
    </>
  )
}

export default DebugPanelItem
