import * as React from 'react'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'
import { Label, Input, Button, Image, MenuItem, List, Provider, Text } from '@stardust-ui/react'
import * as _ from 'lodash'
import keyboardKey from 'keyboard-key'
import { pxToRem } from 'src/lib'
import { IThemePrepared, ICSSInJSStyle } from 'types/theme'

type TChatPeoplePickerStyles = {
  containerDiv: any
  containerDivFocused: any
  personContainerLabel: ICSSInJSStyle
  addPeopleLabel: ICSSInJSStyle
  editText: {
    input: ICSSInJSStyle
    div: any
    variables: { inputFocusBorderColor: any }
  }
  listboxUL: ICSSInJSStyle
}

const peoplePickerStyles: TChatPeoplePickerStyles = {
  containerDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    outline: 0,
    border: 0,
    borderRadius: `${pxToRem(3)}`,
    borderBottom: `${pxToRem(2)} solid transparent`,
    color: '#252423',
    backgroundColor: '#F3F2F1',
    borderColor: 'transparent',
  },
  personContainerLabel: { margin: '.4rem 0 0 .4rem' },
  containerDivFocused: {
    borderColor: '#6264A7',
    borderRadius: '0.2143rem 0.2143rem 0.1429rem 0.1429rem',
  },
  addPeopleLabel: { backgroundColor: '#f7f7f7' },
  editText: {
    input: {
      width: '100%',
    },
    variables: {
      inputFocusBorderColor: 'transparent',
    },
    div: {
      flexBasis: '100px',
      flexGrow: 1,
    },
  },
  listboxUL: {
    position: 'absolute',
    zIndex: 1000,
  },
}

interface IPeoplePickerProps {
  source: (
    inputValue: string,
    selected: any[],
  ) => { name: string; image: string; position: string }[]
  styles?: any
}

interface IPeoplePickerState {
  selected: any[]
  focused: boolean
  inputValue: string
  deleteOnBackspace: boolean
  available: any[]
}

export class ChatPeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {
  private input: any
  private labelId: string = 'picker-label-id'

  constructor(props) {
    super(props, {})

    this.state = {
      selected: [],
      focused: false,
      inputValue: '',
      deleteOnBackspace: true,
      available: this.props.source('', []),
    }

    this.input = React.createRef()
  }

  private handleCloseIconAction(element, event) {
    this.removeFromSelected(element)
    this.input.current.inputRef.focus()
    event.stopPropagation()
  }

  private addToSelected(element) {
    this.setState(({ selected }) => {
      const newSelected = [...selected, element]
      return {
        selected: newSelected,
        available: this.props.source('', newSelected),
        inputValue: '',
      }
    })
  }

  private removeFromSelected(element?) {
    let { selected } = this.state
    const { inputValue } = this.state
    if (element) {
      selected = selected.filter(currentElement => currentElement !== element)
    } else {
      selected.pop()
    }
    this.setState({ selected, available: this.props.source(inputValue, selected) })
  }

