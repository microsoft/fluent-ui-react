import * as _ from 'lodash'

import { childrenExist, pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DividerPropsWithDefaults } from '../../../../components/Divider/Divider'
import { DividerVariables } from './dividerVariables'

const beforeAndAfter = (size: number, variables: DividerVariables, colors): ICSSInJSStyle => ({
  content: '""',
  flex: 1,
  height: `${size + 1}px`,
  background: _.get(colors, 'borderDefault', variables.dividerColor),
})

const dividerStyles: ComponentSlotStylesInput<DividerPropsWithDefaults, DividerVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { children, color, fitted, size, important, content } = props
    const colors = variables.colorScheme[color]
    return {
      color: _.get(colors, 'borderDefault', variables.textColor),
      display: 'flex',
      alignItems: 'center',
      ...(!fitted && {
        paddingTop: variables.dividerPadding,
        paddingBottom: variables.dividerPadding,
      }),
      ...(important && {
        fontWeight: variables.importantFontWeight,
      }),
      ...(childrenExist(children) || content
        ? {
            textAlign: 'center',
            fontSize: pxToRem(12 + size),
            lineHeight: variables.textLineHeight,
            '::before': {
              ...beforeAndAfter(size, variables, colors),
              marginRight: pxToRem(20),
            },
            '::after': {
              ...beforeAndAfter(size, variables, colors),
              marginLeft: pxToRem(20),
            },
          }
        : {
            '::before': {
              ...beforeAndAfter(size, variables, colors),
            },
          }),
    }
  },
}

export default dividerStyles
