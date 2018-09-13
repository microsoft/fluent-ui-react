import * as React from 'react'
import Downshift from 'downshift'
import { UIComponent, pxToRem } from '../../lib'
import Label from '../Label'
import Input from '../Input'
import Menu from '../Menu'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

const styles: any = {
  div: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    outline: 0,
    border: 0,
    borderRadius: `0.2143rem`,
    borderBottom: `0.1429rem solid transparent`,
    color: '#252423',
    backgroundColor: '#F3F2F1',
  },
  onFocus: {
    borderColor: '#6264A7',
    borderRadius: '0.2143rem 0.2143rem 0.1429rem 0.1429rem',
  },
  labelAdd: {
    root: { backgroundColor: 'white' },
  },
  input: {
    input: {
      width: '100%',
      ':focus': {
        borderColor: 'transparent',
      },
    },
    root: { flexGrow: 1 },
  },
}

interface IPeoplePickerProps {
  source: (inputValue: string, selected: any[]) => { name: string; image: string }[]
}

interface IPeoplePickerState {
  selected: any[]
  focused: boolean
}

export class PeoplePicker extends UIComponent<IPeoplePickerProps, IPeoplePickerState> {
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

  state = {
    selected: [],
    focused: false,
  }

  private handleSelection = element => {
    this.add(element)
  }

  private add(element) {
    this.setState(({ selected }) => ({
      selected: [...selected, element],
    }))
  }

  private remove(element) {
    this.setState(({ selected }) => ({
      selected: selected.filter(currentElement => currentElement !== element),
    }))
  }

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
          onChange={this.handleSelection}
          selectedItem={null}
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
              <Label content="Add" {...getLabelProps()} styles={styles.labelAdd} />
              <div
                style={
                  this.state.focused ? { ...styles.div, ...styles.onFocus } : { ...styles.div }
                }
              >
                {this.state.selected.length > 0
                  ? this.state.selected.map((element, index) => (
                      <Label
                        circular
                        key={`peoplePickerItem-${index}`}
                        content={element.name}
                        image={{
                          src: element.image,
                          avatar: true,
                        }}
                        icon={{
                          name: 'close',
                          onClick: () => {
                            this.remove(element)
                          },
                        }}
                      />
                    ))
                  : null}
                <Input
                  styles={styles.input}
                  placeholder={this.state.selected.length > 0 ? '' : 'Start typing a name'}
                  onFocus={() => {
                    this.setState({ focused: true })
                  }}
                  onBlur={() => {
                    this.setState({ focused: false })
                  }}
                  {...getInputProps()}
                />
              </div>
              {isOpen && (
                <Menu
                  vertical
                  fluid
                  {...getMenuProps()}
                  defaultActiveIndex={0}
                  items={this.props.source(inputValue, this.state.selected).map((item, index) => {
                    return {
                      key: `peoplePickerItem-${index}`,
                      content: item.name,
                      ...getItemProps({
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
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
