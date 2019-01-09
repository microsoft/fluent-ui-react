import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuDividerProps } from '../../../../components/Menu/MenuDivider'
import { MenuVariables } from './menuVariables'

const menuDividerStyles: ComponentSlotStylesInput<MenuDividerProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const borderColor = p.primary ? v.primaryBorderColor : v.borderColor
    const borderType = p.vertical ? 'borderTop' : 'borderLeft'

    return {
      [borderType]: `1px solid ${borderColor}`,
    }
  },
}

export default menuDividerStyles
