import { FocusTrapZoneProps, FocusZoneProps, IS_FOCUSABLE_ATTRIBUTE } from './FocusZone'

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

export interface AriaWidgetAttributes {
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
  'aria-modal'?: boolean
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

export interface AriaRelationshipAttributes {
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

export interface AccessibilityAttributes extends AriaWidgetAttributes, AriaRelationshipAttributes {
  role?: AriaRole
  tabIndex?: string
  [IS_FOCUSABLE_ATTRIBUTE]?: boolean
  dir?: string
}

export type AccessibilityAttributesBySlot = { [partName: string]: AccessibilityAttributes }

export enum FocusZoneMode {
  Custom,
  Wrap,
  Embed,
}

export type FocusZoneDefinition = {
  mode: FocusZoneMode
  props?: FocusZoneProps
}

export type FocusTrapDefinition = FocusTrapZoneProps | boolean

export type KeyActions = { [partName: string]: { [actionName: string]: KeyAction } }
export interface AccessibilityDefinition {
  attributes?: AccessibilityAttributesBySlot
  keyActions?: KeyActions
  handledProps?: (keyof AccessibilityAttributes)[]
  focusZone?: FocusZoneDefinition
  focusTrap?: FocusTrapDefinition
}

export interface AccessibilityBehavior extends AccessibilityDefinition {
  keyHandlers?: ActionsKeyHandler
}

export interface KeyAction {
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

export type Accessibility = (props: any) => AccessibilityDefinition
