import * as _ from 'lodash'
import * as React from 'react'
import { link } from 'docs/src/utils/helpers'

const ComponentPropsOutline: any = (props: ComponentPropsOutlineProps) => {
  const { displayNames, parentDisplayName } = props
  if (displayNames.length < 2) return null

  const items: string[] = _.map(displayNames, displayName =>
    displayName === parentDisplayName
      ? displayName
      : displayName.replace(parentDisplayName, `${parentDisplayName}`),
  )
  return (
    <ul>
      {_.map(items, item => (
        <li key={item}>{link(item, `#${_.kebabCase(item)}`)}</li>
      ))}
    </ul>
  )
}

export interface ComponentPropsOutlineProps {
  displayNames: string[]
  parentDisplayName: string
}

export default ComponentPropsOutline
