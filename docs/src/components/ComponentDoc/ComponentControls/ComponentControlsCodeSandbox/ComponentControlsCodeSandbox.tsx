import * as React from 'react'
import CodeSandboxer from 'react-codesandboxer'

import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import { appTemplate } from './indexTemplates'
import createPackageJson from './createPackageJson'

export enum CodeSandboxState {
  Default = 'DEFAULT',
  Loading = 'LOADING',
  Success = 'SUCCESS',
}

type ComponentControlsCodeSandboxProps = {
  children: (state: CodeSandboxState, onClick: (e: React.SyntheticEvent) => void) => React.ReactNode
  exampleCode: string
  exampleLanguage: ComponentSourceManagerLanguage
  exampleName: string
}

type ComponentControlsCodeSandboxState = {
  exampleCode: string
  examplePath: string
  sandboxUrl: string
}

class ComponentControlsCodeSandbox extends React.PureComponent<
  ComponentControlsCodeSandboxProps,
  ComponentControlsCodeSandboxState
> {
  state = {
    exampleCode: '',
    examplePath: '',
    sandboxUrl: '',
  }

  static getDerivedStateFromProps(
    props: ComponentControlsCodeSandboxProps,
    state: ComponentControlsCodeSandboxState,
  ): Partial<ComponentControlsCodeSandboxState> {
    return {
      exampleCode: props.exampleCode,
      examplePath: props.exampleLanguage === 'ts' ? '/example.tsx' : '/example.js',
      sandboxUrl: props.exampleCode === state.exampleCode ? state.sandboxUrl : '',
    }
  }

  handleDeploy = (embedUrl: string, sandboxId: string) => {
    const { examplePath } = this.state
    const sandboxUrl = `https://codesandbox.io/s/${sandboxId}?module=${examplePath}`

    this.setState({ sandboxUrl })
  }

  handleClick = (e: React.SyntheticEvent) => {
    const { sandboxUrl } = this.state

    e.preventDefault()
    window.open(sandboxUrl)
  }

  render() {
    const { children, exampleLanguage, exampleCode, exampleName } = this.props
    const { examplePath, sandboxUrl } = this.state

    const main = exampleLanguage === 'ts' ? 'index.tsx' : 'index.js'
    const template = exampleLanguage === 'ts' ? 'create-react-app-typescript' : 'create-react-app'

    if (sandboxUrl) {
      return children(CodeSandboxState.Success, this.handleClick)
    }

    return (
      <CodeSandboxer
        afterDeploy={this.handleDeploy}
        examplePath={examplePath}
        example={exampleCode}
        name={exampleName}
        providedFiles={{
          [main]: { content: appTemplate },
          'package.json': createPackageJson(main, exampleLanguage),
        }}
        skipRedirect
        template={template}
      >
        {({ isLoading, isDeploying }) => {
          const loading = isLoading || isDeploying

          return children(
            loading ? CodeSandboxState.Loading : CodeSandboxState.Default,
            this.handleClick,
          )
        }}
      </CodeSandboxer>
    )
  }
}

export default ComponentControlsCodeSandbox
