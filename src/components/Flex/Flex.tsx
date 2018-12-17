import * as React from 'react'

/**
 * Props to support:
 * - align: 'center'
 * - justify: 'center'
 * - row
 * - column
 * - height
 * - width
 * - inline
 *
 * - all native props of Flex
 */

const Flex = (props: any) => {
  const { children, center, row, column, justify, align, space, inline, ...rest } = props

  const stylesFromProps = {
    ...(inline && { display: 'inline-flex' }),

    ...(row && { flexDirection: 'row' }),
    ...(column && { flexDirection: 'column' }),

    ...(center && {
      justifyContent: 'center',
      alignItems: 'center',
    }),

    ...(justify && { justifyContent: justify }),
    ...(space && { justifyContent: `space-${space}` }),

    ...(align && { alignItems: align }),

    ...rest,
  }

  const flexStyle = {
    display: 'flex',
    background: 'lightgrey',

    ...stylesFromProps,
  }

  return <div style={flexStyle}>{children}</div>
}

const createFlexSelfAlign = align => props => {
  const { children } = props

  return React.Children.map(children, element => {
    return React.cloneElement(element as React.ReactElement<any>, {
      style: { alignSelf: `flex-${align}` },
    })
  })
}

Flex.Start = createFlexSelfAlign('start')
Flex.Center = createFlexSelfAlign('center')
Flex.End = createFlexSelfAlign('end')

export default Flex
