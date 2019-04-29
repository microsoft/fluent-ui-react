import * as React from 'react'
import { Text } from '@stardust-ui/react'
import CodeSnippet from '../../CodeSnippet'

export function getShorthandRenderFunctionDescription(): JSX.Element {
  const defintion =
    'export type ShorthandRenderFunction = (' +
    'Component: React.ReactType,' +
    'props: Props,' +
    ') => React.ReactElement<any>;'

  return (
    <div>
      <CodeSnippet value={defintion} />
      <Text content="Do you have any idea how to use this?" />
    </div>
  )
}

export function getComponentSlotStypeDescription(): JSX.Element {
  const defintion =
    'export type ComponentSlotStyle<TProps = {}, TVars = {}> = \
    | ComponentSlotStyleFunction<TProps, TVars>\
    | ICSSInJSStyle'
  return (
    <div>
      <CodeSnippet value={defintion} />
      <Text content="Do you have any idea how to use this?" />
    </div>
  )
}
export function getShorthandValueDescription(): JSX.Element {
  const defintion = 'export type ShorthandValue<P = {}> = ReactNode | Props<P>'
  return (
    <div>
      <CodeSnippet value={defintion} />
      <Text content="Do you have any idea how to use this?" />
    </div>
  )
}
export function getComponentEventHandlerDescription(): JSX.Element {
  const defintion =
    'export type ComponentEventHandler<TProps> = (\
        event: React.SyntheticEvent<HTMLElement>,\
        data: TProps,\
      ) => void'
  return (
    <div>
      <CodeSnippet value={defintion} />
      <Text content="Do you have any idea how to use this?" />
    </div>
  )
}
