import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'

import {
  createShorthandFactory,
  pxToRem,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
} from '../../lib'
import Layout from '../Layout/Layout'
import { ComponentSlotClasses, ICSSInJSStyle } from '../../themes/types'
import { ReactProps } from '../../../types/utils'

export interface ItemLayoutProps extends UIComponentProps, ContentComponentProps<any> {
  contentMedia?: any
  /** Toggle debug mode */
  debug?: boolean
  header?: any
  endMedia?: any
  headerMedia?: any
  media?: any
  renderContentArea?: (
    props: ItemLayoutProps,
    state: any,
    classes: ComponentSlotClasses,
  ) => React.ReactNode
  renderHeaderArea?: (
    props: ItemLayoutProps,
    state: any,
    classes: ComponentSlotClasses,
  ) => React.ReactNode
  renderMainArea?: (
    props: ItemLayoutProps,
    state: any,
    classes: ComponentSlotClasses,
  ) => React.ReactNode
  /** Styled applied to the root element of the rendered component. */
  rootCSS?: ICSSInJSStyle
  /** Styled applied to the media element of the rendered component. */
  mediaCSS?: ICSSInJSStyle
  /** Styled applied to the header element of the rendered component. */
  headerCSS?: ICSSInJSStyle
  /** Styled applied to the header media element of the rendered component. */
  headerMediaCSS?: ICSSInJSStyle
  /** Styled applied to the content element of the rendered component. */
  contentCSS?: ICSSInJSStyle
  /** Styled applied to the content element of the rendered component. */
  contentMediaCSS?: ICSSInJSStyle
  /** Styled applied to the end media element of the rendered component. */
  endMediaCSS?: ICSSInJSStyle
  truncateContent?: boolean
  truncateHeader?: boolean
}

/**
 * The Item Layout handles layout styles for menu items, list items and other similar item templates.
 */
class ItemLayout extends UIComponent<ReactProps<ItemLayoutProps>, any> {
  static create: Function

  static displayName = 'ItemLayout'

  static className = 'ui-itemlayout'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    contentMedia: PropTypes.any,
    content: PropTypes.any,
    debug: PropTypes.bool,
    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,
    media: PropTypes.any,
    renderContentArea: PropTypes.func,
    renderHeaderArea: PropTypes.func,
    renderMainArea: PropTypes.func,
    rootCSS: PropTypes.object,
    mediaCSS: PropTypes.object,
    headerCSS: PropTypes.object,
    headerMediaCSS: PropTypes.object,
    contentCSS: PropTypes.object,
    contentMediaCSS: PropTypes.object,
    endMediaCSS: PropTypes.object,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',

    renderMainArea: (props, state, classes) => {
      const { renderHeaderArea, renderContentArea } = props

      const headerArea = renderHeaderArea(props, state, classes)
      const contentArea = renderContentArea(props, state, classes)

      return (
        <div
          className="ui-item-layout__main"
          style={{
            gridTemplateRows: '1fr 1fr',
          }}
        >
          {headerArea}
          {contentArea}
        </div>
      )
    },

    renderHeaderArea: (props, state, classes) => {
      const { debug, header, headerMedia, truncateHeader, headerCSS, headerMediaCSS } = props

      const mergedClasses = cx('ui-item-layout__header', classes.header)
      const mediaClasses = cx('ui-item-layout__headerMedia', classes.headerMedia)

      return !header && !headerMedia ? null : (
        <Layout
          className={mergedClasses}
          alignItems="end"
          gap={pxToRem(8)}
          debug={debug}
          truncateMain={truncateHeader}
          main={header}
          rootCSS={headerCSS}
          end={
            headerMedia && (
              <span style={headerMediaCSS} className={mediaClasses}>
                {headerMedia}
              </span>
            )
          }
        />
      )
    },

    renderContentArea: (props, state, classes) => {
      const { debug, content, contentMedia, truncateContent, contentCSS, contentMediaCSS } = props

      const mergedClasses = cx('ui-item-layout__content', classes.content)
      const mediaClasses = cx('ui-item-layout__contentMedia', classes.contentMedia)

      return !content && !contentMedia ? null : (
        <Layout
          className={mergedClasses}
          alignItems="start"
          gap={pxToRem(8)}
          debug={debug}
          truncateMain={truncateContent}
          rootCSS={contentCSS}
          main={content}
          end={
            contentMedia && (
              <span style={contentMediaCSS} className={mediaClasses}>
                {contentMedia}
              </span>
            )
          }
        />
      )
    },
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { as, debug, endMedia, media, renderMainArea, rootCSS, mediaCSS, endMediaCSS } = this
      .props as ItemLayoutPropsWithDefaults

    const startArea = media
    const mainArea = renderMainArea(this.props, this.state, classes)
    const endArea = endMedia

    const mergedMediaClasses = cx('ui-item-layout__media', classes.media)
    const mergedEndMediaClasses = cx('ui-item-layout__endMedia', classes.endMedia)

    return (
      <Layout
        as={as}
        className={classes.root}
        styles={styles.root}
        rootCSS={rootCSS}
        alignItems="center"
        gap={pxToRem(8)}
        debug={debug}
        reducing
        start={
          startArea && (
            <span style={mediaCSS} className={mergedMediaClasses}>
              {startArea}
            </span>
          )
        }
        main={mainArea}
        end={
          endArea && (
            <span style={endMediaCSS} className={mergedEndMediaClasses}>
              {endArea}
            </span>
          )
        }
        {...rest}
      />
    )
  }
}

ItemLayout.create = createShorthandFactory(ItemLayout, 'content')

export default ItemLayout

export type ItemLayoutPropsWithDefaults = ItemLayoutProps & typeof ItemLayout.defaultProps
