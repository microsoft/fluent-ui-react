import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TeamsTableVariables } from './tableVariables'
import { TableRowProps } from '../../../../components/Table/TableRow'
import getBorderFocusStyles from '../../getBorderFocusStyles'

export default {
  root: ({
    props: { isHeader, compact },
    variables: v,
    theme: { siteVariables },
  }: ComponentStyleFunctionParam<TableRowProps, TeamsTableVariables>): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

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
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': borderFocusStyles[':focus-visible'],
      ...(isHeader && {
        fontSize: v.headerFontSize,
        ':hover': {
          color: v.color,
          backgroundColor: v.backgroundColor,
        },
      }),
      ...(compact && {
        height: v.compactRowHeight,
      }),
    }
  },
}
