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
  KnobSelect,
  KnobString,
}

export default defaultComponents
