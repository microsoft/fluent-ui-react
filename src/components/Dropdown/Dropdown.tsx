import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Extendable, ComponentEventHandler } from '../../../types/utils'
import {
  ComponentSlotStyle,
  ComponentSlotStylesInput,
  ComponentVariablesInput,
} from '../../themes/types'
import Downshift, {
  DownshiftState,
  StateChangeOptions,
  A11yStatusMessageOptions,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  GetInputPropsOptions,
  GetToggleButtonPropsOptions,
  GetItemPropsOptions,
} from 'downshift'
import Label from '../Label/Label'
import { AutoControlledComponent, customPropTypes, RenderResultConfig } from '../../lib'
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
  defaultSearchQuery?: string
  defaultValue?: DropdownListItem | DropdownListItem[]
  fluid?: boolean
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<DropdownListItem>) => string
  getA11ySelectedMessage?: (item: DropdownListItem) => string
  getA11yRemovedMessage?: (item: DropdownListItem) => string
  getA11yRemoveItemMessage?: (item: DropdownListItem) => string
  items?: DropdownListItem[]
  itemToString?: (item: DropdownListItem) => string
  multiple?: boolean
  noResultsMessage?: string
  onBackspaceDelete?: ComponentEventHandler<DropdownProps>
  handleChange?: (value: DropdownListItem | DropdownListItem[]) => any
  onCloseIconClick?: ComponentEventHandler<DropdownProps>
  onCloseIconKeyDown?: ComponentEventHandler<DropdownProps>
  onContainerClick?: ComponentEventHandler<DropdownProps>
  onInputBlur?: ComponentEventHandler<DropdownProps>
  onInputFocus?: ComponentEventHandler<DropdownProps>
  onInputKeyDown?: ComponentEventHandler<DropdownProps>
  onLabelClick?: ComponentEventHandler<DropdownProps>
  handleSearchChange?: (searchQuery: string) => any
  placeholder?: string
  search?: boolean
  styles?: ComponentSlotStyle<DropdownProps, DropdownState>
  toggleButton?: boolean
  variables?: ComponentVariablesInput
}

export interface DropdownState {
  value: DropdownListItem | DropdownListItem[]
  backspaceDelete: boolean
  focused: boolean
  searchQuery?: string
  message?: string
}

export interface DropdownListItem {
  key: string
  header: string
  content?: string
  image?: string
}
/**
 * A Dropdown allows a user to select a value or a multitude of values from a number of options.
 */
export default class Dropdown extends AutoControlledComponent<
  Extendable<DropdownProps>,
  DropdownState
