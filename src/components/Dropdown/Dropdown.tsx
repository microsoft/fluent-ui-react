import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Extendable } from '../../../types/utils'
import { ComponentSlotStyle } from '../../themes/types'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'
import Label from '../Label/Label'
import { UIComponent, customPropTypes } from '../../lib'
import Input from '../Input/Input'
import keyboardKey from 'keyboard-key'
import List from '../List/List'
import Text from '../Text/Text'
import Image from '../Image/Image'
import ListItem from '../List/ListItem'
import _ from 'lodash'
import Icon from '../Icon/Icon'

export interface DropdownProps {
  className?: string
  fluid?: boolean
  items?: DropdownListItem[]
  multiple?: boolean
  onChange?: (active: DropdownListItem | DropdownListItem[]) => any
  onSearchChange?: (inputValue: string) => any
  placeholder?: string
  search?: boolean
  styles?: ComponentSlotStyle<DropdownProps, DropdownState>
  toggleButton?: boolean
}

export interface DropdownState {
  active: DropdownListItem | DropdownListItem[]
  backspaceDelete: boolean
  focused: boolean
  inputValue?: string
  message?: string
}

export interface DropdownListItem {
  key: string
  header?: string
  content: string
  image?: string
}

/**
 */
export default class Dropdown extends UIComponent<Extendable<DropdownProps>, DropdownState> {
  private inputRef: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand array of props for ListItem. */
    items: customPropTypes.collectionShorthand,

    /** A dropdown can have a multiple selection. */
    multiple: PropTypes.bool,

    /**
     * Callback for change in dropdown active element(s).
     * @param {DropdownListItem|DropdownListItem[]} active - Dropdown active element(s).
     */
    onChange: PropTypes.func,

    /**
     * Callback for change in dropdown search value/
     * @param {string} inputValue - The new value in the search field.
     */
    onSearchChange: PropTypes.func,

    /** A message to serve as placeholder. */
    placeholder: PropTypes.string,

