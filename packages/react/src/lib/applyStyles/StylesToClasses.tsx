import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import cx from 'classnames'
// @ts-ignore
import { ThemeContext } from 'react-fela'
import { ComponentSlotStyle } from '../../themes/types'
import renderComponent from '../renderComponent'
import { ProviderContextPrepared } from '../../types'

export type StylesToClassesProps = {
  styles: ComponentSlotStyle
}

const displayName = 'StylesToClasses'

const StylesToClasses: React.FC<StylesToClassesProps> = props => {
  const children = props.children as React.ReactElement
  const context: ProviderContextPrepared = React.useContext(ThemeContext)

  return renderComponent(
    {
      className: `ui-${_.kebabCase(displayName)}`,
      defaultProps: {},
      displayName,
      handledProps: stylesToClassesHandledProps,
      props,
      state: {},
      actionHandlers: undefined,
      focusZoneRef: undefined,
      render: config =>
        React.cloneElement(children, {
          className: cx((children as React.ReactElement).props.className, config.classes.root),
        }),
    },
    context,
  )
}

StylesToClasses.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}

const stylesToClassesHandledProps = _.keys(StylesToClasses.propTypes)

export default StylesToClasses
