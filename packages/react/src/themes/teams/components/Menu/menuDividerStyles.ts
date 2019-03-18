import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuDividerProps } from '../../../../components/Menu/MenuDivider'
import { MenuVariables } from './menuVariables'

const menuDividerStyles: ComponentSlotStylesInput<MenuDividerProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    // const borderColor = p.primary ? v.primaryBorderColor : v.borderColor
    const borderColor = v.borderColor
    const borderType = p.vertical ? 'borderTop' : 'borderLeft'

    return p.content
      ? {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }
      : {
          [borderType]: `1px solid ${borderColor}`,
          ...(!p.vertical && {
            alignSelf: 'stretch',
          }),
          ...(p.vertical &&
            p.inSubmenu && {
              margin: '8px 0',
            }),
        }
  },
}

export default menuDividerStyles
