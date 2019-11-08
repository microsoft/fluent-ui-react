import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TeamsTableVariables } from './tableVariables'
import { TableCellProps } from '../../../../components/Table/TableCell'
import getBorderFocusStyles from '../../getBorderFocusStyles'

export default {
  root: ({
    variables: v,
    theme: { siteVariables },
  }: ComponentStyleFunctionParam<TableCellProps, TeamsTableVariables>): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

    return {
      boxSizing: 'border-box',
      display: 'flex',
      flexFlow: 'row nowrap',
      flexGrow: 1,
      flexBasis: 0,
      minWidth: v.minCellWidth,
      outline: 0,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': borderFocusStyles[':focus-visible'],
      padding: v.cellPadding,
      height: '100%',
    }
  },
  content: ({
    props: { truncateContent },
  }: ComponentStyleFunctionParam<TableCellProps, TeamsTableVariables>): ICSSInJSStyle => {
    return {
      alignSelf: 'center',
      ...(truncateContent && {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    }
  },
}
