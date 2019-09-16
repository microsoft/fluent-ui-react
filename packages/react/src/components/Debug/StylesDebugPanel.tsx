import * as React from 'react'
import * as _ from 'lodash'

const StylesData = props => {
  const { data, indent = 2, highlightKey, prevMergedData } = props

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
        const overriden =
          typeof data[key] !== 'object' &&
          prevMergedData &&
          prevMergedData[key] !== null &&
          prevMergedData[key] !== undefined
        return (
          <>
            <span
              key={key}
              style={{
                ...(overriden && { textDecoration: 'line-through' }),
                ...(highlightKey !== '' &&
                  _.toLower(key).indexOf(_.toLower(highlightKey)) !== -1 && {
                    backgroundColor: 'rgb(255,255,224)',
                    color: 'black',
                  }),
              }}
            >
              {' '.repeat(indent)}
              {`${key}: `}
              <StylesData
                data={data[key]}
                indent={indent + 2}
                prevMergedData={prevMergedData ? prevMergedData[key] : null}
                highlightKey={highlightKey}
              />
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

  const reversedData = data.slice(0).reverse()

  const mergedThemes = []

  mergedThemes.push({}) // init

  for (let i = 1; i < data.length; i++) {
    // TODO: consider using the same methods that mergeThemes uses...
    mergedThemes.push(_.merge({}, mergedThemes[i - 1], reversedData[i - 1]))
  }

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
      {reversedData.map((theme, idx) => {
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
              <StylesData
                data={filteredTheme}
                prevMergedData={mergedThemes[idx]}
                highlightKey={value}
              />
            </pre>
          </div>
        )
      })}
    </div>
  )
}

export default StylesDebugPanel
