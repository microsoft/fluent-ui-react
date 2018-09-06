import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IStatusIndicatorPropsWithDefaults } from '../../../../components/StatusIndicator/StatusIndicator'

const getRootElementPadding = (size: number) => {
  if (size < 6) {
    return 2
  }
  return 3
}

const statusIndicatorStyles: IComponentPartStylesInput = {
  root: ({
    props: { size },
    variables: v,
  }: {
    props: IStatusIndicatorPropsWithDefaults
    variables: any
  }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'table',
    padding: pxToRem(getRootElementPadding(size)),
    borderRadius: '9999px',
    backgroundColor: v.backgroundColor,
  }),
  statusIcon: (): ICSSInJSStyle => ({
    display: 'table-cell',
  }),
}

export default statusIndicatorStyles