  public render(): React.ReactNode {
    return (
      <div style={this.props.styles}>
        {/* Added label outside because otherwise I could click outside the combobox on the same line with the label and listbox would not close. */}
        <Label
          content="Add people"
          variables={{ backgroundColor: peoplePickerStyles.addPeopleLabel.backgroundColor }}
          id={this.labelId}
        />
        <Downshift
          stateReducer={this.stateReducer}
          onChange={this.onDropdownChange}
          selectedItem={null}
          inputValue={this.state.inputValue}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            highlightedIndex,
            selectItemAtIndex,
          }) => {
            return (
              <div>
                <div
                  role="presentation"
                  style={{
                    ...peoplePickerStyles.containerDiv,
                    ...(this.state.focused && peoplePickerStyles.containerDivFocused),
                  }}
                  onClick={this.onContainerClick.bind(this, isOpen)}
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
                            onClick: this.onCloseIconClick.bind(this, element),
                            onKeyDown: this.onCloseIconKeyDown.bind(this, element),
                            'aria-label': `Remove ${element.name} from selection.`,
                            'aria-hidden': false,
                            role: 'button',
                          }}
                        />
                      ))}
                  <Input
                    ref={this.input}
                    onFocus={this.onInputFocus}
                    onKeyUp={this.onInputKeyUp}
                    role="presentation"
                    styles={peoplePickerStyles.editText.div}
                    variables={{
                      inputFocusBorderColor:
                        peoplePickerStyles.editText.variables.inputFocusBorderColor,
                    }}
                    input={{
                      style: peoplePickerStyles.editText.input,
                      placeholder: this.state.selected.length > 0 ? '' : 'Start typing a name',
                      ...getInputProps({
                        onBlur: this.onInputBlur,
                        'aria-labelledby': this.labelId,
                        onKeyDown: this.onInputKeyDown.bind(
                          this,
                          highlightedIndex,
                          selectItemAtIndex,
                        ),
                      }),
                    }}
                  />
                </div>
                <Provider.Consumer
                  render={({ siteVariables }: IThemePrepared) => {
                    return (
                      <List
                        {...getMenuProps()}
                        styles={{ width: this.props.styles.width, ...peoplePickerStyles.listboxUL }}
                        aria-hidden={!isOpen}
                        items={
                          isOpen
                            ? this.state.available.length > 0
                              ? this.state.available.map((item, index) => {
                                  return {
                                    key: `peoplePickerItem-${index}`,
                                    header: item.name,
                                    content: item.position,
                                    variables: siteVariables => ({
                                      ...(highlightedIndex === index && {
                                        contentColor: siteVariables.white,
                                        headerColor: siteVariables.white,
                                      }),
                                    }),
                                    media: <Image src={item.image} avatar />,
                                    ...getItemProps({
                                      index,
                                      item,
                                      style: {
                                        backgroundColor:
                                          highlightedIndex === index
                                            ? siteVariables.brand
                                            : siteVariables.white,
                                      },
                                    }),
                                  }
                                })
                              : [
                                  {
                                    key: 'peoplePickerNoResultsItem',
                                    styles: {
                                      backgroundColor: siteVariables.white,
                                      textAlign: 'center',
                                    },
                                    content: (
                                      <Text weight="bold" content="We couldn't find any matches." />
                                    ),
                                  },
                                ]
                            : []
                        }
                      />
                    )
                  }}
                />
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
      </div>
    )
  }

  stateReducer = (state: DownshiftState<MenuItem>, changes: StateChangeOptions<MenuItem>) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        this.setState({
          inputValue: changes.inputValue,
          deleteOnBackspace: !(changes.inputValue === '' && state.inputValue.length === 1),
          available: this.props.source(changes.inputValue, this.state.selected),
        })
        return changes
      case Downshift.stateChangeTypes.keyDownArrowUp:
        if (changes.highlightedIndex === null) {
          changes.highlightedIndex = this.state.available.length - 1
        }
      case Downshift.stateChangeTypes.keyDownArrowDown:
        if (changes.highlightedIndex === null) {
          changes.highlightedIndex = 0
        }
        return changes
      default:
        return changes
    }
  }

  onDropdownChange = element => {
    this.addToSelected(element)
  }

  onInputFocus = () => {
    this.setState({ focused: true })
  }

  onInputBlur = () => {
    this.setState({ focused: false })
  }

  onInputKeyDown = (highlightedIndex, selectItemAtIndex, event) => {
    switch (keyboardKey.getCode(event)) {
      case keyboardKey.Tab:
        if (highlightedIndex !== undefined) {
          selectItemAtIndex(highlightedIndex)
        }
        return
      default:
        return
    }
  }

  onInputKeyUp = event => {
    switch (keyboardKey.getCode(event)) {
      case keyboardKey.Backspace:
        if (this.state.inputValue === '' && this.state.selected.length > 0) {
          if (!this.state.deleteOnBackspace) {
            this.setState({ deleteOnBackspace: true })
          } else {
            this.removeFromSelected()
          }
          return
        }
      default:
        return
    }
  }

  onContainerClick = isOpen => {
    !isOpen && this.input.current.inputRef.focus()
  }

  onCloseIconClick = (element, event) => this.handleCloseIconAction(element, event)

  onCloseIconKeyDown = (element, event) => {
    if (keyboardKey.getCode(event) === keyboardKey.Enter) {
      this.handleCloseIconAction(element, event)
    }
  }
}

export default ChatPeoplePicker
