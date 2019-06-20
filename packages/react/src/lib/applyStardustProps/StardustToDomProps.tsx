import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import cx from 'classnames'
// @ts-ignore
import { ThemeContext } from 'react-fela'
import { ComponentSlotStyle } from '../../themes/types'
import renderComponent from '../renderComponent'
import { ProviderContextPrepared } from '../../types'

export type StardustToDomProps = {
  styles: ComponentSlotStyle
  accessibility: any
  restProps: any
}

const StardustToDomProps: React.FC<StardustToDomProps> = props => {
  const children = props.children as React.ReactElement
  const context: ProviderContextPrepared = React.useContext(ThemeContext)

  return renderComponent(
    {
      className: undefined,
      defaultProps: {},
      displayName: StardustToDomProps.displayName,
      handledProps: stylesToClassesHandledProps,
      props,
      state: {},
      actionHandlers: undefined,
      focusZoneRef: undefined,
      render: config => {
        const childrenProps = (children as React.ReactElement).props

        const mergedProps = {
          ...childrenProps,
          ...props.restProps,
        }

        const mergedClasses = cx(mergedProps.className, config.classes.root)

        return React.cloneElement(children, {
          ...mergedProps,
          ...(mergedClasses && { className: mergedClasses }),
          ...config.accessibility.attributes.root,
        })
      },
    },
    context,
  )
}

StardustToDomProps.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  accessibility: PropTypes.any,
  restProps: PropTypes.any,
}

const stylesToClassesHandledProps = _.keys(StardustToDomProps.propTypes)

export default StardustToDomProps
