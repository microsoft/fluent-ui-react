import * as React from 'react'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'
import { Label, Button, Input, Image, MenuItem, List, Provider, Text } from '@stardust-ui/react'
import * as _ from 'lodash'
import keyboardKey from 'keyboard-key'
import { IThemePrepared } from 'types/theme'
import { peoplePickerStyles } from './ChatPeoplePickerStyles'

interface IPeoplePickerProps {
  source: (
    inputValue: string,
    selected: any[],
  ) => { name: string; image: string; position: string }[]
  width?: any
}

interface IPeoplePickerState {
  selected: any[]
  focused: boolean
  inputValue: string
  deleteOnBackspace: boolean
  available: any[]
  message: string
}

export class ChatPeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {
  private input: any

  constructor(props) {
    super(props, {})

    this.state = {
      selected: [],
      focused: false,
      inputValue: '',
      deleteOnBackspace: true,
      available: this.props.source('', []),
      message: '',
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
        message: `${element.name} has been selected.`,
      }
    })
  }

  private removeFromSelected(element?) {
    let { selected } = this.state
    let poppedElement
    const { inputValue } = this.state
    if (element) {
      selected = selected.filter(currentElement => currentElement !== element)
    } else {
      poppedElement = selected.pop()
    }
    this.setState({
      selected,
      available: this.props.source(inputValue, selected),
      message: `${(element || poppedElement).name} has been removed.`,
    })
  }

  public render(): React.ReactNode {
    return (
      <div style={{ width: this.props.width }}>
        {/* Added label outside because otherwise I could click outside the combobox on the same line with the label and listbox would not close. */}
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
            getLabelProps,
            getRootProps,
          }) => {
            // making the input attributes aria 1.0 conformant
            const inputIntegratedProps = {
              ...getRootProps({ refKey: undefined }, { suppressRefError: true }),
              ...getInputProps({
                onBlur: this.onInputBlur,
                onKeyDown: this.onInputKeyDown.bind(this, highlightedIndex, selectItemAtIndex),
              }),
              'aria-haspopup': true,
              'aria-controls': undefined,
              'aria-labelledby': undefined,
            }

            return (
              <div>
                <Label
                  content="Add people"
                  variables={{ backgroundColor: peoplePickerStyles.addPeopleLabel.backgroundColor }}
                  {...getLabelProps()}
                />
                <div
                  style={{
                    ...peoplePickerStyles.containerDiv,
                    ...(this.state.focused && peoplePickerStyles.containerDivFocused),
                  }}
                  onClick={this.onContainerClick.bind(this, isOpen)}
                >
                  <span aria-live="assertive" style={peoplePickerStyles.ariaLive}>
                    {this.state.message}
                  </span>
                  {this.state.selected.length === 0
                    ? null
                    : this.state.selected.map((element, index) => (
                        <Label
                          role="presentation"
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
                      type: 'text',
                      style: peoplePickerStyles.editText.input,
                      placeholder:
                        this.state.selected.length > 0 || this.state.inputValue.length > 0
                          ? ''
                          : 'Start typing a name',
                      ...inputIntegratedProps,
                    }}
                  />
                </div>
                <Provider.Consumer
                  render={({ siteVariables }: IThemePrepared) => {
                    return (
                      <List
                        {...getMenuProps()}
                        styles={{ width: this.props.width, ...peoplePickerStyles.listboxUL }}
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
        <div style={peoplePickerStyles.buttons.both}>
          <Button type="secondary" content="Cancel" style={peoplePickerStyles.buttons.cancel} />
          <Button type="primary" content="Add" style={peoplePickerStyles.buttons.add} />
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
