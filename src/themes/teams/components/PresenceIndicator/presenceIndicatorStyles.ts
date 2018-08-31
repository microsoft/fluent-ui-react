import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from 'theme'
import { IPresenceIndicatorPropsWithDefaults } from '../../../../components/PresenceIndicator/PresenceIndicator'

const getRootElementPadding = (size: number) => {
  if (size < 6) {
    return 2
  }
  return 3
}

const presenceIndicatorStyles: IComponentPartStylesInput = {
  root: ({
    props: { size },
    variables: v,
  }: {
    props: IPresenceIndicatorPropsWithDefaults
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

export default presenceIndicatorStyles
