import * as _ from 'lodash'

import { childrenExist, pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DividerPropsWithDefaults } from '../../../../components/Divider/Divider'
import { DividerVariables } from './dividerVariables'

const beforeAndAfter = (
  color: string,
  size: number,
  variables: DividerVariables,
  colors,
): ICSSInJSStyle => ({
  content: '""',
  flex: 1,
  height: `${size + 1}px`,
  background: _.get(colors, color, variables.dividerColor),
})

const dividerStyles: ComponentSlotStylesInput<DividerPropsWithDefaults, DividerVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { children, color, fitted, size, important, content } = props
    const colors = variables.colorScheme[color]
    return {
      color: _.get(colors, color, variables.textColor),
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
              ...beforeAndAfter(color, size, variables, colors),
              marginRight: pxToRem(20),
            },
            '::after': {
              ...beforeAndAfter(color, size, variables, colors),
              marginLeft: pxToRem(20),
            },
          }
        : {
            '::before': {
              ...beforeAndAfter(color, size, variables, colors),
            },
          }),
    }
  },
}

export default dividerStyles
