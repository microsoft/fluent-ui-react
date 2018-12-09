import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { Extendable, ShorthandValue, ComponentEventHandler } from '../../../types/utils'
import { ComponentSlotStylesInput, ComponentVariablesInput } from '../../themes/types'
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
import {
  AutoControlledComponent,
  RenderResultConfig,
  customPropTypes,
  commonPropTypes,
} from '../../lib'
import keyboardKey from 'keyboard-key'
import List from '../List/List'
import Text from '../Text/Text'
import Icon from '../Icon/Icon'
import Ref from '../Ref/Ref'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import DropdownItem, { DropdownItemProps } from './DropdownItem'
import DropdownLabel, { DropdownLabelProps } from './DropdownLabel'
import DropdownSearchInput from './DropdownSearchInput'
import { DropdownSearchInputProps } from 'semantic-ui-react'

// TODO: To be replaced when Downshift will add highlightedItem in their interface.
export interface DownshiftA11yStatusMessageOptions<Item> extends A11yStatusMessageOptions<Item> {
  highlightedItem: Item
}

export interface DropdownProps extends UIComponentProps<any, any> {
  /** The initial value for the search query, if the dropdown is also a search. */
  defaultSearchQuery?: string

  /** The initial value or value array, if the array has multiple selection. */
  defaultValue?: ShorthandValue | ShorthandValue[]

  /** A dropdown can take the width of its container. */
  fluid?: boolean

  /** Object with callbacks for creating announcements on multiple selection add and remove actions. */
  getA11ySelectionMessage?: {
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item added to selection.
     * @param {ShorthandValue} item - Dropdown added element.
     */
    onAdd?: (item: ShorthandValue) => string
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item removed from selection.
     * @param {ShorthandValue} item - Dropdown removed element.
     */
    onRemove?: (item: ShorthandValue) => string
  }

  /**
   * Callback that creates custom accessability message for dropdown status change. Involves changes in highlighted item in the list, selection, toggle status.
   * @param {DownshiftA11yStatusMessageOptions<ShorthandValue>} messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
   */
  getA11yStatusMessage?: (options: DownshiftA11yStatusMessageOptions<ShorthandValue>) => string

  /** Array of props for generating list options (Dropdown.Item[]) and selected item labels(Dropdown.Label[]), if it's a multiple selection. */
  items?: ShorthandValue[]

  /**
   * Function to be passed to create string from selected item, if it's a shorthand object. Used when dropdown also has a search function.
   */
  itemToString?: (item: ShorthandValue) => string

  /** A dropdown can perform a multiple selection. */
  multiple?: boolean

  /** A string to be displayed in the list when dropdown has no available items to show. */
  noResultsMessage?: string

  /**
   * Callback for change in dropdown search query value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {Object} data - All props and the new search query value in the edit text.
   */
  onSearchQueryChange?: ComponentEventHandler<DropdownProps>

  /**
   * Callback for change in dropdown active value(s).
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {Object} data - All props and the new active value(s).
   */
  onSelectedChange?: ComponentEventHandler<DropdownProps>

  /** A placeholder message for the input field. */
  placeholder?: string

  /** A dropdown can have a search field instead of trigger button. Can receive a custom search function that will replace the default equivalent. */
  search?: boolean | ((items: ShorthandValue[], searchQuery: string) => ShorthandValue[])

  /** Component for the search input query. */
  searchInput?: ShorthandValue

  /** Sets search query value (controlled mode). */
  searchQuery?: string

  /** Whether toggle button (that shows/hides items list) should be rendered. */
  toggleButton?: boolean

  /** Sets currently selected value(s) (controlled mode). */
  value?: ShorthandValue | ShorthandValue[]
}

export interface DropdownState {
  value: ShorthandValue | ShorthandValue[]
  backspaceDelete: boolean
  focused: boolean
  searchQuery?: string
}

/**
 * Dropdown allows user to select one or more values from a list of items.
 * Can also be created with search capability.
 */
