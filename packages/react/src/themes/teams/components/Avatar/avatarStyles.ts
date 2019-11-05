import { ComponentSelectorsAndStyles } from '../../../types'
import { AvatarProps } from '../../../../components/Avatar/Avatar'
import { AvatarVariables } from './avatarVariables'
import { backportComponentStyle } from '../../../../lib/resolveComponentRules'

const avatarStyles: ComponentSelectorsAndStyles<AvatarProps, AvatarVariables> = v => ({
  root: [
    [
      null,
      {
        position: 'relative',
        backgroundColor: 'inherit',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: v.medium,
        width: v.medium,
      },
    ],

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
  // Image
  // ----------------------------------------
  image: [
    [
      null,
      {
        borderColor: v.avatarBorderColor,
        borderStyle: 'solid',
        borderWidth: v.avatarBorderWidth,

        height: '100%',
        objectFit: 'cover',
        verticalAlign: 'top',
        width: '100%',
      },
    ],
  ],

  // ----------------------------------------
  // Label
  // ----------------------------------------
  label: [
    [
      null,
      {
        display: 'inline-block',
        width: v.medium,
        height: v.medium,
        lineHeight: v.medium,
        fontSize: `calc(${v.medium} / 2.333)`,
        verticalAlign: 'top',
        textAlign: 'center',
        padding: '0px',
      },
    ],

    //
    // Sizes
    //
    [
      { size: 'smallest' },
      {
        fontSize: `calc(${v.smallest} / 2.333)`,
        width: v.smallest,
        height: v.smallest,
        lineHeight: v.smallest,
      },
    ],
    [
      { size: 'smaller' },
      {
        fontSize: `calc(${v.smaller} / 2.333)`,
        width: v.smaller,
        height: v.smaller,
        lineHeight: v.smaller,
      },
    ],
    [
      { size: 'small' },
      {
        fontSize: `calc(${v.small} / 2.333)`,
        width: v.small,
        height: v.small,
        lineHeight: v.small,
      },
    ],
    [
      { size: 'medium' },
      {
        fontSize: `calc(${v.medium} / 2.333)`,
        width: v.medium,
        height: v.medium,
        lineHeight: v.medium,
      },
    ],
    [
      { size: 'large' },
      {
        fontSize: `calc(${v.large} / 2.333)`,
        width: v.large,
        height: v.large,
        lineHeight: v.large,
      },
    ],
    [
      { size: 'larger' },
      {
        fontSize: `calc(${v.larger} / 2.333)`,
        width: v.larger,
        height: v.larger,
        lineHeight: v.larger,
      },
    ],
    [
      { size: 'largest' },
      {
        fontSize: `calc(${v.largest} / 2.333)`,
        width: v.largest,
        height: v.largest,
        lineHeight: v.largest,
      },
    ],
  ],

  // ----------------------------------------
  // Status
  // ----------------------------------------
  status: [
    [
      null,
      {
        position: 'absolute',
        bottom: 0,
        right: 0,
        boxShadow: `0 0 0 ${v.statusBorderWidth} ${v.statusBorderColor}`,
      },
    ],
  ],
})
export default backportComponentStyle(avatarStyles)
