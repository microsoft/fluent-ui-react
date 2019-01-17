import * as _ from 'lodash'

import { childrenExist, pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DividerPropsWithDefaults } from '../../../../components/Divider/Divider'
import { DividerVariables } from './dividerVariables'

const beforeAndAfter = (
  color: string,
  size: number,
  variables: DividerVariables,
): ICSSInJSStyle => ({
  content: '""',
  flex: 1,
  height: `${size + 1}px`,
  background: _.get(variables.colors, color, variables.dividerColor),
})

const dividerStyles: ComponentSlotStylesInput<DividerPropsWithDefaults, DividerVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { children, color, fitted, size, important, content } = props
    return {
      color: _.get(variables.colors, color, variables.textColor),
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
              ...beforeAndAfter(color, size, variables),
              marginRight: pxToRem(20),
            },
            '::after': {
              ...beforeAndAfter(color, size, variables),
              marginLeft: pxToRem(20),
            },
          }
        : {
            '::before': {
              ...beforeAndAfter(color, size, variables),
            },
          }),
    }
  },
}

export default dividerStyles
