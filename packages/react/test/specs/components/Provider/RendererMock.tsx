import {
  TRule,
  TKeyFrame,
  IStyle,
  ISubscribeRuleOrStaticObjectMessage,
  ISubscribeKeyframesMessage,
  ISubscribeFontFaceMessage,
  ISubscribeStaticStringMessage,
  ISubscribeClearMessage,
} from '@stardust-ui/fela'
import { Renderer } from 'src/themes/types'

export default class RendererMock implements Renderer {
  renderFontCalled: any
  renderStaticCalled: any

  constructor(renderFontCalled, renderStaticCalled) {
    this.renderFontCalled = renderFontCalled
    this.renderStaticCalled = renderStaticCalled
  }

  renderRule<T>(rule: TRule<T>, props: T): string {
    return undefined
  }
  renderKeyframe<T>(keyFrame: TKeyFrame<T>, props: T): string {
    return undefined
  }
  renderFont<T>(family: string, files: string[], props: T): void {
    this.renderFontCalled()
  }

  /*eslint-disable */
  renderStatic(style: string, selector?: string): void {
    this.renderStaticCalled()
  }
  renderStatic(style: IStyle, selector: string): void {
    this.renderStaticCalled()
  }
  /* eslint-enable */

  renderToString(): string {
    return undefined
  }
  subscribe(
    event: (
      msg:
        | ISubscribeRuleOrStaticObjectMessage
        | ISubscribeKeyframesMessage
        | ISubscribeFontFaceMessage
        | ISubscribeStaticStringMessage
        | ISubscribeClearMessage,
    ) => void,
  ): { unsubscribe: () => void } {
    return undefined
  }
  clear(): void {
    return undefined
  }
}
