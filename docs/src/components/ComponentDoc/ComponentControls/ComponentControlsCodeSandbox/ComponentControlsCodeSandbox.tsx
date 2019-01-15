import * as _ from 'lodash'
import * as React from 'react'
import CodeSandboxer from 'react-codesandboxer'

import { Menu } from 'semantic-ui-react'
import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import { imports } from 'docs/src/components/Playground/renderConfig'
import { updateForKeys } from 'docs/src/hoc'
import { appTemplateJs } from './indexTemplates'

type ComponentControlsCodeSandboxProps = {
  exampleCode: string
  exampleLanguage: ComponentSourceManagerLanguage
  exampleName: string
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

  render() {
    const { exampleLanguage, exampleCode, exampleName } = this.props
    const { sandboxUrl } = this.state

    if (exampleLanguage === 'ts') {
      return (
        <Menu.Item
          disabled
          content="CodeSandbox"
          icon="connectdevelop"
          title="Export of TypeScript code is not supported"
        />
      )
    }

    if (sandboxUrl) {
      return (
        <Menu.Item
          as="a"
          content="Click to open"
          href={sandboxUrl}
          icon={{ color: 'green', name: 'checkmark' }}
          target="_blank"
          title="Open in a new tab"
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
        {({ isLoading, isDeploying }) => {
          const loading = isLoading || isDeploying

          return (
            <Menu.Item
              as="a"
              content={loading ? 'Exporting...' : 'CodeSandbox'}
              icon={{
                loading,
                name: loading ? 'spinner' : 'connectdevelop',
              }}
              title="Export to CodeSandbox"
            />
          )
        }}
      </CodeSandboxer>
    )
  }
}

export default updateForKeys(['exampleCode'])(ComponentControlsShowCode)
