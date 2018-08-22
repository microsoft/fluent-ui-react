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

import { KeyCodes } from '@uifabric/utilities'

export interface IAccessibilityAttributes extends IAriaWidgetAttributes {
  role?: AriaRole
  tabIndex?: string
  'data-focused'?: boolean
  'data-is-focusable'?: boolean
}

export type AccessibilityAttributes = { [partName: string]: IAccessibilityAttributes }
export type ActionDefinitions = { [partName: string]: IActionDefinition }

export type Accessibility =
  | IAccessibilityDefinition
  | ((props: any) => IAccessibilityDefinition)
  | ((props: any) => Accessibility)

export interface IActionDefinition {
  keyCombinations: KeyCombinations[]
}

export interface KeyCombinations {
  keyCode: KeyCodes
  shiftKey?: boolean
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
}

export enum FocusZoneMode {
  Custom,
  Wrap,
}

export type FocusZoneDefinition = {
  mode: FocusZoneMode
  props?: IFocusZoneProps
}

export interface IAccessibilityDefinition {
  attributes?: AccessibilityAttributes
  focusZone?: FocusZoneDefinition
  actionsDefinition?: ActionDefinitions
}

export type AccessibilityActions = {
  [name: string]: KeyboardHandler
}

export type KeyboardHandler = (event: KeyboardEvent) => void
