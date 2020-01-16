import * as React from 'react'

interface Props {
  classes: any
}
export const BaseTextControl: React.FunctionComponent<Props> = props => {
  const { root: rootClasses = '' } = props.classes
  return <div className={rootClasses}>{props.children}</div>
}
