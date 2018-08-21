import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import { createShorthandFactory, customPropTypes, pxToRem, UIComponent } from '../../lib'
import Layout from '../Layout'

class ItemLayout extends UIComponent<any, any> {
  static create: Function

  static displayName = 'ItemLayout'

  static className = 'ui-itemlayout'

  static propTypes = {
    as: customPropTypes.as,

    /** Additional classes. */
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
    renderContentArea: PropTypes.any,
    renderHeaderArea: PropTypes.any,
    renderMainArea: PropTypes.any,

    /** Styled applied to the root element of the rendered component. */
    rootCSS: PropTypes.object,
    /** Styled applied to the media element of the rendered component. */
    mediaCSS: PropTypes.object,
    /** Styled applied to the header element of the rendered component. */
    headerCSS: PropTypes.object,
    /** Styled applied to the header media element of the rendered component. */
    headerMediaCSS: PropTypes.object,
    /** Styled applied to the content element of the rendered component. */
    contentCSS: PropTypes.object,
    /** Styled applied to the content element of the rendered component. */
    contentMediaCSS: PropTypes.object,
    /** Styled applied to the end media element of the rendered component. */
    endMediaCSS: PropTypes.object,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'className',
    'content',
    'contentCSS',
    'contentMedia',
    'contentMediaCSS',
    'debug',
    'endMedia',
    'endMediaCSS',
    'header',
    'headerCSS',
    'headerMedia',
    'headerMediaCSS',
    'media',
    'mediaCSS',
    'renderContentArea',
    'renderHeaderArea',
    'renderMainArea',
    'rootCSS',
    'styles',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

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
    const {
      as,
      debug,
      endMedia,
      media,
      renderMainArea,
      rootCSS,
      mediaCSS,
      endMediaCSS,
    } = this.props

    const startArea = media
    const mainArea = renderMainArea(this.props, this.state, classes)
    const endArea = endMedia

    const mergedMediaClasses = cx('ui-item-layout__media', classes.media)
    const mergedEndMediaClasses = cx('ui-item-layout__endMedia', classes.endMedia)

    return (
      <Layout
        as={as}
        className={classes.root}
        styles={{ root: styles.root }}
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

ItemLayout.create = createShorthandFactory(ItemLayout, main => ({ main }))

export default ItemLayout
