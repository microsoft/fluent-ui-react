import * as _ from 'lodash'

import { getColorSchemeFn } from '../../../../lib'
import { pxToRem } from '../../utils'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuProps, MenuState } from '../../../../components/Menu/Menu'
import { MenuVariables, MenuColorScheme } from './menuVariables'

type MenuPropsAndState = MenuProps & MenuState

const solidBorder = (color: string) => ({
  border: `1px solid ${color}`,
})

export default {
  root: ({ props, variables: v }): ICSSInJSStyle => {
    const { color, iconOnly, fluid, pointing, pills, primary, underlined, vertical } = props
    const getColor = getColorSchemeFn<MenuColorScheme>(color, v.colorScheme)

    return {
      display: 'flex',
      ...(iconOnly && { alignItems: 'center' }),
      ...(vertical && {
        flexDirection: 'column',
        ...(!fluid && { width: pxToRem(200) }),
        ...(iconOnly && {
          display: 'inline-block',
          width: 'auto',
        }),
      }),
      ...(!pills &&
        !iconOnly &&
        !(pointing && vertical) &&
        !underlined && {
          ...solidBorder(getColor('background', primary ? v.primaryBorderColor : v.borderColor)),
          borderRadius: pxToRem(4),
        }),
      ...(underlined && {
        borderBottom: `2px solid ${getColor('background', v.primaryUnderlinedBorderColor)}`,
      }),
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    }
  },
} as ComponentSlotStylesInput<MenuPropsAndState, MenuVariables>
