import * as _ from 'lodash'
import * as React from 'react'

import { ExampleSource } from '../../../types'
import { safeFormatCode } from '../../../utils/formatCode'
import { componentAPIs as APIdefinitions, ComponentAPIs } from './componentAPIs'
import getExampleSource from './getExampeSource'

export type SourceManagerRenderProps = SourceManagerState & {
  handleCodeAPIChange: (newApi: keyof ComponentAPIs) => void
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

type StateManagerComponentAPIs = ComponentAPIs<{
  sourceCode: ExampleSource | undefined
  supported: boolean
}>

export type SourceManagerState = {
  currentCodeLanguage: SourceManagerLanguage
  currentCodeAPI: keyof ComponentAPIs

  componentAPIs: StateManagerComponentAPIs
  currentCode?: string
  formattedCode?: string
  originalCode?: string

  canCodeBeFormatted: boolean
  wasCodeChanged: boolean
}

export class SourceManager extends React.Component<SourceManagerProps, SourceManagerState> {
  constructor(props: SourceManagerProps) {
    super(props)

    const componentAPIs = _.mapValues(APIdefinitions, (definition, name: keyof ComponentAPIs) => {
      const sourceCode = getExampleSource(props.examplePath, name)

      return {
        ...definition,
        sourceCode,
        supported: !!sourceCode,
      }
    }) as StateManagerComponentAPIs

    this.state = {
      currentCodeLanguage: 'js' as SourceManagerLanguage,
      currentCodeAPI: _.findKey(componentAPIs, { supported: true }) as keyof ComponentAPIs,

      componentAPIs,
      canCodeBeFormatted: false,
      wasCodeChanged: false,
    }
  }

  static getDerivedStateFromProps(
    props: SourceManagerProps,
    state: SourceManagerState,
  ): Partial<SourceManagerState> {
    const { componentAPIs, currentCodeAPI, currentCodeLanguage, currentCode: storedCode } = state

    const sourceCodes = componentAPIs[currentCodeAPI].sourceCode
    const originalCode = sourceCodes[currentCodeLanguage]

    const currentCode = storedCode || originalCode
    const formattedCode = safeFormatCode(
      currentCode,
      currentCodeLanguage === 'ts' ? 'typescript' : 'babylon',
    )

    return {
      originalCode,
      currentCode,
      formattedCode,

      canCodeBeFormatted: !!formattedCode ? currentCode !== formattedCode : false,
      wasCodeChanged: originalCode !== currentCode,
    }
  }

  handleCodeAPIChange = (newAPI: keyof ComponentAPIs): void => {
    this.setState({
      currentCodeAPI: newAPI,
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
      currentCodeLanguage: newLanguage,
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
