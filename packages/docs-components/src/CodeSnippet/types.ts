import * as React from 'react'

export type CodeSnippetMode = 'bash' | 'json' | 'js' | 'jsx' | 'html'
export type CodeSnippetValue = string | string[] | Object

export type CodeSnippetProps = {
  className?: string
  copyable?: boolean
  fitted?: boolean
  formattable?: boolean
  label?: React.ReactNode | false
  mode?: CodeSnippetMode
  prettierOverrides?: PrettierConfigStandalone
  style?: React.CSSProperties
  value: CodeSnippetValue
}

export type PrettierConfigStandalone = {
  arrowParens?: 'avoid' | 'always'
  bracketSpacing?: boolean
  cursorOffset?: number
  endOfLine?: 'auto' | 'lf' | 'crlf' | 'cr'
  filepath?: string
  htmlWhitespaceSensitivity?: 'css' | 'strict' | 'ignore'
  insertPragma?: boolean
  jsxBracketSameLine?: boolean
  jsxSingleQuote?: boolean
  parser?:
    | 'flow'
    | 'babel'
    | 'babel-flow'
    | 'typescript'
    | 'css'
    | 'less'
    | 'scss'
    | 'json'
    | 'json5'
    | 'json-stringify'
    | 'graphql'
    | 'markdown'
    | 'mdx'
    | 'vue'
    | 'yaml'
    | 'html'
    | 'angular'
    | 'lwc'
  // pluginSearchDirs?: string[]
  // Plugins takes string names and the value is the imported parser module
  plugins?: {
    babylon: any
    html: any
    typescript: any
  }
  printWidth?: number
  proseWrap?: 'always' | 'never' | 'preserve'
  quoteProps?: 'as-needed' | 'consistent' | 'preserve'
  rangeEnd?: number
  rangeStart?: number
  requirePragma?: boolean
  semi?: boolean
  singleQuote?: boolean
  tabWidth?: number
  trailingComma?: 'none' | 'es5' | 'all'
  useTabs?: boolean
  vueIndentScriptAndStyle?: boolean
  overrides?: {
    files: [string, string[]]
    excludeFiles?: [string, string[]]
    options?: Omit<PrettierConfigStandalone, 'overrides'>
  }[]
}
