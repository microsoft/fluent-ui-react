import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuDividerProps } from '../../../../components/Menu/MenuDivider'
import { MenuVariables } from './menuVariables'
import { pxToRem } from 'src/lib/fontSizeUtility'

const menuDividerStyles: ComponentSlotStylesInput<MenuDividerProps, MenuVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    return {
      ...(props.vertical && {
        borderTop: `${pxToRem(1)} solid ${variables.borderColor}`,
        paddingTop: pxToRem(8),
        marginTop: pxToRem(8),
      }),

      ...(!props.vertical && {
        borderLeft: `${pxToRem(1)} solid ${variables.borderColor}`,
        paddingLeft: pxToRem(8),
        marginLeft: pxToRem(8),
      }),
    }
  },
}

export default menuDividerStyles
