import * as React from 'react'
import CodeSandboxer from 'react-codesandboxer'

import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import { updateForKeys } from 'docs/src/hoc'
import { appTemplateJs, appTemplateTs } from './indexTemplates'
import LabelledButton from '../ComponentButton'
import createPackageJson from './createPackageJson'

type ComponentControlsCodeSandboxProps = {
  exampleCode: string
  exampleLanguage: ComponentSourceManagerLanguage
  exampleName: string
  active: boolean
}

type ComponentControlsCodeSandboxState = {
  exampleCode: string
  examplePath: string
  sandboxUrl: string
}

class ComponentControlsShowCode extends React.Component<
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

  handleClick = e => {
    const { sandboxUrl } = this.state
    e.preventDefault()
    window.open(sandboxUrl)
  }

  render() {
    const { active, exampleLanguage, exampleCode, exampleName } = this.props
    const { examplePath, sandboxUrl } = this.state

    const main = exampleLanguage === 'ts' ? 'index.tsx' : 'index.js'
    const appTemplate = exampleLanguage === 'ts' ? appTemplateTs : appTemplateJs
    const template = exampleLanguage === 'ts' ? 'create-react-app-typescript' : 'create-react-app'

    if (sandboxUrl) {
      return (
        <LabelledButton
          label="Click to open"
          onClick={this.handleClick}
          iconName="checkmark"
          active={active}
        />
      )
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
        {({ isLoading, isDeploying, active }) => {
          const loading = isLoading || isDeploying
          return (
            <LabelledButton
              iconName={loading ? 'spinner' : 'connectdevelop'}
              label={loading ? 'Exporting...' : 'CodeSandbox'}
              active={active}
            />
          )
        }}
      </CodeSandboxer>
    )
  }
}

export default updateForKeys(['exampleCode', 'active'])(ComponentControlsShowCode)
