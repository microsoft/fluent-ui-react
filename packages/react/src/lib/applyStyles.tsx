import * as React from 'react'
import cx from 'classnames'
import createComponentInternal from './createComponent'

export const IS_STARDUST_PROP_NAME = '__isStardust'

const ApplyStylesAsClasses = createComponentInternal({
  displayName: 'ApplyStylesAsClasses',
  render: (config, { children }) =>
    React.cloneElement(children, {
      className: cx((children as React.ReactElement).props.className, config.classes.root),
    }),
})

const applyStyles = (element: React.ReactElement, styles: any) => {
  if (!element || !styles) {
    return element
  }

  if (element.type && element.type[IS_STARDUST_PROP_NAME]) {
    return React.cloneElement(element, {
      styles: {
        ...element.props.styles,
        ...styles,
      },
    })
  }

  return <ApplyStylesAsClasses styles={styles}>{element}</ApplyStylesAsClasses>
}

export default applyStyles
