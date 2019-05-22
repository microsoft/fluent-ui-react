import * as _ from 'lodash'

import { childrenExist, pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle, StrictColorScheme } from '../../../types'
import { DividerVariables, DividerColorComponentAreas } from './dividerVariables'
import { DividerProps } from '../../../../components/Divider/Divider'

const beforeAndAfter = (
  size: number,
  variables: DividerVariables,
  colors: StrictColorScheme<DividerColorComponentAreas>,
): ICSSInJSStyle => ({
  content: '""',
  flex: 1,
  height: `${size + 1}px`,
  background: _.get(colors, 'foreground', variables.dividerColor),
})

const dividerStyles: ComponentSlotStylesInput<DividerProps, DividerVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { children, color, fitted, size, important, content } = props
    const colors = variables.colorScheme[color]
    return {
      color: _.get(colors, 'foreground', variables.textColor),
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
