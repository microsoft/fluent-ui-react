import { IFocusZoneProps } from './FocusZone'

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
  'aria-checked'?: string | boolean
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

export enum FocusZoneMode {
  Custom,
  Wrap,
}

export type FocusZoneDefinition = {
  mode: FocusZoneMode
  props?: IFocusZoneProps
}

export type KeyActions = { [partName: string]: { [actionName: string]: IKeyAction } }
export interface IAccessibilityDefinition {
  attributes?: AccessibilityAttributes
  keyActions?: KeyActions
  handledProps?: (keyof IAccessibilityAttributes)[]
  focusZone?: FocusZoneDefinition
}

export interface IAccessibilityBehavior extends IAccessibilityDefinition {
  keyHandlers?: ActionsKeyHandler
}

export interface IKeyAction {
  keyCombinations: KeyCombinations[]
}

export interface KeyCombinations {
  keyCode: number
  shiftKey?: boolean
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
}

export type AccessibilityActionHandlers = {
  [actionName: string]: EventHandler
}

export type ActionsKeyHandler = {
  [partName: string]: OnKeyDownHandler
}

export type OnKeyDownHandler = {
  onKeyDown?: KeyboardHandler
}

export type KeyboardHandler = (event: KeyboardEvent) => void
export type EventHandler = (event: Event) => void

export type Accessibility = IAccessibilityDefinition | ((props: any) => IAccessibilityDefinition)
