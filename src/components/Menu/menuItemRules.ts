import { pxToRem } from '../../lib'
import { IMenuItemProps } from './MenuItem'

const underlinedItem = (color: string) => ({
  borderBottom: `solid 5px ${color}`,
  transition: 'color .1s ease',
})

const itemSeparator = ({ props, variables }: { props: IMenuItemProps; variables: any }) => {
  const { active, shape, type, vertical } = props
  return {
    ...((!shape || shape === 'pointing') && {
      ':before': {
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
        ':first-child:before': {
          display: 'none',
        },
      }),
    }),
  }
}

export default {
  root: ({ props, variables }: { props: IMenuItemProps; variables: any }) => {
    const { active, shape, type } = props
    return {
      color: variables.defaultColor,
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      padding: `${pxToRem(14)} ${pxToRem(18)}`,
      cursor: 'pointer',
      display: 'block',
      ...(shape === 'pills' && {
        margin: `0 ${pxToRem(8)} 0 0`,
        borderRadius: pxToRem(5),
      }),
      ...(shape === 'underlined' && {
        margin: '0',
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
        ...(shape === 'underlined' && {
          ...underlinedItem(variables.defaultActiveBackgroundColor),
          ...(type === 'primary' && {
            ...underlinedItem(variables.typePrimaryActiveBorderColor),
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
          ':after': {
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
            zIndex: '2',
            transition: 'background .1s ease',
            ...(type === 'primary' && {
              background: variables.typePrimaryActiveBackgroundColor,
              borderBottom: `1px solid ${variables.typePrimaryBorderColor}`,
              borderRight: `1px solid ${variables.typePrimaryBorderColor}`,
            }),
          },
        }),
        ...(shape === 'underlined' && {
          color: variables.defaultColor,
          fontWeight: '700',
          ...underlinedItem(variables.defaultActiveColor),
          ...(type === 'primary' && {
            color: variables.typePrimaryActiveColor,
            ...underlinedItem(variables.typePrimaryActiveColor),
          }),
        }),
      }),
    }
  },
  anchor: () => ({
    color: 'inherit',
    ':hover': {
      color: 'inherit',
    },
  }),
}
