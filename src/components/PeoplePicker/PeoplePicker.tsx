import * as React from 'react'
import Downshift from 'downshift'
import Label from '../Label'
import Input from '../Input'
import Menu from '../Menu'
import * as _ from 'lodash'
import keyboardKey from 'keyboard-key'
import Button from '../Button'
import { pxToRem } from '../../lib'

const peoplePickerStyles: any = {
  containerDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    outline: 0,
    border: 0,
    borderRadius: `0.2143rem`,
    borderBottom: `0.1429rem solid transparent`,
    color: '#252423',
    backgroundColor: '#F3F2F1',
    borderColor: 'transparent',
  },
  personContainerLabel: {
    root: {
      margin: '.4rem 0 0 .4rem',
    },
  },
  containerDivOnFocus: {
    borderColor: '#6264A7',
    borderRadius: '0.2143rem 0.2143rem 0.1429rem 0.1429rem',
  },
  addLabel: {
    root: { backgroundColor: 'white' },
  },
  textInput: {
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

export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {
  private input: any
  private labelId: string = 'picker-label-id'

  constructor(props) {
    super(props, {})

    this.state = {
      selected: [],
      focused: false,
    }

    this.input = React.createRef()
  }

  private handleSelection = element => {
    this.add(element)
  }

  private add(element) {
    this.setState(({ selected }) => ({
      selected: [...selected, element],
    }))
  }

  private remove(element?) {
    let { selected } = this.state
    if (element) {
      selected = selected.filter(currentElement => currentElement !== element)
    } else {
      selected.pop()
    }
    this.setState({ selected })
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Label content="Add" styles={peoplePickerStyles.addLabel} id={this.labelId} />
        <Downshift
          onChange={this.handleSelection}
          selectedItem={null}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            toggleMenu,
          }) => {
            return (
              <div id="people-picker">
                <div
                  id="people-picker-container"
                  style={{
                    ...peoplePickerStyles.containerDiv,
                    ...(this.state.focused ? peoplePickerStyles.containerDivOnFocus : {}),
                  }}
                  onClick={() => {
                    toggleMenu()
                    !isOpen && this.input.current.inputRef.focus()
                  }}
                >
                  {this.state.selected.length === 0
                    ? null
                    : this.state.selected.map((element, index) => (
                        <Label
                          styles={peoplePickerStyles.personContainerLabel}
                          circular
                          key={`peoplePickerItem-${index}`}
                          content={element.name}
                          image={{
                            src: element.image,
                            avatar: true,
                          }}
                          icon={{
                            name: 'close',
                            onClick: event => {
                              this.remove(element)
                              this.input.current.inputRef.focus()
                              event.stopPropagation()
                            },
                            onKeyDown: event => {
                              if (keyboardKey.getCode(event) === keyboardKey.Enter) {
                                this.remove(element)
                                this.input.current.inputRef.focus()
                                event.stopPropagation()
                              }
                            },
                          }}
                        />
                      ))}
                  <Input
                    styles={peoplePickerStyles.textInput}
                    ref={this.input}
                    placeholder={this.state.selected.length > 0 ? '' : 'Start typing a name'}
                    onFocus={() => {
                      this.setState({ focused: true })
                    }}
                    onKeyUp={event => {
                      if (keyboardKey.getCode(event) === keyboardKey.Backspace && !inputValue) {
                        this.state.selected.length > 0 && this.remove()
                      }
                    }}
                    {...getInputProps()}
                    aria-labelledby={this.labelId}
                    onBlur={() => {
                      this.setState({ focused: false })
                    }}
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
            )
          }}
        </Downshift>
        <div
          style={{
            marginTop: `${pxToRem(8)}`,
            textAlign: 'right',
          }}
        >
          <Button type="secondary" content="Cancel" style={{ margin: '0' }} />
          <Button type="primary" content="Add" style={{ margin: `0 0 0 ${pxToRem(8)}` }} />
        </div>
      </React.Fragment>
    )
  }
}

export default PeoplePicker
