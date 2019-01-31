import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuDividerProps } from '../../../../components/Menu/MenuDivider'
import { MenuVariables } from './menuVariables'
import { pxToRem } from '../../../../lib'

const menuDividerStyles: ComponentSlotStylesInput<MenuDividerProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const borderColor = p.primary ? v.primaryBorderColor : v.borderColor
    const borderType = p.vertical ? 'borderTop' : 'borderLeft'

    return {
      [borderType]: `1px solid ${borderColor}`,
      height: p.vertical ? 0 : pxToRem(32),
    }
  },
}

export default menuDividerStyles
