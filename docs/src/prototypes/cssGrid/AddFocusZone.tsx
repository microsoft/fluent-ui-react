import * as React from 'react'
import * as PropTypes from 'prop-types'

import UIComponent from 'src/lib/UIComponent'
import { Accessibility, FocusZoneMode } from 'src/lib/accessibility/interfaces'
import { IRenderResultConfig } from 'src/lib'
import { FocusZoneDirection } from 'src/lib/accessibility/FocusZone'

const accessibility: Accessibility = (props: any) => ({
  attributes: {},
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: true,
      preventDefaultWhenHandled: true,
      direction: FocusZoneDirection.horizontal,
    },
  },
})

class AddFocusZone extends UIComponent<any, any> {
  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.func,
  }

  static defaultProps = {
    as: 'ul',
    accessibility,
  }

  public renderComponent({ classes, rest }: IRenderResultConfig<any>): React.ReactNode {
    return (
      <div className={classes.root} {...rest}>
        {this.props.children}
      </div>
    )
  }
}

export default AddFocusZone
