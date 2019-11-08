import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TeamsTableVariables } from './tableVariables'
import { TableCellProps } from '../../../../components/Table/TableCell'

export default {
  root: ({
    variables: v,
  }: ComponentStyleFunctionParam<TableCellProps, TeamsTableVariables>): ICSSInJSStyle => {
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
      ':focus': {
        borderColor: v.cellBorderFocusColor,
      },
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
