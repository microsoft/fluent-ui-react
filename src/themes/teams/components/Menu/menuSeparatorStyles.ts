import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuSeparatorProps } from '../../../../components/Menu/MenuSeparator'
import { MenuVariables } from './menuVariables'

const menuSeparatorStyles: ComponentSlotStylesInput<MenuSeparatorProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      ...(p.vertical
        ? {
            borderTop: `1px solid ${p.primary ? v.primaryBorderColor : v.borderColor}`,
          }
        : {
            borderLeft: `1px solid ${p.primary ? v.primaryBorderColor : v.borderColor}`,
          }),
    }
  },
}

export default menuSeparatorStyles
