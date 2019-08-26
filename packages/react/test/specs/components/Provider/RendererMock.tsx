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
  renderRule<T>(rule: TRule<T>, props: T): string {
    return undefined
  }
  renderKeyframe<T>(keyFrame: TKeyFrame<T>, props: T): string {
    return undefined
  }
  renderFont<T>(family: string, files: string[], props: T): void {}

  renderStatic(style: string, selector?: string): void {}
  renderStatic(style: IStyle, selector: string): void {}

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
