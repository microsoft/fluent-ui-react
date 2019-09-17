import * as React from 'react'
import * as _ from 'lodash'

const includes = (s, target) => _.toLower(s).indexOf(_.toLower(target)) !== -1

const StylesData = props => {
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
      <br />
      {Object.keys(data).map(key => {
        const overriden =
          typeof data[key] !== 'object' &&
          prevMergedData &&
          prevMergedData[key] !== null &&
          prevMergedData[key] !== undefined
        return (
          <div key={key}>
            <span
              style={{
                ...(highlightKey !== '' &&
                  includes(key, highlightKey) && {
                    backgroundColor: 'rgb(255,255,224)',
                  }),
              }}
            >
              {' '.repeat(indent)}
              <span style={{ ...(overriden && { textDecoration: 'line-through' }) }}>
                <span style={{ color: typeof data[key] === 'object' ? 'grey' : 'red' }}>{key}</span>
                {': '}
                <StylesData
                  data={data[key]}
                  indent={indent + 2}
                  prevMergedData={prevMergedData ? prevMergedData[key] : null}
                  highlightKey={highlightKey}
                />
              </span>
              {','}{' '}
            </span>
          </div>
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
    mergedThemes.push(_.merge({}, mergedThemes[i - 1], reversedData[i - 1]))
  }

  const filterR = (search, theme) => {
    let result = false

    Object.keys(theme).forEach(key => {
      if (includes(key, search)) {
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
      <b style={{ fontSize: '18px' }}>{`${_.upperCase(name)}:`}</b>
      <hr />
      <input
        onChange={e => setValue(e.target.value)}
        placeholder={'Search for property'}
        style={{ width: '100%' }}
      />
      {reversedData.map((theme, idx) => {
        const filteredTheme =
          value === ''
            ? theme
            : Object.keys(theme)
                .filter(key => {
                  if (includes(key, value)) {
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
            {idx > 0 && <hr />}
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
