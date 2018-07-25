export const focusTokenProperty = 'focusToken'
export const focusableIndexProperty = 'focusableIndex'
export const defaultFocusableIndexProperty = 'defaultFocusableIndex'
export const indexProperty = 'index'
export const focusableProperty = 'focusable'

export interface IFocusTokenProp {
  [focusTokenProperty]: string
}

export interface IFocusItem {
  focusableElementRef: HTMLElement
}

export interface IFocusableProps extends IFocusTokenProp {
  [focusableProperty]: boolean
}

export interface IFocusAreaState extends IFocusTokenProp {
  [focusableIndexProperty]: number
  [defaultFocusableIndexProperty]?: number
}

export interface IFocusAreaProps {}
