import { pxToRem } from '../../../../utils'

export interface DropdownVariables {
  backgroundColor: string
  backgroundColorHover: string
  backgroundColorInverted: string
  borderColor: string
  borderColorFocus: string
  borderWidth: string
  containerBorderRadius: string
  openAboveContainerBorderRadius: string
  openBelowContainerBorderRadius: string
  searchBorderBottomWidth: string
  color: string
  comboboxPaddingButton: string
  comboboxFlexBasis: string
  aboveListBorderRadius: string
  belowListBorderRadius: string
  listBackgroundColor: string
  listBorderColor: string
  listBorderWidth: string
  listPadding: string
  listBoxShadow: string
  listMaxHeight: string
  listItemFocusBorderWidth: string
  listItemHeaderFontSize: string
  listItemHeaderColor: string
  listItemContentFontSize: string
  listItemContentColor: string
  listItemBackgroundColor: string
  listItemColorHover: string
  listItemBackgroundColorHover: string
  listItemBackgroundColorActive: string
  listItemColorActive: string
  listItemSelectedFontWeight: number
  listItemSelectedColor: string
  selectedItemColor: string
  selectedItemBackgroundColor: string
  selectedItemColorFocus: string
  selectedItemBackgroundColorFocus: string
  selectedItemsMaxHeight: string
  toggleIndicatorSize: string
  triggerButtonColorHover: string
  width: string
}

const [cornerRadius, _12px_asRem] = [3, 12].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.colorScheme.default.background2,
  backgroundColorInverted: siteVars.colorScheme.default.background,
  backgroundColorHover: siteVars.colorScheme.default.backgroundHover1,
  borderColor: 'transparent',
  borderColorFocus: siteVars.colorScheme.brand.borderFocus1,
  borderWidth: '0px',
  containerBorderRadius: `${cornerRadius}`,
  openAboveContainerBorderRadius: `0 0 ${cornerRadius} ${cornerRadius}`,
  openBelowContainerBorderRadius: `${cornerRadius} ${cornerRadius} 0 0`,
  searchBorderBottomWidth: pxToRem(2),
  color: siteVars.colorScheme.default.foreground1,
  selectedItemColor: siteVars.colorScheme.default.foreground,
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: pxToRem(50),
  aboveListBorderRadius: `${cornerRadius} ${cornerRadius} 0 0`,
  belowListBorderRadius: `0 0 ${cornerRadius} ${cornerRadius}`,

  listBackgroundColor: siteVars.colorScheme.default.background,
  listBorderColor: 'transparent',
  listBorderWidth: '0px',
  listPadding: `${pxToRem(8)} 0 ${pxToRem(6)}`,
  listBoxShadow: siteVars.shadowLevel3,
  listMaxHeight: pxToRem(296),
  listItemFocusBorderWidth: pxToRem(1),
  listItemBackgroundColor: 'transparent',
  listItemBackgroundColorHover: siteVars.colorScheme.default.backgroundHover,
  listItemBackgroundColorActive: siteVars.colorScheme.default.backgroundActive,
  listItemColorActive: siteVars.colorScheme.default.foregroundActive,
  listItemColorHover: siteVars.colorScheme.default.foregroundHover,
  listItemSelectedFontWeight: siteVars.fontWeightSemibold,
  listItemSelectedColor: siteVars.colorScheme.default.foregroundActive,
  selectedItemBackgroundColor: 'undefined',
  selectedItemColorFocus: siteVars.colorScheme.default.foreground,
  selectedItemBackgroundColorFocus: siteVars.colorScheme.default.backgroundPressed,
  selectedItemsMaxHeight: pxToRem(82),
  toggleIndicatorSize: pxToRem(32),
  triggerButtonColorHover: siteVars.colorScheme.default.foreground,
  width: pxToRem(356),

  // these should only apply when there is content in the image/media slot:
  listItemHeaderFontSize: siteVars.fontSizes.medium,
  listItemHeaderColor: siteVars.colorScheme.default.foreground1, // this is to be updated
  listItemContentFontSize: siteVars.fontSizes.medium,
  listItemContentColor: siteVars.colorScheme.default.foreground2,
})
