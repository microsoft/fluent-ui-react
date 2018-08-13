import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'
import { IMenuVariables } from './menuVariables'

const underlinedItem = (color): ICSSInJSStyle => ({
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const itemSeparator = ({ props, variables }: { props: any; variables }): ICSSInJSStyle => {
  const { active, icons, shape, type, vertical } = props
  return {
    ...((!shape || shape === 'pointing') &&
      !icons && {
        '::before': {
          position: 'absolute',
          content: '""',
          top: 0,
          right: 0,
          ...(vertical ? { width: '100%', height: '1px' } : { width: '1px', height: '100%' }),
          background: variables.defaultBorderColor,
          ...(type === 'primary' && {
            background: variables.typePrimaryBorderColor,
          }),
        },
        ...(vertical && {
          ':first-child': {
            '::before': {
              display: 'none',
            },
          },
        }),
      }),
  }
}

const menuItemStyles = {
  root: ({ props, variables }: { props: any; variables: IMenuVariables }): ICSSInJSStyle => {
    const { active, icons, shape, type, vertical } = props
    const { iconsMenuItemSpacing } = variables
    return {
      color: variables.defaultColor,
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',
      ...(icons && {
        ':nth-child(n+2)': {
          ...(vertical
            ? { marginTop: iconsMenuItemSpacing }
            : { marginLeft: iconsMenuItemSpacing }),
        },
      }),
      ...(shape === 'pills' && {
        ...(vertical ? { margin: `0 0 ${pxToRem(5)} 0` } : { margin: `0 ${pxToRem(8)} 0 0` }),
        borderRadius: pxToRem(5),
      }),
      ...(shape === 'underlined' && {
        padding: '0',
        margin: `0 ${pxToRem(10)} 0 0`,
        ':nth-child(n+2)': {
          marginLeft: `${pxToRem(10)}`,
        },
        background: 'transparent',
        boxShadow: 'none',
        color: variables.defaultColor,
      }),
      ...itemSeparator({ props, variables }),

      ':hover': {
        color: variables.defaultActiveColor,
        // all menus should have gray background on hover except the underlined menu
        ...(shape !== 'underlined' && {
          background: variables.defaultActiveBackgroundColor,
          ...(type === 'primary' && {
            background: variables.typePrimaryActiveBackgroundColor,
          }),
        }),
      },

      ...(active && {
        ...(shape !== 'underlined' && {
          background: variables.defaultActiveBackgroundColor,
          ...(type === 'primary' && {
            background: variables.typePrimaryActiveBackgroundColor,
          }),
        }),
        color: variables.defaultColor,
        ':hover': {
          ...(shape !== 'underlined' && {
            color: variables.defaultActiveColor,
            background: variables.defaultActiveBackgroundColor,
            ...(type === 'primary' && {
              background: variables.typePrimaryActiveBackgroundColor,
            }),
          }),
        },
        ...(shape === 'pointing' && {
          '::after': {
            visibility: 'visible',
            background: variables.defaultActiveBackgroundColor,
            position: 'absolute',
            content: '""',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
            margin: '.5px 0 0',
            width: pxToRem(10),
            height: pxToRem(10),
            border: 'none',
            borderBottom: `1px solid ${variables.defaultBorderColor}`,
            borderRight: `1px solid ${variables.defaultBorderColor}`,
            zIndex: 2,
            transition: 'background .1s ease',
            ...(type === 'primary' && {
              background: variables.typePrimaryActiveBackgroundColor,
              borderBottom: `1px solid ${variables.typePrimaryBorderColor}`,
              borderRight: `1px solid ${variables.typePrimaryBorderColor}`,
            }),
          },
        }),
      }),
    }
  },

  anchor: ({ props, variables }): ICSSInJSStyle => {
    const { active, icons, shape, type } = props
    const { iconsMenuItemSize } = variables

    return {
      color: 'inherit',
      display: 'block',
      ...(shape === 'underlined'
        ? { padding: `0 0 ${pxToRem(8)} 0` }
        : { padding: `${pxToRem(14)} ${pxToRem(18)}` }),
      cursor: 'pointer',

      ...(icons && {
        width: iconsMenuItemSize,
        height: iconsMenuItemSize || '100%',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      ':hover': {
        color: 'inherit',
        ...(shape === 'underlined' && {
          paddingBottom: `${pxToRem(4)}`,
          ...underlinedItem(variables.defaultActiveBackgroundColor),
          ...(type === 'primary' && {
            ...underlinedItem(variables.typePrimaryActiveBorderColor),
          }),
        }),
      },

      ...(active &&
        shape === 'underlined' && {
          color: variables.defaultColor,
          paddingBottom: `${pxToRem(4)}`,
          ':hover': {},
          ...underlinedItem(variables.defaultActiveColor),
          ...(type === 'primary'
            ? {
                color: variables.typePrimaryActiveColor,
                ...underlinedItem(variables.typePrimaryActiveColor),
              }
            : {
                fontWeight: 700,
              }),
        }),
    }
  },
}

export default menuItemStyles
