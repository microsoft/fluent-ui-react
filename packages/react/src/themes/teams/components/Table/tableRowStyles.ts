import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TeamsTableVariables } from './tableVariables'
import { TableRowProps } from '../../../../components/Table/TableRow'

export default {
  root: ({
    props: { isHeader, compact },
    variables: v,
  }: ComponentStyleFunctionParam<TableRowProps, TeamsTableVariables>): ICSSInJSStyle => {
    return {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: v.bodyFontSize,
      height: v.defaultRowHeight,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderBottomColor: v.rowBorderColor,
      padding: v.rowPadding,
      width: '100%',
      ':hover': {
        color: v.hoverColor,
        backgroundColor: v.backgroundHoverColor,
        borderColor: v.rowBorderHoverColor,
      },
      ':focus': {
        borderColor: v.rowBorderFocusColor,
        outline: 0,
      },
      ...(isHeader && {
        fontSize: v.headerFontSize,
        ':hover': {
          color: v.color,
          backgroundColor: v.backgroundColor,
        },
        ':focus': {
          border: v.headerBorderFocusColor,
        },
      }),
      ...(compact && {
        height: v.compactRowHeight,
      }),
    }
  },
}
