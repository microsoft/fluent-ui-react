import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { getNextElement, focusAsync } from './focusUtilities'

import { AutoFocusZoneProps } from './AutoFocusZone.types'
import getUnhandledProps from '../../getUnhandledProps'
import getElementType from '../../getElementType'
import * as customPropTypes from '../../customPropTypes'
import { callable } from '../../index'
import Ref from '../../../components/Ref/Ref'

/** AutoFocusZone is used to focus the first element inside it's children */
export class AutoFocusZone extends React.Component<AutoFocusZoneProps, {}> {
  private root = React.createRef<HTMLElement>()

  static propTypes = {
    as: customPropTypes.as,
    firstFocusableSelector: PropTypes.string,
  }

  public componentDidMount(): void {
    this.findElementAndFocusAsync()
  }

  public render(): JSX.Element {
    const unhandledProps = getUnhandledProps(
      { handledProps: [..._.keys(AutoFocusZone.propTypes)] },
      this.props,
    )

    const ElementType = getElementType({}, this.props) as React.ComponentClass<AutoFocusZoneProps>

    return (
      <Ref innerRef={this.root}>
        <ElementType {...unhandledProps}>{this.props.children}</ElementType>
      </Ref>
    )
  }

  private findElementAndFocusAsync = () => {
    if (!this.root.current) return
    const { firstFocusableSelector } = this.props

    const focusSelector = callable(firstFocusableSelector)()

    const firstFocusableChild = focusSelector
      ? (this.root.current.querySelector(`.${focusSelector}`) as HTMLElement)
      : getNextElement(
          this.root.current,
          this.root.current.firstChild as HTMLElement,
          true,
          false,
          false,
          true,
        )

    firstFocusableChild && focusAsync(firstFocusableChild)
  }
}
