import * as React from 'react'
import { Ref } from '@stardust-ui/react-component-ref'

import { Extendable } from '../../types'

interface UpdatableListProps {
  /**
   * Component that will be rendered.
   */
  Component: React.ComponentType

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef?: React.Ref<HTMLElement>

  /**
   * Function that will trigger the rerender.
   */
  scheduleUpdate: Function

  /**
   * Array of conditions to be met in order to trigger a subsequent render.
   */
  updateDependencies: any[]
}

const UpdatableComponent: React.FunctionComponent<Extendable<UpdatableListProps>> = props => {
  const { Component, innerRef, scheduleUpdate, updateDependencies, ...rest } = props

  React.useEffect(() => scheduleUpdate && scheduleUpdate(), updateDependencies)

  if (!innerRef) return <Component {...rest} />
  return (
    <Ref innerRef={innerRef}>
      <Component {...rest} />
    </Ref>
  )
}

export default UpdatableComponent
