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
  <span style={{ display: 'flex', flexGrow: 1, marginRight: 5 }}>
    {props.displayName || props.name}
  </span>
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
  KnobString,
}

export default defaultComponents
