import * as _ from 'lodash'
import prettier from 'prettier/standalone'

import 'prettier/parser-babylon'
import 'prettier/parser-html'
import 'prettier/parser-typescript'

import { CodeSnippetMode, CodeSnippetValue } from './types'

const prettierConfig = {
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: (window as any).prettierPlugins,
}

const normalizeToString = (value: CodeSnippetValue): string => {
  if (Array.isArray(value)) return value.join('\n')
  return _.isObject(value) ? JSON.stringify(value, null, 2) : (value as string)
}

export const prettifyCode = (code: string, parser: 'babylon' | 'html' | 'typescript') => {
  const formatted = prettier.format(code, {
    ...prettierConfig,
    // a narrower print width is more friendly to doc examples
    parser,
  })

  return formatted.replace(/^;</m, '<') // remove beginning semi in JSX/HTML
}

const formatters = {
  bash: (val: string = ''): string => val.replace(/^/g, '$  '),
  json: (val: string): string => val,
  js: (val: string = ''): string => prettifyCode(val, 'babylon'),
  jsx: (val: string = ''): string => prettifyCode(val, 'babylon'),
  html: (val: string = ''): string => prettifyCode(val, 'html'),
}

export const formatCode = (code: CodeSnippetValue, mode: CodeSnippetMode) => {
  if (!code) return ''
  const formatter: Function = formatters[mode]

  return (
    formatter(normalizeToString(code))
      // remove eof line break, they are not helpful for snippets
      .replace(/\n$/, '')
  )
}
