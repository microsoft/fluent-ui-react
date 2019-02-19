import * as _ from 'lodash'
import * as React from 'react'
import CodeSandboxer from 'react-codesandboxer'

import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import { imports } from 'docs/src/components/Playground/renderConfig'
import { updateForKeys } from 'docs/src/hoc'
import { appTemplateJs } from './indexTemplates'
import LabelledButton from '../ComponentButton'

type ComponentControlsCodeSandboxProps = {
  exampleCode: string
  exampleLanguage: ComponentSourceManagerLanguage
  exampleName: string
  active: boolean
}

type ComponentControlsCodeSandboxState = {
  exampleCode: string
  sandboxUrl: string
}

class ComponentControlsShowCode extends React.Component<
  ComponentControlsCodeSandboxProps,
  ComponentControlsCodeSandboxState
> {
  state = {
    exampleCode: '',
    sandboxUrl: '',
  }

  static getDerivedStateFromProps(
    props: ComponentControlsCodeSandboxProps,
    state: ComponentControlsCodeSandboxState,
  ): Partial<ComponentControlsCodeSandboxState> {
    return {
      exampleCode: props.exampleCode,
      sandboxUrl: props.exampleCode === state.exampleCode ? state.sandboxUrl : '',
    }
  }

  handleDeploy = (embedUrl: string, sandboxId: string) => {
    const sandboxUrl = `https://codesandbox.io/s/${sandboxId}?module=/example.js`

    this.setState({ sandboxUrl })
  }

  handleClick = e => {
    const { sandboxUrl } = this.state
    e.preventDefault()
    window.open(sandboxUrl)
  }

  render() {
    const { active, exampleLanguage, exampleCode, exampleName } = this.props
    const { sandboxUrl } = this.state

    if (exampleLanguage === 'ts') {
      return <LabelledButton label="CodeSandbox" iconName="connectdevelop" active={active} />
    }

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
        examplePath="/"
        example={exampleCode}
        dependencies={_.mapValues(imports, () => 'latest')}
        /* Magic trick to reload sources on passed code update */
        key={exampleCode}
        name={exampleName}
        providedFiles={{
          'index.js': { content: appTemplateJs },
        }}
        skipRedirect
        template="create-react-app"
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
