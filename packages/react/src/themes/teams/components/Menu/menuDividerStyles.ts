import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuDividerProps } from '../../../../components/Menu/MenuDivider'
import { MenuVariables } from './menuVariables'

const menuDividerStyles: ComponentSlotStylesInput<MenuDividerProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const borderColor = p.primary ? v.primaryBorderColor : v.borderColor
    const borderType = p.vertical ? 'borderTop' : 'borderLeft'

<<<<<<< HEAD
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
          ...(p.vertical && {
            margin: '8px 0',
          }),
        }
=======
    return {
      [borderType]: `${
        p.vertical ? v.verticalDividerHeight : v.dividerHeight
      } solid ${borderColor}`,
      ...(!p.vertical && {
        alignSelf: 'stretch',
      }),
      ...(p.vertical && {
        margin: '8px 0',
      }),
    }
>>>>>>> Streamlining menu variable names
  },
}

export default menuDividerStyles
