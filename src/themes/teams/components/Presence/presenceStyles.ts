import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IPresencePropsWithDefaults } from '../../../../components/Presence/Presence'

const getRootElementPadding = (size: number) => {
  if (size < 6) {
    return 2
  }
  return 3
}

const presenceStyles: IComponentPartStylesInput = {
  root: ({
    props: { size },
    variables: v,
  }: {
    props: IPresencePropsWithDefaults
    variables: any
  }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'table',
    padding: pxToRem(getRootElementPadding(size)),
    borderRadius: '9999px',
    backgroundColor: v.backgroundColor,
  }),
  presenceIcon: (): ICSSInJSStyle => ({
    display: 'table-cell',
  }),
}

export default presenceStyles
