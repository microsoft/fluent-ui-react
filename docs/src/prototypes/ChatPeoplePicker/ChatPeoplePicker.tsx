import * as React from 'react'
import * as _ from 'lodash'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'
import {
  Label,
  Input,
  Image,
  MenuItem,
  List,
  Provider,
  Text,
  ThemePrepared,
  ICSSInJSStyle,
} from '@stardust-ui/react'
import keyboardKey from 'keyboard-key'
import { peoplePickerStyles } from './ChatPeoplePickerStyles'
const {
  peopleLabel,
  ariaLive,
  containerDiv,
  containerDivFocused,
  inputComp,
  inputSlot,
  labelIcon,
  listboxUL,
  addedPeopleLabel,
} = peoplePickerStyles

interface RequiredPeopleData {
  name: string // acts as key
}
export interface PeopleData extends RequiredPeopleData {
  name: string
  image: string
  description: string
}

interface PeoplePickerProps {
  items?: PeopleData[]
  filter?: (inputValue: string, item: PeopleData) => boolean
  inputValueChanged?: (inputValue: string) => void
  width?: string
  maxHeight?: string
  style?: ICSSInJSStyle
}

interface PeoplePickerState {
  selected: RequiredPeopleData[]
  available: PeopleData[]
  inputValue: string
  message: string
  focused: boolean
  deleteOnBackspace: boolean
}

export class ChatPeoplePicker extends React.Component<PeoplePickerProps, PeoplePickerState> {
  private input: HTMLElement

  private getAvailableItems = (inputValue: string, selectedItems: RequiredPeopleData[]) => {
    const unselectedItems = this.getUnselectedItems(selectedItems)
    return inputValue
      ? unselectedItems.filter(item => this.props.filter(inputValue, item))
      : unselectedItems
  }

  private getUnselectedItems = (selectedItems: RequiredPeopleData[]) =>
    this.props.items.filter(item => !selectedItems.find(selected => selected.name === item.name))

  static defaultProps = {
    filter: () => true,
  }

  public state = {
    selected: [],
    focused: false,
    inputValue: '',
    deleteOnBackspace: true,
    available: this.getAvailableItems('', []),
    message: '',
  }

  public componentDidUpdate(prevProps, prevState: PeoplePickerState) {
    const inputValue = this.state.inputValue
    if (inputValue !== prevState.inputValue) {
      _.invoke(this.props, 'inputValueChanged', inputValue)
    }
  }

  public render(): React.ReactNode {
    return (
      <div
        style={{
          ...this.props.style,
          width: this.props.width || containerDiv.width,
        }}
      >
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
            const containerStyles = {
              ...containerDiv,
              ...(this.state.focused && containerDivFocused),
            }
            if (this.props.width) {
              containerStyles.width = this.props.width
            }
            return (
              <div>
                <Label
                  content="Add people"
                  styles={peopleLabel.styles}
                  variables={peopleLabel.variables}
                  {...getLabelProps()}
                />
                <div style={containerStyles} onClick={this.onContainerClick.bind(this, isOpen)}>
                  <span aria-live="assertive" style={ariaLive}>
                    {this.state.message}
                  </span>
                  {this.renderSelected()}
                  <Input
                    inputRef={input => (this.input = input)}
                    onFocus={this.onInputFocus}
                    onKeyUp={this.onInputKeyUp}
                    styles={inputComp.styles}
                    variables={inputComp.variables}
                    wrapper={{
                      role: 'presentation',
                    }}
                    input={{
                      type: 'text',
                      styles: inputSlot.styles,
                      placeholder:
                        this.state.selected.length > 0 || this.state.inputValue.length > 0
                          ? ''
                          : 'Start typing a name',
                      ...inputIntegratedProps,
                    }}
                  />
                </div>
                <Provider.Consumer
                  render={({ siteVariables }: ThemePrepared) => {
                    return this.renderList(
                      siteVariables,
                      getMenuProps,
                      getItemProps,
                      isOpen,
                      highlightedIndex,
                    )
                  }}
                />
              </div>
            )
          }}
        </Downshift>
      </div>
    )
  }

  private handleCloseIconAction(element, event) {
    this.removeFromSelected(element)
    this.input.focus()

    event.stopPropagation()
  }

  private addToSelected(element) {
    this.setState(({ selected }) => {
      const newSelected = [...selected, element]

      return {
        selected: newSelected,
        available: this.getAvailableItems('', newSelected),
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
      available: this.getAvailableItems(inputValue, selected),
      message: `${(element || poppedElement).name} has been removed.`,
    })
  }

  private renderSelected() {
    return this.state.selected.length === 0
      ? null
      : this.state.selected.map((element, index) => (
          <Label
            role="presentation"
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
              variables: labelIcon.variables,
            }}
            styles={addedPeopleLabel.styles}
            variables={addedPeopleLabel.variables}
          />
        ))
  }

  private renderAvailable(siteVariables, getItemProps, highlightedIndex) {
    return this.state.available.map((item, index) => ({
      key: `peoplePickerItem-${index}`,
      header: item.name,
      content: item.description,
      styles: {
        backgroundColor: highlightedIndex === index ? siteVariables.green : siteVariables.black,
      },
      variables: siteVariables => ({
        contentColor: siteVariables.white,
        headerColor: siteVariables.white,
      }),
      media: <Image src={item.image} avatar />,
      ...getItemProps({
        index,
        item,
      }),
    }))
  }

  private renderNoItemsFound(siteVariables) {
    return [
      {
        key: 'peoplePickerNoResultsItem',
        styles: {
          backgroundColor: siteVariables.black,
          textAlign: 'center',
        },
        content: <Text weight="bold" content="We couldn't find any matches." />,
      },
    ]
  }

  private renderList(siteVariables, getMenuProps, getItemProps, isOpen, highlightedIndex) {
    const listStyles = listboxUL

    if (this.props.maxHeight) {
      listStyles.maxHeight = this.props.maxHeight
    }
    if (this.props.width) {
      listStyles.width = this.props.width
    }

    return (
      <List
        {...getMenuProps()}
        styles={listStyles}
        aria-hidden={!isOpen}
        items={
          isOpen
            ? this.state.available.length > 0
              ? this.renderAvailable(siteVariables, getItemProps, highlightedIndex)
              : this.renderNoItemsFound(siteVariables)
            : []
        }
      />
    )
  }

  private stateReducer = (
    state: DownshiftState<MenuItem>,
    changes: StateChangeOptions<MenuItem>,
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        this.setState({
          inputValue: changes.inputValue,
          deleteOnBackspace: !(changes.inputValue === '' && state.inputValue.length === 1),
          available: this.getAvailableItems(changes.inputValue, this.state.selected),
        })
        return changes
      default:
        return changes
    }
  }

  private onDropdownChange = element => {
    this.addToSelected(element)
  }

  private onInputFocus = () => {
    this.setState({ focused: true })
  }

  private onInputBlur = () => {
    this.setState({ focused: false })
  }

  private onInputKeyDown = (highlightedIndex, selectItemAtIndex, event) => {
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

  private onInputKeyUp = event => {
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

  private onContainerClick = isOpen => {
    !isOpen && this.input.focus()
  }

  private onCloseIconClick = (element, event) => this.handleCloseIconAction(element, event)

  private onCloseIconKeyDown = (element, event) => {
    if (keyboardKey.getCode(event) === keyboardKey.Enter) {
      this.handleCloseIconAction(element, event)
    }
  }
}

export default ChatPeoplePicker
