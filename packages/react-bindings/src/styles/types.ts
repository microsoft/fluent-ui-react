import {
  DebugData,
  ICSSInJSStyle,
  PropsWithVarsAndStyles,
  ThemeInput,
  ThemePrepared,
} from '@fluentui/styles'
import { IRenderer as FelaRenderer } from 'fela'

// Notice:
// This temporary lives here, will be remove once `animation` prop will be dropped
export type ComponentAnimationProp =
  | {
      name: string
      delay?: string
      direction?: string
      duration?: string
      fillMode?: string
      iterationCount?: string
      playState?: string
      timingFunction?: string
      keyframeParams?: object
    }
  | string

export type ComponentSlotClasses = Record<string, string>

// Heads Up!
// Keep in sync with packages/react-proptypes/src/index.ts
export type ComponentDesignProp = {
  display?: ICSSInJSStyle['display']
  position?: ICSSInJSStyle['position']

  top?: ICSSInJSStyle['top']
  bottom?: ICSSInJSStyle['bottom']
  left?: ICSSInJSStyle['left']
  right?: ICSSInJSStyle['right']

  padding?: ICSSInJSStyle['padding']
  paddingTop?: ICSSInJSStyle['paddingTop']
  paddingRight?: ICSSInJSStyle['paddingRight']
  paddingBottom?: ICSSInJSStyle['paddingBottom']
  paddingLeft?: ICSSInJSStyle['paddingLeft']

  margin?: ICSSInJSStyle['margin']
  marginTop?: ICSSInJSStyle['marginTop']
  marginRight?: ICSSInJSStyle['marginRight']
  marginBottom?: ICSSInJSStyle['marginBottom']
  marginLeft?: ICSSInJSStyle['marginLeft']

  width?: ICSSInJSStyle['width']
  height?: ICSSInJSStyle['height']
  minWidth?: ICSSInJSStyle['minWidth']
  maxWidth?: ICSSInJSStyle['maxWidth']
  minHeight?: ICSSInJSStyle['minHeight']
  maxHeight?: ICSSInJSStyle['maxHeight']
}

export type RendererParam = {
  theme: { direction: 'ltr' | 'rtl' }
  disableAnimations: boolean
  displayName: string
}

export type RendererRenderRule = (rule: () => ICSSInJSStyle, param: RendererParam) => string
export type Renderer = Omit<FelaRenderer, 'renderRule'> & {
  renderRule: RendererRenderRule
}

export interface StylesContextPerformance {
  enableStylesCaching: boolean
  enableVariablesCaching: boolean
}

export type StylesContextPerformanceInput = Partial<StylesContextPerformance>

export type StylesContextInputValue<R = Renderer> = {
  disableAnimations?: boolean
  performance?: StylesContextPerformanceInput
  renderer?: R
  theme?: ThemeInput
}

export type StylesContextValue<R = Renderer> = {
  disableAnimations: boolean
  performance: StylesContextPerformanceInput
  renderer: R
  theme: ThemePrepared
}

export type PrimitiveProps = Record<string, boolean | number | string | undefined>

export type ResolveStylesOptions = StylesContextValue<{
  renderRule: RendererRenderRule
}> & {
  className?: string
  displayName: string
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp }
  rtl: boolean
  saveDebug: (debug: DebugData | null) => void
}
