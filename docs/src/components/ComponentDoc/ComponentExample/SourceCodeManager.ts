import * as React from 'react'
import { exampleSourcesContext } from '../../../utils'
import { ExampleSource } from '../../../types'
import { safeFormatCode } from '../../../utils/formatCode'

type SourceManagerCodeAPI = {
  name: string
  fileSuffix: string

  active?: boolean
  enabled?: boolean
}

type SourceManagerCodeAPIs = {
  children: SourceManagerCodeAPI
  shorthand: SourceManagerCodeAPI
}

export type SourceManagerRenderProps = SourceManagerState & {
  handleCodeAPIChange: (newApi: keyof SourceManagerCodeAPIs) => void
  handleCodeChange: (newCode: string) => void
  handleCodeFormat: () => void
  handleCodeLanguageChange: (newLanguage: SourceManagerLanguage) => void
  handleCodeReset: () => void
}

export type SourceManagerLanguage = 'js' | 'ts'

export type SourceManagerProps = {
  examplePath: string
  children: (renderProps: SourceManagerRenderProps) => React.ReactNode
}

export type SourceManagerState = {
  currentLanguage: SourceManagerLanguage
  currentAPI: keyof SourceManagerCodeAPIs

  codeAPIs: SourceManagerCodeAPIs
  currentCode?: string
  formattedCode?: string
  originalCode?: string

  canBeFormatted: boolean
  wasChanged: boolean
}

export const codeAPIs: SourceManagerCodeAPIs = {
  children: { name: 'Children API', fileSuffix: '' },
  shorthand: { name: 'Shorthand API', fileSuffix: '.shorthand' },
}

export class SourceManager extends React.Component<SourceManagerProps, SourceManagerState> {
  state = {
    currentLanguage: 'js' as SourceManagerLanguage,
    currentAPI: 'children' as keyof SourceManagerCodeAPIs,

    codeAPIs,

    canBeFormatted: false,
    wasChanged: false,
  }

  static getDerivedStateFromProps(
    props: SourceManagerProps,
    state: SourceManagerState,
  ): Partial<SourceManagerState> {
    const { examplePath } = props
    const { currentAPI, currentLanguage, currentCode } = state

    const sourcePath = `${examplePath.replace(/^components/, '.')}${
      codeAPIs[currentAPI].fileSuffix
    }.source.json`
    const sourceCode: ExampleSource = exampleSourcesContext(sourcePath)

    const originalCode = sourceCode[currentLanguage]
    const currentCode1 = currentCode || originalCode
    const formattedCode = safeFormatCode(
      currentCode1,
      currentLanguage === 'ts' ? 'typescript' : 'babylon',
    )

    return {
      originalCode,
      currentCode: currentCode1,
      formattedCode,

      canBeFormatted: !!formattedCode ? currentCode1 !== formattedCode : false,
      wasChanged: originalCode !== currentCode1,
    }
  }

  handleCodeAPIChange = (newAPI: keyof SourceManagerCodeAPIs): void => {
    this.setState({
      currentAPI: newAPI,
      currentCode: undefined,
    })
  }

  handleCodeChange = (newCode: string): void => {
    this.setState({ currentCode: newCode })
  }

  handleCodeFormat = (): void => {
    this.setState(prevState => ({ currentCode: prevState.formattedCode }))
  }

  handleCodeReset = (): void => {
    this.setState({ currentCode: undefined })
  }

  handleLanguageChange = (newLanguage: SourceManagerLanguage): void => {
    this.setState({
      currentLanguage: newLanguage,
      currentCode: undefined,
    })
  }

  render() {
    return this.props.children({
      ...this.state,
      handleCodeAPIChange: this.handleCodeAPIChange,
      handleCodeChange: this.handleCodeChange,
      handleCodeFormat: this.handleCodeFormat,
      handleCodeReset: this.handleCodeReset,
      handleCodeLanguageChange: this.handleLanguageChange,
    })
  }
}

export default SourceManager
