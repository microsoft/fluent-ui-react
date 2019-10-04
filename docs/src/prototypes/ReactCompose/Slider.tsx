// import './styles.css'
import {
  MostlyRedSlider,
  MyBrandSlider,
  ThemeContext,
  ThumbOverridenSlider,
  TrackUpdateSlider,
} from '@stardust-ui/react-prototype-compose'
import * as React from 'react'

interface Theme {
  brandColor: string
  brandDarkColor: string
}

const simpleTheme: Theme = {
  brandColor: '#fac',
  brandDarkColor: '#c79',
}

const darkTheme: Theme = {
  brandColor: '#111',
  brandDarkColor: '#000',
}

export const SliderExamples = () => {
  const [value, setValue] = React.useState(10)
  const setValueFromEvent = React.useCallback((ev: any, val: any) => setValue(val), [setValue])

  const renderControlExamples = (title: string) => {
    return (
      <div>
        <h2>{title}</h2>
        <div className="control-examples">
          <div className="control-example">
            <h3>MyBrandSlider</h3>
            <MyBrandSlider
              min={0}
              max={500}
              step={1}
              snapToStep={false}
              value={value}
              onChange={setValueFromEvent}
            />
          </div>
          <div className="control-example">
            <h3>MostlyRedSlider</h3>
            <MostlyRedSlider
              min={0}
              max={500}
              step={1}
              snapToStep={false}
              value={value}
              onChange={setValueFromEvent}
            />
          </div>
          <div className="control-example">
            <h3>ThumbOverridenSlider</h3>
            <ThumbOverridenSlider
              min={0}
              max={500}
              step={1}
              snapToStep={false}
              value={value}
              onChange={setValueFromEvent}
            />
          </div>
          <div className="control-example">
            <h3>TrackUpdateSlider</h3>
            <TrackUpdateSlider
              min={0}
              max={500}
              step={1}
              snapToStep={false}
              value={value}
              onChange={setValueFromEvent}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <p>Value is {value}</p>
      {renderControlExamples('Unthemed (see baked-in theme)')}
      <ThemeContext.Provider value={simpleTheme}>
        {renderControlExamples('Simple Theme')}
      </ThemeContext.Provider>{' '}
      <ThemeContext.Provider value={darkTheme}>
        {renderControlExamples('Dark Theme')}
      </ThemeContext.Provider>
    </div>
  )
}
