import * as React from 'react'
import Downshift from 'downshift'
import { UIComponent } from '../../lib'
import Label from '../Label'
import Input from '../Input'
import Menu from '../Menu'
import * as PropTypes from 'prop-types'

export class PeoplePicker extends UIComponent<any, any> {
  static displayName = 'PeoplePicker'

  static create: Function

  static className = 'ui-people-picker'

  static propTypes = {
    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** Callback function that takes as input the content of the text field and returns name suggestions. */
    source: PropTypes.PropTypes.func,
  }

  static handledProps = ['styles', 'source']

  static defaultProps = {}

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    rest,
  }): React.ReactNode {
    return (
      <ElementType>
        <Downshift
          onChange={selection => alert(`You selected ${selection.value}`)}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <Label
                content="Add"
                {...getLabelProps()}
                styles={{ root: { backgroundColor: 'white' } }}
              />
              <Input fluid placeholder="Search..." {...getInputProps()} />
              {isOpen && (
                <Menu
                  vertical
                  fluid
                  {...getMenuProps()}
                  defaultActiveIndex={0}
                  items={this.props.source(inputValue).map((item, index) => {
                    const key = `peoplePickerItem-${index}`
                    return {
                      key,
                      content: item.value,
                      ...getItemProps({
                        key,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      }),
                    }
                  })}
                />
              )}
            </div>
          )}
        </Downshift>
      </ElementType>
    )
  }
}

export default PeoplePicker
