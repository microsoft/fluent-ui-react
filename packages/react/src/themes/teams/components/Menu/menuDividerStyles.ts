import { ComponentSelectorsAndStyles } from '../../../types'
import { MenuDividerProps } from '../../../../components/Menu/MenuDivider'
import { MenuVariables } from './menuVariables'
import { backportComponentStyle } from '../../../../lib/resolveComponentRules'

const menuDividerStyles: ComponentSelectorsAndStyles<MenuDividerProps, MenuVariables> = v => {
  const primaryBorderColor =
    v.primaryBorderColor || (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.border)
  const defaultBorderColor =
    v.borderColor || (v.colorScheme && v.colorScheme.default && v.colorScheme.default.border)
  return {
    root: [
      [
        { content: true },
        {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        },
      ],
      [{ content: false, vertical: true, primary: true }, { borderTop: primaryBorderColor }],
      [{ content: false, vertical: true, primary: false }, { borderTop: defaultBorderColor }],
      [{ content: false, vertical: false }, { alignSelf: 'stretch' }],
      [{ content: false, vertical: true, inSubmenu: true }, { margin: '8px 0' }],
      [{ content: false, vertical: false, primary: true }, { borderLeft: primaryBorderColor }],
      [{ content: false, vertical: false, primary: false }, { borderLeft: defaultBorderColor }],
    ],
  }
}

export default backportComponentStyle(menuDividerStyles)