> {
  private inputRef: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The default value for the search query. */
    defaultSearchQuery: PropTypes.string,

    /** The default value of the dropdown. */
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Array of props for generating dropdown items and selected item labels if multiple selection. */
    items: PropTypes.arrayOf(customPropTypes.itemShorthand),

    /**
     * Function to be passed to create selected searchQuery from selected item. It will be displayed on selection in the
     * edit text, for search, or on the button, for non-search. Multiple search will always clear searchQuery on selection.
     */
    itemToString: PropTypes.func,

    /**
     * A function that creates custom accessability message for dropdown status.
     * @param {Object} messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
     */
    getA11yStatusMessage: PropTypes.func,

    /**
     * A function that creates custom accessability message for dropdown selection.
     * @param {DropdownListItem} item - Dropdown selected element.
     */
    getA11ySelectedMessage: PropTypes.func,

    /** A function that creates custom accessability message for dropdown removal.
     * @param {DropdownListItem} item - Dropdown removed element.
     */
    getA11yRemovedMessage: PropTypes.func,

    /** A function that creates custom accessability message for active item remove button.
     * @param {DropdownListItem} item - The active item to be removed.
     */
    getA11yRemoveItemMessage: PropTypes.func,

    /** A dropdown can perform a multiple selection. */
    multiple: PropTypes.bool,

    /** A string to be displayed when dropdown is not showing any items. */
    noResultsMessage: PropTypes.string,

    /**
     * Called on deletion by backspace when dropdown is a multiple search.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onBackspaceDelete: PropTypes.func,

    /**
     * Callback for change in dropdown active value(s).
     * @param {DropdownListItem|DropdownListItem[]} value - Dropdown active value(s).
     */
    handleChange: PropTypes.func,

    /**
     * Called on clicking the 'X' icon corresponding to an active value.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onCloseIconClick: PropTypes.func,

    /**
     * Called on key down on the 'X' icon corresponding to an active value.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onCloseIconKeyDown: PropTypes.func,

    /**
     * Called on container click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onContainerClick: PropTypes.func,

    /**
     * Called on input blur.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onInputBlur: PropTypes.func,

    /**
     * Called on input focus.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onInputFocus: PropTypes.func,

    /**
     * Called on input key down.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onInputKeyDown: PropTypes.func,

    /**
     * Called when clicking on an active value, on the text or avatar, if any.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onLabelClick: PropTypes.func,

    /**
     * Callback for change in dropdown search value.
     * @param {string} searchQuery - The new value in the search field.
     */
    handleSearchChange: PropTypes.func,

    /** A message to serve as placeholder. */
    placeholder: PropTypes.string,

    /** A dropdown can have a search field. */
    search: PropTypes.bool,

    /** The value in the edit text, if dropdown is a search. */
    searchQuery: PropTypes.string,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A dropdown can have a toggle button. */
    toggleButton: PropTypes.bool,

    /** The value of the dropdown. */
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
  }

  static autoControlledProps = ['searchQuery', 'value']

  state: DropdownState = {
    backspaceDelete: true,
    focused: false,
    searchQuery: '',
    value: this.props.multiple ? [] : null,
  }

  private removeFromActiveValues(item?: DropdownListItem): DropdownListItem {
    const { getA11yRemovedMessage } = this.props
    let value = this.state.value as DropdownListItem[]
    let poppedItem = item

    if (poppedItem) {
      value = value.filter(currentElement => currentElement !== item)
    } else {
      poppedItem = value.pop()
    }

    this.trySetState({
      value,
    })
    this.setState({
      message: getA11yRemovedMessage
        ? getA11yRemovedMessage(item)
        : `${poppedItem.header} has been removed.`,
    })

    _.invoke(this.props, 'handleChange', value)

    return poppedItem
  }

  public renderComponent({
    ElementType,
    classes,
    styles,
    variables,
    rest,
  }: RenderResultConfig<DropdownProps>) {
    const { search, multiple, toggleButton, getA11yStatusMessage, itemToString } = this.props
    const { searchQuery } = this.state
    const optionalDownshiftProps = {
      // in multiple dropdown, we hold active values in the array, and default active is null.
      ...(multiple && { selectedItem: null }),
      ...(getA11yStatusMessage && { getA11yStatusMessage }),
    }

    return (
      <ElementType {...rest} className={classes.root}>
        <Downshift
          onChange={this.handleChange}
          inputValue={searchQuery}
          stateReducer={this.stateReducer}
          itemToString={
            itemToString ? itemToString : (item: DropdownListItem) => (item ? item.header : '')
          }
          {...optionalDownshiftProps}
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
              <div
                className={classes.containerDiv}
                onClick={this.handleContainerClick.bind(this, isOpen)}
              >
                <span aria-live="assertive" className={classes.ariaLiveSpan}>
                  {this.state.message}
                </span>
                {multiple && this.renderActiveValues(styles)}
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
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    getRootProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
  ): JSX.Element {
    const { multiple, placeholder } = this.props
    const { searchQuery, value } = this.state

    return (
      <Input
        inputRef={input => (this.inputRef = input)}
        onFocus={this.handleInputFocus}
        onKeyUp={multiple && this.handleBackspaceDelete}
        styles={styles.editTextDiv}
        wrapper={{ ...getRootProps({ refKey: 'slotRef' }, { suppressRefError: true }) }}
        variables={{ inputFocusBorderColor: variables.editTextInputFocusBorderColor }}
        input={{
          type: 'text',
          styles: styles.editTextInput,
          placeholder:
            searchQuery.length > 0 || (multiple && (value as DropdownListItem[]).length > 0)
              ? ''
              : placeholder,
          ...getInputProps({
            onBlur: this.handleInputBlur,
            onKeyDown: this.handleInputKeyDown.bind(this, highlightedIndex, selectItemAtIndex),
          }),
        }}
      />
    )
  }

  private renderToggleButton(
    getToggleButtonProps: (options?: GetToggleButtonPropsOptions) => any,
    styles: ComponentSlotStylesInput,
    isOpen: boolean,
  ) {
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

  private renderList(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    getMenuProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getItemProps: (options: GetItemPropsOptions<DropdownListItem>) => any,
    isOpen: boolean,
    highlightedIndex: number,
  ) {
    return (
      <List
        {...getMenuProps({ refKey: 'listRef' })}
        styles={styles.list}
        aria-hidden={!isOpen}
        items={isOpen ? this.renderItems(variables, getItemProps, highlightedIndex) : []}
      />
    )
  }

  private renderItems(
    variables: ComponentVariablesInput,
    getItemProps: (options: GetItemPropsOptions<DropdownListItem>) => any,
    highlightedIndex: number,
  ) {
    const { items, noResultsMessage } = this.props
    if (items.length > 0) {
      return items.map((item, index) => {
        const optionalItemProps = {
          media: item.image && <Image src={item.image} avatar />,
          content: item.content,
        }
        return (
          <ListItem
            key={item.key}
            header={item.header}
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
        content: (
          <Text weight="bold" content={noResultsMessage || `We couldn't find any matches.`} />
        ),
        styles: {
          backgroundColor: variables.listItemBackgroundColor,
        },
      },
    ]
  }

  private renderActiveValues(styles: ComponentSlotStylesInput) {
    const value = this.state.value as DropdownListItem[]
    const { getA11yRemoveItemMessage } = this.props

    return value.length === 0
      ? null
      : value.map((item, index) => {
          const optionalImage = {
            ...(item.image && {
              image: { src: item.image, avatar: true, onClick: this.handleLabelClick },
            }),
          }
          return (
            <Label
              role="presentation"
              styles={styles.activeListLabel}
              circular
              key={`active-item-${index}`}
              content={<Text content={item.header} onClick={this.handleLabelClick} />}
              {...optionalImage}
              icon={{
                name: 'close',
                onClick: this.handleCloseIconClick.bind(this, item),
                onKeyDown: this.handleCloseIconKeyDown.bind(this, item),
                'aria-label': getA11yRemoveItemMessage
                  ? getA11yRemoveItemMessage(item)
                  : `Remove ${item.header} from selection.`,
                'aria-hidden': false,
                role: 'button',
              }}
            />
          )
        })
  }

  private stateReducer = (
    state: DownshiftState<DropdownListItem>,
    changes: StateChangeOptions<DropdownListItem>,
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        this.trySetState({
          searchQuery: changes.inputValue,
        })
        this.setState({
          backspaceDelete: !(state.inputValue.length > 0 && changes.inputValue.length === 0),
        })
        _.invoke(this.props, 'handleSearchChange', changes.inputValue)
        return changes
      default:
        return changes
    }
  }

  private handleInputFocus = (e: React.SyntheticEvent) => {
    this.setState({ focused: true })

    _.invoke(this.props, 'onInputFocus', e, this.props)
  }

  private handleInputBlur = (e: React.SyntheticEvent) => {
    this.setState({ focused: false })

    _.invoke(this.props, 'onInputBlur', e, this.props)
  }

  private handleContainerClick = (isOpen: boolean, e: React.SyntheticEvent) => {
    !isOpen && this.inputRef.focus()

    _.invoke(this.props, 'onContainerClick', e, { ...this.props, isOpen })
  }

  private handleBackspaceDelete = (e: React.SyntheticEvent) => {
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Backspace:
        const { searchQuery, value, backspaceDelete } = this.state

        if (searchQuery === '' && (value as DropdownListItem[]).length > 0) {
          if (!backspaceDelete) {
            this.setState({ backspaceDelete: true })
          } else {
            const removedValue = this.removeFromActiveValues()
            _.invoke(this.props, 'onBackspaceDelete', e, { ...this.props, removedValue })
          }
        }
      default:
        return
    }
  }

  private handleChange = (item: DropdownListItem) => {
    const { multiple, getA11ySelectedMessage } = this.props
    const newValue = multiple ? [...(this.state.value as DropdownListItem[]), item] : item

    this.trySetState({
      value: newValue,
      searchQuery: '',
    })
    this.setState({
      message: getA11ySelectedMessage
        ? getA11ySelectedMessage(item)
        : `${item.header} has been selected.`,
    })

    _.invoke(this.props, 'handleChange', newValue)
  }

  private handleCloseIconClick = (item: DropdownListItem, e: React.SyntheticEvent) => {
    this.handleCloseIconAction(item, e)

    _.invoke(this.props, 'onCloseIconClick', e, { ...this.props, item })
  }

  private handleLabelClick = (e: React.SyntheticEvent) => {
    e.stopPropagation()

    _.invoke(this.props, 'onLabelClick', e, this.props)
  }

  private handleCloseIconKeyDown = (item: DropdownListItem, e: React.SyntheticEvent) => {
    if (keyboardKey.getCode(event) === keyboardKey.Enter) {
      this.handleCloseIconAction(item, e)
    }
    _.invoke(this.props, 'onCloseIconKeyDown', e, { ...this.props, item })
  }

  private handleInputKeyDown = (
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    e: React.SyntheticEvent,
  ) => {
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Tab:
        if (highlightedIndex !== undefined) {
          selectItemAtIndex(highlightedIndex)
        }
      default:
        _.invoke(this.props, 'onInputKeyDown', e, {
          ...this.props,
          highlightedIndex,
          selectItemAtIndex,
        })
        return
    }
  }

  /**
   * Common function used by click and keydown handlers for label X icon.
   * Removes item from active values, focuses on edit text and stops event propagation.
   */
  private handleCloseIconAction(item: DropdownListItem, e: React.SyntheticEvent) {
    this.removeFromActiveValues(item)
    this.inputRef.focus()
    e.stopPropagation()
  }
}
