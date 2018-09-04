import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from 'theme'
import { IStatusIndicatorPropsWithDefaults } from '../../../../components/StatusIndicator/StatusIndicator'
import { StatusIndicatorStates } from './statusIndicatorVariables'

const getRootElementPadding = (size: number) => {
  if (size < 6) {
    return 2
  }
  return 3
}

const statusIndicatorStyles: IComponentPartStylesInput = {
  root: ({
    props: { size, status },
    variables: vars,
  }: {
    props: IStatusIndicatorPropsWithDefaults
    variables: StatusIndicatorStates
  }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'table',
    padding: pxToRem(getRootElementPadding(size)),
    borderRadius: '9999px',
    backgroundColor: vars[status].borderColor,
  }),
  statusIcon: (): ICSSInJSStyle => ({
    display: 'table-cell',
  }),
}

export default statusIndicatorStyles
