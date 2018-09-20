import { pxToRem } from '../../../../lib'
import {
  ComponentPartStyle,
  IComponentPartStylesInput,
  ICSSInJSStyle,
} from '../../../../../types/theme'
import { IMenuVariables } from './menuVariables'
import { IMenuItemProps } from '../../../../components/Menu/MenuItem'

const underlinedItem = (color): ICSSInJSStyle => ({
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const itemSeparator: ComponentPartStyle<IMenuItemProps, IMenuVariables> = ({
  props,
  variables,
}): ICSSInJSStyle => {
  const { iconOnly, pointing, pills, type, underlined, vertical } = props
  return {
    ...(!pills &&
      !underlined &&
      !(pointing && vertical) &&
      !iconOnly && {
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

const pointingBeak: ComponentPartStyle<IMenuItemProps, IMenuVariables> = ({
  props,
  variables,
}): ICSSInJSStyle => {
  const { pointing, type } = props

  let backgroundColor: string
  let borderColor: string
  let top: string
  let borders: ICSSInJSStyle

  if (type === 'primary') {
    backgroundColor = variables.typePrimaryActiveBackgroundColor
    borderColor = variables.typePrimaryBorderColor
  } else {
    backgroundColor = variables.defaultActiveBackgroundColor
    borderColor = variables.defaultBorderColor
  }

  if (pointing === 'start') {
    borders = {
      borderTop: `1px solid ${borderColor}`,
      borderLeft: `1px solid ${borderColor}`,
    }
    top = '-1px' // 1px for the border
  } else {
    borders = {
      borderBottom: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
    }
    top = '100%'
  }

  return {
    '::after': {
      visibility: 'visible',
      background: backgroundColor,
      position: 'absolute',
      content: '""',
      top,
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
      margin: '.5px 0 0',
      width: pxToRem(10),
      height: pxToRem(10),
      border: 'none',
      ...borders,
      zIndex: 2,
      transition: 'background .1s ease',
    },
  }
}

const menuItemStyles: IComponentPartStylesInput<IMenuItemProps, IMenuVariables> = {
  root: ({ props, variables, theme }): ICSSInJSStyle => {
    const { active, iconOnly, pills, pointing, type, underlined, vertical } = props
    const { iconsMenuItemSpacing } = variables
    return {
      color: variables.defaultColor,
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',
      ...(iconOnly && {
        ':nth-child(n+2)': {
          ...(vertical
            ? { marginTop: iconsMenuItemSpacing }
            : { marginLeft: iconsMenuItemSpacing }),
        },
      }),
      ...(pills && {
        ...(vertical ? { margin: `0 0 ${pxToRem(5)} 0` } : { margin: `0 ${pxToRem(8)} 0 0` }),
        borderRadius: pxToRem(5),
      }),
      ...(underlined && {
        padding: '0',
        margin: `0 ${pxToRem(10)} 0 0`,
        ':nth-child(n+2)': {
          marginLeft: `${pxToRem(10)}`,
        },
        background: 'transparent',
        boxShadow: 'none',
        color: variables.defaultColor,
      }),
      ...itemSeparator({ props, variables, theme }),
      ...(pointing &&
        vertical && {
          border: '1px solid transparent',
          borderTopLeftRadius: `${pxToRem(3)}`,
          borderTopRightRadius: `${pxToRem(3)}`,
          ...(pointing === 'end'
            ? { borderRight: `${pxToRem(3)} solid transparent` }
            : { borderLeft: `${pxToRem(3)} solid transparent` }),
          marginBottom: `${pxToRem(12)}`,
        }),

      ':hover': {
        color: variables.defaultActiveColor,
        // all menus should have gray background on hover except the underlined menu
        ...(!underlined && {
          background: variables.defaultActiveBackgroundColor,
          ...(type === 'primary' && {
            background: variables.typePrimaryActiveBackgroundColor,
          }),
        }),
      },

      ...(active && {
        ...(!underlined && {
          background: variables.defaultActiveBackgroundColor,
          ...(type === 'primary' && {
            background: variables.typePrimaryActiveBackgroundColor,
          }),
        }),
        color: variables.defaultColor,
        ':hover': {
          ...(!underlined && {
            color: variables.defaultActiveColor,
            background: variables.defaultActiveBackgroundColor,
            ...(type === 'primary' && {
              background: variables.typePrimaryActiveBackgroundColor,
            }),
          }),
        },
        ...(pointing && !vertical && pointingBeak({ props, variables, theme })),
        ...(pointing &&
          vertical && {
            ...(pointing === 'end'
              ? { borderRight: `${pxToRem(3)} solid ${variables.typePrimaryActiveColor}` }
              : { borderLeft: `${pxToRem(3)} solid ${variables.typePrimaryActiveColor}` }),
          }),
      }),
    }
  },

  anchor: ({ props, variables }): ICSSInJSStyle => {
    const { active, iconOnly, pointing, type, underlined, vertical } = props
    const { iconsMenuItemSize } = variables

    return {
      color: 'inherit',
      display: 'block',
      ...(underlined
        ? { padding: `0 0 ${pxToRem(8)} 0` }
        : pointing && vertical
          ? { padding: `${pxToRem(8)} ${pxToRem(18)}` }
          : { padding: `${pxToRem(14)} ${pxToRem(18)}` }),
      cursor: 'pointer',

      ...(iconOnly && {
        width: iconsMenuItemSize,
        height: iconsMenuItemSize || '100%',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      ':hover': {
        color: 'inherit',
        ...(underlined && {
          paddingBottom: `${pxToRem(4)}`,
          ...underlinedItem(variables.defaultActiveBackgroundColor),
          ...(type === 'primary' && {
            ...underlinedItem(variables.typePrimaryActiveBorderColor),
          }),
        }),
      },

      ...(active &&
        underlined && {
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
