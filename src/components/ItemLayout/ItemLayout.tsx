import * as React from 'react'
import * as PropTypes from 'prop-types'

import { createShorthandFactory, customPropTypes, pxToRem, UIComponent } from '../../lib'
import Layout from '../Layout/Layout'
import {
  ComponentSlotClasses,
  ComponentSlotStyle,
  ComponentVariablesInput,
} from '../../themes/types'
import { Extendable } from '../../../types/utils'

export interface ItemLayoutProps {
  as?: any
  className?: string
  contentMedia?: any
  content?: any
  debug?: boolean
  header?: any
  endMedia?: any
  headerMedia?: any
  media?: any
  renderContent?: (
    props: ItemLayoutProps,
    state: any,
    classes: ComponentSlotClasses,
  ) => React.ReactNode
  renderHeader?: (
    props: ItemLayoutProps,
    state: any,
    classes: ComponentSlotClasses,
  ) => React.ReactNode
  renderMain?: (
    props: ItemLayoutProps,
    state: any,
    classes: ComponentSlotClasses,
  ) => React.ReactNode
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

export type ItemLayoutPropsWithDefaults = ItemLayoutProps & typeof ItemLayout.defaultProps

/**
 * The Item Layout handles layout styles for menu items, list items and other similar item templates.
 */
class ItemLayout extends UIComponent<Extendable<ItemLayoutProps>, any> {
  static create: Function

  static displayName = 'ItemLayout'

  static className = 'ui-itemlayout'

  static propTypes = {
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    contentMedia: PropTypes.any,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    media: PropTypes.any,
    renderContent: PropTypes.func,
    renderHeader: PropTypes.func,
    renderMain: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const {
      as,
      content,
      contentMedia,
      debug,
      endMedia,
      header,
      headerMedia,
      media,
      truncateContent,
      truncateHeader,
    } = this.props as ItemLayoutPropsWithDefaults

    return (
      <Layout
        as={as}
        className={classes.root}
        // alignItems="center"
        styles={styles.root}
        gap={pxToRem(8)}
        debug={debug}
        start={Layout.Area.create(media, {
          defaultProps: {
            as: 'span',
            styles: styles.mediaCSS,
            className: classes.media,
          },
        })}
        main={
          <Layout
            vertical
            start={
              <Layout
                main={Layout.Area.create(header, {
                  truncate: truncateHeader,
                  defaultProps: {
                    styles: styles.header,
                    className: classes.header,
                  },
                })}
                end={Layout.Area.create(headerMedia, {
                  defaultProps: {
                    styles: styles.headerMedia,
                    className: classes.headerMedia,
                  },
                })}
              />
            }
            end={
              <Layout
                main={Layout.Area.create(content, {
                  truncate: truncateContent,
                  defaultProps: {
                    styles: styles.content,
                    className: classes.content,
                  },
                })}
                end={Layout.Area.create(contentMedia, {
                  defaultProps: {
                    styles: styles.contentMedia,
                    className: classes.contentMedia,
                  },
                })}
              />
            }
          />
        }
        end={Layout.Area.create(endMedia, {
          defaultProps: {
            as: 'span',
            content: endMedia,
            styles: styles.endMedia,
            className: classes.endMedia,
          },
        })}
        {...rest}
      />
    )
  }
}

ItemLayout.create = createShorthandFactory(ItemLayout, main => ({ main }))

export default ItemLayout