export default class Dropdown extends AutoControlledComponent<
  Extendable<DropdownProps>,
  DropdownState
> {
  private inputNode: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    defaultSearchQuery: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
    fluid: PropTypes.bool,
    getA11ySelectionMessage: PropTypes.object,
    getA11yStatusMessage: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    itemToString: PropTypes.func,
    multiple: PropTypes.bool,
    noResultsMessage: PropTypes.string,
    onSearchQueryChange: PropTypes.func,
    onSelectedChange: PropTypes.func,
    placeholder: PropTypes.string,
    search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    searchQuery: PropTypes.string,
    searchInput: customPropTypes.itemShorthand,
    toggleButton: PropTypes.bool,
    value: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
  }

  static defaultProps = {
    as: 'div',
    itemToString: item => {
      if (!item || React.isValidElement(item)) {
        return ''
      }

      // targets DropdownItem shorthand objects
      if ((item as any).header) {
        return (item as any).header
      }

      return `${item}`
    },
  }

  static autoControlledProps = ['searchQuery', 'value']

  static Item = DropdownItem
  static Label = DropdownLabel
  static SearchInput = DropdownSearchInput

  state: DropdownState = {
    // prevent deletion of last character + last selected value at the same time on backspace.
    backspaceDelete: this.props.multiple,
    focused: false,
    searchQuery: this.props.search ? '' : undefined,
    value: this.props.multiple ? [] : null,
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

    return (
      <ElementType className={classes.root} {...rest}>
        <Downshift
          onChange={this.handleSelectedChange}
          inputValue={searchQuery}
          stateReducer={this.handleDownshiftStateChanges}
          itemToString={itemToString}
          // Downshift does not support multiple selection. We will handle everything and pass it selected as null in this case.
          selectedItem={multiple ? null : undefined}
          getA11yStatusMessage={getA11yStatusMessage}
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
                {multiple && this.renderSelectedItems(styles)}
                {search &&
                  this.renderSearchInput(
                    getRootProps,
                    getInputProps,
                    highlightedIndex,
                    selectItemAtIndex,
                  )}
                {toggleButton && this.renderToggleButton(getToggleButtonProps, styles, isOpen)}
                {this.renderItemsList(
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

  private renderSearchInput(
    getRootProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
  ): JSX.Element {
    const { searchInput, multiple, placeholder } = this.props
    const { searchQuery, value } = this.state

    const noPlaceholder =
      searchQuery.length > 0 || (multiple && (value as ShorthandValue[]).length > 0)

    return DropdownSearchInput.create(searchInput || {}, {
      defaultProps: {
        placeholder: noPlaceholder ? '' : placeholder,
        inputRef: (inputNode: HTMLElement) => {
          this.inputNode = inputNode
        },
      },
      overrideProps: (predefinedProps: DropdownSearchInputProps) =>
        this.handleSearchInputOverrides(
          predefinedProps,
          highlightedIndex,
          selectItemAtIndex,
          getRootProps,
          getInputProps,
        ),
    })
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

  private renderItemsList(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    getMenuProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
    isOpen: boolean,
    highlightedIndex: number,
  ) {
    const accessibilityMenuProps = getMenuProps({ refKey: 'innerRef' })
    const { innerRef, ...accessibilityMenuPropsRest } = accessibilityMenuProps

    return (
      <Ref innerRef={innerRef}>
        <List
          {...accessibilityMenuPropsRest}
          styles={styles.list}
          aria-hidden={!isOpen}
          items={isOpen ? this.renderItems(styles, variables, getItemProps, highlightedIndex) : []}
        />
      </Ref>
    )
  }

  private renderItems(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
    highlightedIndex: number,
  ) {
    const { items, noResultsMessage } = this.props
    const filteredItems = this.getItemsFilteredBySearchQuery(items)

    if (filteredItems.length > 0) {
      return filteredItems.map((item, index) => {
        let itemAsListItem = item
        if (typeof item === 'object') {
          itemAsListItem = _.pickBy(item, (value, key) =>
            _.includes(['key', ...DropdownItem.handledProps], key),
          )
        }
        return DropdownItem.create(itemAsListItem, {
          defaultProps: {
            active: highlightedIndex === index,
            variables,
            ...(typeof item === 'object' &&
              !item.hasOwnProperty('key') && {
                key: (item as any).header,
              }),
          },
          overrideProps: (predefinedProps: DropdownItemProps) =>
            this.handleItemOverrides(item, index, getItemProps),
        })
      })
    }
    // render no match message.
    return [
      noResultsMessage
        ? {
            key: 'dropdown-no-results',
            content: <Text weight="bold" content={noResultsMessage} />,
            styles: styles.emptyListItem,
          }
        : null,
    ]
  }

  private renderSelectedItems(styles: ComponentSlotStylesInput) {
    const value = this.state.value as ShorthandValue[]

    if (value.length === 0) {
      return null
    }

    return value.map(item =>
      DropdownLabel.create(item, {
        defaultProps: {
          styles: styles.label,
          ...(typeof item === 'object' &&
            !item.hasOwnProperty('key') && {
              key: (item as any).header,
            }),
        },
        overrideProps: (predefinedProps: DropdownLabelProps) =>
          this.handleSelectedItemOverrides(predefinedProps, item),
      }),
    )
  }

  private handleDownshiftStateChanges = (
    state: DownshiftState<ShorthandValue>,
    changes: StateChangeOptions<ShorthandValue>,
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        this.trySetState({
          searchQuery: changes.inputValue,
        })
        this.setState({
          backspaceDelete: !(state.inputValue.length > 0 && changes.inputValue.length === 0),
        })
        _.invoke(
          this.props,
          'onSearchQueryChange',
          {}, // we don't have event for it, but want to keep the event handling interface, event is empty.
          { ...this.props, searchQuery: changes.inputValue },
        )
        return changes
      default:
        return changes
    }
  }

  private getItemsFilteredBySearchQuery = (items: ShorthandValue[]): ShorthandValue[] => {
    const { itemToString, multiple, search } = this.props
    const { searchQuery, value } = this.state

    const nonSelectedItems = items.filter(
      item => (multiple ? (value as ShorthandValue[]).indexOf(item) === -1 : true),
    )

    const itemsMatchSearchQuery = nonSelectedItems.filter(
      item =>
        search
          ? _.isFunction(search)
            ? search(itemsMatchSearchQuery, searchQuery)
            : itemToString(item)
                .toLowerCase()
                .indexOf(searchQuery.toLowerCase()) !== -1
          : true,
    )

    return itemsMatchSearchQuery
  }

  private setA11yStatus = (statusMessage: string) => {
    const elementId = 'stardust-dropdown-a11y-status'
    let statusDiv = document.getElementById(elementId)

    if (!statusDiv) {
      statusDiv = document.createElement('div')
      statusDiv.setAttribute('id', elementId)
      statusDiv.setAttribute('role', 'status')
      statusDiv.setAttribute('aria-live', 'polite')
      statusDiv.setAttribute('aria-relevant', 'additions text')
      Object.assign(statusDiv.style, {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
      })
      document.body.appendChild(statusDiv)
    }

    statusDiv.textContent = statusMessage
  }

  private handleItemOverrides = (
    item: ShorthandValue,
    index: number,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
  ) => ({
    accessibilityItemProps: getItemProps({ item, index }),
  })

  private handleSelectedItemOverrides = (
    predefinedProps: DropdownLabelProps,
    item: ShorthandValue,
  ) => ({
    onRemove: (e: React.SyntheticEvent, dropdownLabelProps: DropdownLabelProps) => {
      this.handleSelectedItemRemove(e, item)
      _.invoke(predefinedProps, 'onRemove', e, dropdownLabelProps)
    },
    onClick: (e: React.SyntheticEvent, dropdownLabelProps: DropdownLabelProps) => {
      e.stopPropagation()
      _.invoke(predefinedProps, 'onClick', e, dropdownLabelProps)
    },
  })

  private handleSearchInputOverrides = (
    predefinedProps: DropdownSearchInputProps,
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    getRootProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
  ) => {
    const handleInputBlur = (
      e: React.SyntheticEvent,
      searchInputProps: DropdownSearchInputProps,
    ) => {
      this.setState({ focused: false })

      _.invoke(predefinedProps, 'onInputBlur', e, searchInputProps)
    }
    const handleInputKeyDown = (
      e: React.SyntheticEvent,
      searchInputProps: DropdownSearchInputProps,
    ) => {
      if (keyboardKey.getCode(e) === keyboardKey.Tab && highlightedIndex !== undefined) {
        selectItemAtIndex(highlightedIndex)
      }

      _.invoke(predefinedProps, 'onInputKeyDown', e, {
        ...searchInputProps,
        highlightedIndex,
        selectItemAtIndex,
      })
    }

    return {
      // getInputProps adds Downshift handlers. We also add our own by passing them as params to that function.
      // user handlers were also added to our handlers previously, at the beginning of this function.
      accessibilityInputProps: {
        ...getInputProps({
          onBlur: e => {
            handleInputBlur(e, predefinedProps)
          },
          onKeyDown: e => {
            handleInputKeyDown(e, predefinedProps)
          },
        }),
      },
      // same story as above for getRootProps.
      accessibilityWrapperProps: {
        ...getRootProps({ refKey: 'innerRef' }, { suppressRefError: true }),
      },
      onFocus: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        this.setState({ focused: true })

        _.invoke(predefinedProps, 'onFocus', e, searchInputProps)
      },
      ...(this.props.multiple && {
        onKeyUp: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
          if (keyboardKey.getCode(e) === keyboardKey.Backspace) {
            const { searchQuery, value, backspaceDelete } = this.state

            if (searchQuery === '' && (value as ShorthandValue[]).length > 0) {
              if (backspaceDelete) {
                this.removeItemFromValue()
              } else {
                this.setState({ backspaceDelete: true })
              }
            }
          }

          _.invoke(predefinedProps, 'onKeyUp', e, searchInputProps)
        },
      }),
      onInputBlur: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputBlur(e, searchInputProps)
      },
      onInputKeyDown: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputKeyDown(e, searchInputProps)
      },
    }
  }

  private handleContainerClick = (isOpen: boolean) => {
    !isOpen && this.inputNode.focus()
  }

  private handleSelectedChange = (item: ShorthandValue) => {
    const { multiple, getA11ySelectionMessage } = this.props
    const newValue = multiple ? [...(this.state.value as ShorthandValue[]), item] : item

    this.trySetState({
      value: newValue,
      searchQuery: '',
    })
    if (getA11ySelectionMessage && getA11ySelectionMessage.onAdd) {
      this.setA11yStatus(getA11ySelectionMessage.onAdd(item))
    }

    // we don't have event for it, but want to keep the event handling interface, event is empty.
    _.invoke(this.props, 'onSelectedChange', {}, { ...this.props, value: newValue })
  }

  private handleSelectedItemRemove(e: React.SyntheticEvent, item: ShorthandValue) {
    this.removeItemFromValue(item)
    this.inputNode.focus()
    e.stopPropagation()
  }

  private removeItemFromValue(item?: ShorthandValue) {
    const { getA11ySelectionMessage } = this.props
    let value = this.state.value as ShorthandValue[]
    let poppedItem = item

    if (poppedItem) {
      value = value.filter(currentElement => currentElement !== item)
    } else {
      poppedItem = value.pop()
    }

    this.trySetState({
      value,
    })
    if (getA11ySelectionMessage && getA11ySelectionMessage.onRemove) {
      this.setA11yStatus(getA11ySelectionMessage.onRemove(item))
    }

    // we don't have event for it, but want to keep the event handling interface, event is empty.
    _.invoke(this.props, 'onSelectedChange', {}, { ...this.props, value })
  }
}
