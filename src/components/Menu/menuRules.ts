import { pxToRem } from '../../lib'
import { IMenuProps } from './Menu'

const solidBorder = (color: string) => ({
  border: `1px solid ${color}`,
})

export default {
  root: ({ props, variables }: { props: IMenuProps; variables: any }) => {
    const { type, shape, vertical } = props
    return {
      display: 'flex',
      ...(vertical && {
        flexDirection: 'column',
        width: pxToRem(200),
      }),
      ...(shape !== 'pills' &&
        shape !== 'underlined' && {
          ...solidBorder(variables.defaultBorderColor),
          ...(type === 'primary' && {
            ...solidBorder(variables.typePrimaryBorderColor),
          }),
          borderRadius: pxToRem(4),
        }),
      ...(shape === 'underlined' && {
        borderBottom: `2px solid ${variables.typePrimaryUnderlinedBorderColor}`,
      }),
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    }
  },
}