    /** A dropdown can have a search field. */
    search: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A dropdown can have a toggle button. */
    toggleButton: PropTypes.bool,
  }

  state: DropdownState = {
    active: this.props.multiple ? [] : null,
    focused: false,
    inputValue: '',
    backspaceDelete: true,
  }

  public renderComponent({ ElementType, styles, variables }): React.ReactNode {
    const { search, multiple, toggleButton } = this.props
    const { inputValue } = this.state
    // we hold active elemts in the array, downshift should not know anything.
    const selectedPropIfMultiple = { ...(multiple && { selectedItem: null }) }

    return (
      <ElementType>
        <Downshift
          onChange={this.handleChange}
          inputValue={inputValue}
          {...selectedPropIfMultiple}
          stateReducer={this.stateReducer}
          itemToString={(item: DropdownListItem) => (item ? item.header : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            getRootProps,
            getToggleButtonProps,
            isOpen,
            highlightedIndex,
            selectItemAtIndex,
          }) => {
            return (
              <div style={styles.containerDiv} onClick={this.onContainerClick.bind(this, isOpen)}>
                <span aria-live="assertive" style={styles.ariaLiveSpan}>
                  {this.state.message}
                </span>
                {multiple && this.renderActive(styles)}
                {search &&
                  this.renderInput(
                    styles,
                    variables,
                    getRootProps,
                    getInputProps,
                    highlightedIndex,
                    selectItemAtIndex,
                  )}
                {toggleButton && this.renderToggleButton(getToggleButtonProps, styles, isOpen)}
                {this.renderList(
                  styles,
                  variables,
                  getMenuProps,
                  getItemProps,
                  isOpen,
                  highlightedIndex,
                )}
              </div>
            )
          }}
        </Downshift>
      </ElementType>
    )
  }

  private renderInput(
    styles,
    variables,
    getRootProps,
    getInputProps,
    highlightedIndex,
    selectItemAtIndex,
  ): JSX.Element {
    const { multiple, placeholder } = this.props
    const { inputValue, active } = this.state

    return (
      <Input
        inputRef={input => (this.inputRef = input)}
        onFocus={this.onInputFocus}
        onKeyUp={multiple && this.onInputKeyUpIfMultiple}
        styles={styles.editTextDiv}
        wrapper={{ ...getRootProps({ refKey: 'slotRef' }, { suppressRefError: true }) }}
        variables={{ inputFocusBorderColor: variables.editTextInputFocusBorderColor }}
        input={{
          type: 'text',
          styles: styles.editTextInput,
          placeholder:
            inputValue.length > 0 || (multiple && (active as DropdownListItem[]).length > 0)
              ? ''
              : placeholder,
          ...getInputProps({
            onBlur: this.onInputBlur,
            onKeyDown: this.onInputKeyDown.bind(this, highlightedIndex, selectItemAtIndex),
          }),
        }}
      />
    )
  }

  private renderToggleButton(getToggleButtonProps, styles, isOpen) {
    return (
      <Icon
        name={`chevron ${isOpen ? 'up' : 'down'}`}
        as="button"
        tabIndex="-1"
        styles={styles.toggleButton}
        {...getToggleButtonProps()}
      />
    )
  }

  private renderList(styles, variables, getMenuProps, getItemProps, isOpen, highlightedIndex) {
    return (
      <List
        {...getMenuProps({ refKey: 'listRef' })}
        styles={styles.list}
        aria-hidden={!isOpen}
        items={isOpen ? this.renderItems(variables, getItemProps, highlightedIndex) : []}
      />
    )
  }

  private renderItems(variables, getItemProps, highlightedIndex) {
    const { items } = this.props
    if (items.length > 0) {
      return items.map((item, index) => {
        const optionalItemProps = {
          media: item.image && <Image src={item.image} avatar />,
          header: item.header,
        }
        return (
          <ListItem
            key={item.key}
            content={item.content}
            {...optionalItemProps}
            variables={{
              ...(highlightedIndex === index && {
                headerColor: variables.listItemTextColor,
                contentColor: variables.listItemTextColor,
              }),
            }}
            styles={{
              backgroundColor:
                highlightedIndex === index
                  ? variables.listItemHighlightedBackgroundColor
                  : variables.listItemBackgroundColor,
            }}
            {...getItemProps({ index, item })}
          />
        )
      })
    }
    // render no match error.
    return [
      {
        key: 'people-picker-no-results-item',
        content: <Text weight="bold" content={`We couldn't find any matches.`} />,
        styles: {
          backgroundColor: variables.listItemBackgroundColor,
        },
      },
    ]
  }

  private renderActive(styles) {
    const active = this.state.active as DropdownListItem[]

    return active.length === 0
      ? null
      : active.map((item, index) => {
          const optionalImage = {
            image: item.image && { src: item.image, avatar: true },
          }
          return (
            <Label
              role="presentation"
              styles={styles.activeListLabel}
              circular
              key={`active-item-${index}`}
              content={item.content}
              {...optionalImage}
              icon={{
                name: 'close',
                onClick: this.onCloseIconClick.bind(this, item),
                onKeyDown: this.onCloseIconKeyDown.bind(this, item),
                'aria-label': `Remove ${item.header} from selection.`,
                'aria-hidden': false,
                role: 'button',
              }}
            />
          )
        })
  }

  onInputFocus = () => {
    this.setState({ focused: true })
  }

  onInputBlur = () => {
    this.setState({ focused: false })
  }

  onContainerClick = isOpen => {
    !isOpen && this.inputRef.focus()
  }

  onInputKeyUpIfMultiple = event => {
    const { inputValue, active, backspaceDelete } = this.state

    switch (keyboardKey.getCode(event)) {
      case keyboardKey.Backspace:
        if (inputValue === '' && (active as DropdownListItem[]).length > 0) {
          if (!backspaceDelete) {
            this.setState({ backspaceDelete: true })
          } else {
            this.removeFromActive()
          }
        }
      default:
        return
    }
  }

  handleChange = element => {
    const { multiple } = this.props
    const newActive = multiple ? [...(this.state.active as DropdownListItem[]), element] : element

    _.invoke(this.props, 'onChange', newActive)

    this.setState({
      active: newActive,
      inputValue: '',
      message: `${element.header} has been selected.`,
    })
  }

  onCloseIconClick = (element, event) => this.handleCloseIconAction(element, event)

  onCloseIconKeyDown = (element, event) => {
    if (keyboardKey.getCode(event) === keyboardKey.Enter) {
      this.handleCloseIconAction(element, event)
    }
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

  stateReducer = (state: DownshiftState<any>, changes: StateChangeOptions<any>) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        _.invoke(this.props, 'onSearchChange', changes.inputValue)
        this.setState({
          inputValue: changes.inputValue,
          backspaceDelete: !(state.inputValue.length > 0 && changes.inputValue.length === 0),
        })
        return changes
      default:
        return changes
    }
  }

  private handleCloseIconAction(element, event) {
    this.removeFromActive(element)
    this.inputRef.focus()
    event.stopPropagation()
  }

  private removeFromActive(element?) {
    let active = this.state.active as DropdownListItem[]
    let poppedElement = element

    if (poppedElement) {
      active = active.filter(currentElement => currentElement !== element)
    } else {
      poppedElement = active.pop()
    }

    _.invoke(this.props, 'onChange', active)

    this.setState({
      active,
      message: `${poppedElement.header} has been removed.`,
    })
  }
}
