import { StatusProps } from '../../../../components/Status/Status'
import { StatusVariables } from './statusVariables'
import { ComponentSelectorsAndStyles } from 'src/themes/types'
import { backportComponentStyle } from 'src/lib/resolveComponentRules'

const statusStyles: ComponentSelectorsAndStyles<StatusProps, StatusVariables> = v => ({
  root: [
    [
      null,
      {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        width: v.medium,
        height: v.medium,
        color: v.defaultTextColor,
        backgroundColor: v.defaultBackgroundColor,
        borderRadius: '9999px',
      },
    ],

    //
    // Colors
    //
    [{ color: 'red' }, { backgroundColor: v.backgroundRed }],
    [{ color: 'orange' }, { backgroundColor: v.backgroundOrange }],
    [{ color: 'yellow' }, { backgroundColor: v.backgroundYellow }],
    [{ color: 'green' }, { backgroundColor: v.backgroundGreen }],
    [{ color: 'blue' }, { backgroundColor: v.backgroundBlue }],
    [{ color: 'violet' }, { backgroundColor: v.backgroundViolet }],

    //
    // States
    //
    [{ state: 'success' }, { backgroundColor: v.successBackgroundColor }],
    [{ state: 'info' }, { backgroundColor: v.infoBackgroundColor }],
    [{ state: 'warning' }, { backgroundColor: v.warningBackgroundColor }],
    [{ state: 'error' }, { backgroundColor: v.errorBackgroundColor }],

    //
    // Sizes
    //
    [{ size: 'smallest' }, { width: v.smallest, height: v.smallest }],
    [{ size: 'smaller' }, { width: v.smaller, height: v.smaller }],
    [{ size: 'small' }, { width: v.small, height: v.small }],
    [{ size: 'medium' }, { width: v.medium, height: v.medium }],
    [{ size: 'large' }, { width: v.large, height: v.large }],
    [{ size: 'larger' }, { width: v.larger, height: v.larger }],
    [{ size: 'largest' }, { width: v.largest, height: v.largest }],
  ],

  // ----------------------------------------
  // Icon
  // ----------------------------------------
  icon: [
    [{ state: 'success' }, { color: v.successTextColor }],
    [{ state: 'info' }, { color: v.infoTextColor }],
    [{ state: 'warning' }, { color: v.warningTextColor }],
    [{ state: 'error' }, { color: v.errorTextColor }],
  ],
})

export default backportComponentStyle(statusStyles)
