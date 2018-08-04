export type AriaWidgetRole =
  | 'button'
  | 'checkbox'
  | 'dialog'
  | 'gridcell'
  | 'link'
  | 'log'
  | 'marquee'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'option'
  | 'progressbar'
  | 'radio'
  | 'scrollbar'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'tab'
  | 'tabpanel'
  | 'textbox'
  | 'timer'
  | 'tooltip'
  | 'treeitem'
  | 'switch'

export type AriaCompositeRole =
  | 'combobox'
  | 'grid'
  | 'row'
  | 'gridcell'
  | 'rowheader'
  | 'columnheader'
  | 'listbox'
  | 'option'
  | 'menu'
  | 'menubar'
  | 'radiogroup'
  | 'radio'
  | 'tablist'
  | 'tab'
  | 'tabpanel'
  | 'tree'
  | 'treegrid'

export type AriaDocumentStructureRole =
  | 'article'
  | 'definition'
  | 'directory'
  | 'document'
  | 'group'
  | 'heading'
  | 'img'
  | 'list'
  | 'listitem'
  | 'math'
  | 'note'
  | 'presentation'
  | 'region'
  | 'separator'
  | 'toolbar'

export type AriaLandmarkRole =
  | 'application'
  | 'banner'
  | 'complementary'
  | 'contentinfo'
  | 'form'
  | 'main'
  | 'navigation'
  | 'search'

export type AriaRole =
  | AriaWidgetRole
  | AriaCompositeRole
  | AriaDocumentStructureRole
  | AriaLandmarkRole

export interface IAriaWidgetAttributes {
  role?: string
  'aria-autocomplete'?: string
  'aria-checked'?: string
  'aria-current'?: string
  'aria-disabled'?: string | boolean
  'aria-expanded'?: string | boolean
  'aria-haspopup'?: string
  'aria-hidden'?: string | boolean
  'aria-invalid'?: string
  'aria-label'?: string
  'aria-level'?: string
  'aria-multiline'?: string
  'aria-multiselectable'?: string
  'aria-orientation'?: string
  'aria-pressed'?: string | boolean
  'aria-readonly'?: string
  'aria-required'?: string
  'aria-selected'?: string | boolean
  'aria-sort'?: string
  'aria-valuemax'?: string
  'aria-valuemin'?: string
  'aria-valuenow'?: string
  'aria-valuetext'?: string
}

export interface IAccessibilityAttributes extends IAriaWidgetAttributes {
  role?: AriaRole
  tabIndex?: string
}

export type AccessibilityKeyHandlers = undefined

export type AccessibilityAttributesDef = { [partName: string]: IAccessibilityAttributes }
export type AccessibilityKeyHandlersDef = { [partName: string]: AccessibilityKeyHandlers }

export interface IAccessibilityDef {
  attributes?: AccessibilityAttributesDef
  keyHandlers?: AccessibilityKeyHandlersDef
}

export type IAccessibilityFunc = (props: any) => IAccessibilityDef
export type Accessibility = IAccessibilityDef | IAccessibilityFunc
