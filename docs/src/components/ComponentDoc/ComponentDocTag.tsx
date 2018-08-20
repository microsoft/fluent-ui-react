import * as React from 'react'
import * as _ from 'lodash'
import { Header, Message } from 'semantic-ui-react'
const behaviorMenuItems = require('docs/src/componentMenuBehaviors')

const headerStyle = {
  whiteSpace: 'pre-line',
}

class ComponentDocTag extends React.Component<any, any> {
  getTagDescription = (forTag, fromInfo) => {
    const tags = (fromInfo.docblock && fromInfo.docblock.tags) || []
    return _.result(_.find(tags, 'title', forTag), 'description')
  }

  getBehaviorURLandName = fromInfo => {
    const accProperty = fromInfo.props.find(property => {
      if (property.name === 'accessibility') {
        return property
      }
    })
    if (!accProperty) {
      return {
        name: undefined,
        url: undefined,
      }
    }
    const accPropertyFormatted = accProperty.defaultValue.split('.').pop() + '.ts'
    // const behaviorFiltered = behaviorMenuItems.filter(behavior => behavior.variations.find(variation => variation.name.includes(accPropertyFormatted)))
    //   .map(behavior => ({
    //     type: behavior.type,
    //     displayName: behavior.displayName,
    //     defaultFile: behavior.variations.find(variation => variation.name.includes(accPropertyFormatted)).name,
    //   }))

    const behaviorFiltered = []
    behaviorMenuItems.forEach(behavior => {
      return behavior.variations.find(variation => {
        if (variation.name === accPropertyFormatted) {
          behaviorFiltered.push({
            type: behavior.type,
            displayName: behavior.displayName,
            defaultFile: variation.name,
          })
        }
      })
    })

    if (behaviorFiltered && behaviorFiltered.length > 0) {
      const behaviorsFolder = behaviorFiltered[0].type + 's'
      return {
        name: `${behaviorFiltered[0].defaultFile}`,
        url: `${behaviorsFolder}/${behaviorFiltered[0].displayName}`,
      }
    }
    return {
      name: undefined,
      url: undefined,
    }
  }

  render() {
    const { info, tag, title, errorMessage } = this.props
    const description = this.getTagDescription(tag, info) || (
      <Message error content={errorMessage} compact={true} />
    )

    return (
      <Header as="h2" style={headerStyle}>
        <Header.Content>{title}</Header.Content>
        <Header.Subheader>
          {' '}
          Default behavior:{' '}
          <a href={this.getBehaviorURLandName(info).url}>
            {' '}
            {this.getBehaviorURLandName(info).name}{' '}
          </a>{' '}
        </Header.Subheader>
        <Header.Subheader> {description} </Header.Subheader>
      </Header>
    )
  }
}

export default ComponentDocTag
