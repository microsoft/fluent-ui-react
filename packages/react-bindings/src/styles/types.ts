// ========================================================
// Provider's context
// ========================================================

export interface ProviderContextInput {
  renderer?: Renderer
  rtl?: boolean
  disableAnimations?: boolean
  target?: Document
  theme?: ThemeInput
}

export interface ProviderContextPrepared {
  renderer: Renderer
  rtl: boolean
  disableAnimations: boolean
  target: Document
  theme: ThemePrepared
  originalThemes: (ThemeInput | undefined)[]
}
