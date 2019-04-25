import * as React from 'react'
import { KnobComponentProps, KnobComponents } from './types'

const KnobField: React.FunctionComponent<KnobComponentProps> = props => (
  <div
    style={{
      borderBottom: '1px solid rgb(234, 234, 234)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '3px 0',
    }}
  >
    {props.children}
  </div>
)

const KnobControl: React.FunctionComponent<KnobComponentProps> = props => (
  <span style={{ verticalAlign: 'middle', width: '150px' }}>{props.children}</span>
)

const KnobLabel: React.FunctionComponent<KnobComponentProps> = props => (
  <span style={{ marginRight: 5 }}>{props.content || <code>{props.name}</code>}</span>
)

const KnobBoolean: React.FunctionComponent<KnobComponentProps> = props => (
  <input
    checked={props.value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      props.setValue(e.target.checked)
    }}
    type="checkbox"
    value={props.value}
  />
)

const KnobSelect: React.FunctionComponent<KnobComponentProps> = props => (
  <select
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
      props.setValue(e.target.value)
    }}
    value={props.value}
  >
    {props.values &&
      props.values.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
  </select>
)

const KnobRange: React.FunctionComponent<KnobComponentProps> = props => {
  const parseValue = (parseValue: string): number => {
    const hasDecimal = /\.\d/.test(parseValue)

    return hasDecimal ? parseFloat(parseValue) : parseInt(parseValue, 10)
  }
  const { defaultValue, unit } = React.useMemo(
    () => ({
      defaultValue: parseValue(props.value),
      unit: `${props.value}`.replace(`${parseValue(props.value)}`, ''),
    }),
    [],
  )

  return (
    <input
      type="range"
      min="0"
      max={defaultValue * 3}
      step="1"
      value={parseValue(props.value)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue(`${e.target.value}${unit}`)
      }}
      style={{ width: '100%' }}
    />
  )
}

const KnobString: React.FunctionComponent<KnobComponentProps> = props => (
  <input
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      props.setValue(e.target.value)
    }}
    value={props.value}
  />
)

const defaultComponents: KnobComponents = {
  KnobControl,
  KnobField,
  KnobLabel,

  KnobBoolean,
  KnobRange,
  KnobSelect,
  KnobString,
}

export default defaultComponents
