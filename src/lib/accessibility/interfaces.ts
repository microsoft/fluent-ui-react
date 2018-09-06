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

export interface IAriaRelationshipAttributes {
  'aria-activedescendant'?: string
  'aria-colcount'?: string
  'aria-colindex'?: string
  'aria-colspan'?: string
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-details'?: string
  'aria-errormessage'?: string
  'aria-flowto'?: string
  'aria-labelledby'?: string
  'aria-owns'?: string
  'aria-posinset'?: string
  'aria-rowcount'?: string
  'aria-rowindex'?: string
  'aria-rowspan'?: string
}

export interface IAccessibilityAttributes
  extends IAriaWidgetAttributes,
    IAriaRelationshipAttributes {
  role?: AriaRole
  tabIndex?: string
}

export type AccessibilityAttributes = { [partName: string]: IAccessibilityAttributes }
export type ActionsDefinition = { [partName: string]: { [actionName: string]: IActionDefinition } }
export interface IAccessibilityDefinition {
  attributes?: AccessibilityAttributes
  actionsDefinition?: ActionsDefinition
  handledProps?: (keyof IAccessibilityAttributes)[]
}

export interface IAccessibilityBehavior extends IAccessibilityDefinition {
  handlers?: ActionsHandler
}

export interface IActionDefinition {
  keyCombinations: KeyCombinations[]
}

export interface KeyCombinations {
  keyCode: number
  shiftKey?: boolean
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
}

export type AccessibilityActions = {
  [actionName: string]: KeyboardHandler
}

export type ActionsHandler = {
  [partName: string]: {
    onKeyDown?: KeyboardHandler
  }
}

export type KeyboardHandler = (event: React.KeyboardEvent) => void

export type Accessibility = IAccessibilityDefinition | ((props: any) => IAccessibilityDefinition)
