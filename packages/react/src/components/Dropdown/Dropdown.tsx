import { handleRef, Ref } from '@fluentui/react-component-ref'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import cx from 'classnames'
import * as keyboardKey from 'keyboard-key'

import {
  ShorthandRenderFunction,
  ShorthandValue,
  ComponentEventHandler,
  ShorthandCollection,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types'
import { ComponentSlotStylesInput, ComponentVariablesInput } from '../../themes/types'
import Downshift, {
  DownshiftState,
  StateChangeOptions,
  A11yStatusMessageOptions as DownshiftA11yStatusMessageOptions,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  GetInputPropsOptions,
  GetToggleButtonPropsOptions,
  GetItemPropsOptions,
} from 'downshift'
import {
  AutoControlledComponent,
  RenderResultConfig,
  commonPropTypes,
  UIComponentProps,
  isFromKeyboard,
} from '../../utils'
import List from '../List/List'
import DropdownItem, { DropdownItemProps } from './DropdownItem'
import DropdownSelectedItem, { DropdownSelectedItemProps } from './DropdownSelectedItem'
import DropdownSearchInput, { DropdownSearchInputProps } from './DropdownSearchInput'
import Button, { ButtonProps } from '../Button/Button'
import { screenReaderContainerStyles } from '../../utils/accessibility/Styles/accessibilityStyles'
import ListItem, { ListItemProps } from '../List/ListItem'
import Icon, { IconProps } from '../Icon/Icon'
import Portal from '../Portal/Portal'
import { ALIGNMENTS, POSITIONS, Popper, PositioningProps } from '../../utils/positioner'

export interface DropdownSlotClassNames {
  clearIndicator: string
  container: string
  toggleIndicator: string
  item: string
  itemsList: string
  searchInput: string
  selectedItem: string
  selectedItems: string
  triggerButton: string
}

export interface DropdownProps
  extends UIComponentProps<DropdownProps, DropdownState>,
    PositioningProps {
  /** The index of the currently selected item, if the dropdown supports multiple selection. */
  activeSelectedIndex?: number

  /** A dropdown item can show a check indicator if it is selected. */
  checkable?: boolean

  /** A slot for a selected indicator in the dropdown list. */
  checkableIndicator?: ShorthandValue<IconProps>

  /** A dropdown can be clearable to let users remove their selection. */
  clearable?: boolean

  /** A slot for the clearing indicator. */
  clearIndicator?: ShorthandValue<IconProps>

  /** The initial value for the index of the currently selected item in a multiple selection. */
  defaultActiveSelectedIndex?: number

  /** The initial value for 'open' in uncontrolled mode. */
  defaultOpen?: boolean

  /** The initial list item index to highlight. */
  defaultHighlightedIndex?: number

  /** The initial value for the search query if the dropdown has `search` enabled. */
  defaultSearchQuery?: string

  /** The initial value (or value array if the array has multiple selection). */
  defaultValue?: ShorthandValue<DropdownItemProps> | ShorthandCollection<DropdownItemProps>

  /** A dropdown can fill the width of its container. */
  fluid?: boolean

  /** Object with callbacks for generating announcements for item selection and removal. */
  getA11ySelectionMessage?: {
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item added to selection.
     * @param item - Dropdown added element.
     */
    onAdd?: (item: ShorthandValue<DropdownItemProps>) => string
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item removed from selection.
     * @param item - Dropdown removed element.
     */
    onRemove?: (item: ShorthandValue<DropdownItemProps>) => string
  }

  /**
   * Callback that provides status announcement message with number of items in the list, using Arrow Up/Down keys to navigate through them and, if multiple, using Arrow Left/Right to navigate through selected items.
   * @param messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
   */
  getA11yStatusMessage?: (
    options: DownshiftA11yStatusMessageOptions<ShorthandValue<DropdownItemProps>>,
  ) => string

  /** A dropdown can highlight the first option when it opens. */
  highlightFirstItemOnOpen?: boolean

  /** The index of the list item to highlight. */
  highlightedIndex?: number

  /** A dropdown can be formatted to appear inline next to other elements. */
  inline?: boolean

  /** Array of props for generating list options (Dropdown.Item[]) and selected item labels (Dropdown.SelectedItem[]), if it's a multiple selection. */
  items?: ShorthandCollection<DropdownItemProps>

  /**
   * A function that converts an item to string. Used when dropdown has `search` enabled.
   * By default, it:
   * - returns the `header` property if it exists on an item
   * - stringifies the item if it is a primitive type
   */
  itemToString?: (item: ShorthandValue<DropdownItemProps>) => string

  /** Used when comparing two items in multiple selection. Default comparison is by the header prop. */
  itemToValue?: (item: ShorthandValue<DropdownItemProps>) => any

  /** A dropdown can show that it is currently loading data. */
  loading?: boolean

  /** A message to be displayed in the list when the dropdown is loading. */
  loadingMessage?: ShorthandValue<ListItemProps>

  /** When selecting an element with Tab, focus stays on the dropdown by default. If true, the focus will jump to next/previous element in DOM. Only available to multiple selection dropdowns. */
  moveFocusOnTab?: boolean

  /** A dropdown can allow a user to select multiple items. */
  multiple?: boolean

  /** A message to be displayed in the list when the dropdown has no items. */
  noResultsMessage?: ShorthandValue<ListItemProps>

  /**
   * Called when the dropdown opens or closes.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `open` reflecting the new open state.
   */
  onOpenChange?: ComponentEventHandler<DropdownProps>

  /**
   * Called when the dropdown's search query changes.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `searchQuery` reflecting its new value.
   */
  onSearchQueryChange?: ComponentEventHandler<DropdownProps>

  /**
   * Called when the dropdown's selected item(s) change.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and the new selected value(s).
   */
  onSelectedChange?: ComponentEventHandler<DropdownProps>

  /** A dropdown's open state can be controlled. */
  open?: boolean

  /** A placeholder message for the input field. */
  placeholder?: string

  /**
   * A render function to customize how items are rendered in the dropdown.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItem?: ShorthandRenderFunction<DropdownItemProps>

  /**
   * A custom render function for the selected item. Only applicable with the `multiple` prop.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderSelectedItem?: ShorthandRenderFunction<DropdownSelectedItemProps>

  /** A dropdown can have a search field instead of trigger button. Can receive a custom search function that will replace the default equivalent. */
  search?:
    | boolean
    | ((
        items: ShorthandCollection<DropdownItemProps>,
        searchQuery: string,
      ) => ShorthandCollection<DropdownItemProps>)

  /** A search dropdown's input can be customized. */
  searchInput?: ShorthandValue<DropdownSearchInputProps>

  /** Sets search query value (controlled mode). */
  searchQuery?: string

  /** Controls the appearance of the indicator that shows/hides the list of items. */
  toggleIndicator?: ShorthandValue<IconProps>

  /** Controls the appearance of the trigger button if it's a selection dropdown (not a search). */
  triggerButton?: ShorthandValue<ButtonProps>

  /** Sets the dropdown's currently selected value(s) in controlled mode. */
  value?: ShorthandValue<DropdownItemProps> | ShorthandCollection<DropdownItemProps>
}

export interface DropdownState {
  a11ySelectionStatus: string
  activeSelectedIndex: number
  filteredItems: ShorthandCollection<DropdownItemProps>
  filteredItemStrings: string[]
  focused: boolean
  startingString: string
  open: boolean
  searchQuery: string
  highlightedIndex: number
  value: ShorthandCollection<DropdownItemProps>
  itemIsFromKeyboard: boolean
  isFromKeyboard: boolean
}

class Dropdown extends AutoControlledComponent<WithAsProp<DropdownProps>, DropdownState> {
  buttonRef = React.createRef<HTMLElement>()
  inputRef = React.createRef<HTMLInputElement>()
  listRef = React.createRef<HTMLElement>()
  selectedItemsRef = React.createRef<HTMLDivElement>()
  containerRef = React.createRef<HTMLDivElement>()

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static a11yStatusCleanupTime = 500
  static charKeyPressedCleanupTime = 500

  static slotClassNames: DropdownSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      children: false,
      content: false,
    }),
    activeSelectedIndex: PropTypes.number,
    align: PropTypes.oneOf(ALIGNMENTS),
    checkable: PropTypes.bool,
    checkableIndicator: customPropTypes.itemShorthandWithoutJSX,
    clearable: PropTypes.bool,
    clearIndicator: customPropTypes.itemShorthand,
    defaultActiveSelectedIndex: PropTypes.number,
    defaultOpen: PropTypes.bool,
    defaultHighlightedIndex: PropTypes.number,
    defaultSearchQuery: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
    fluid: PropTypes.bool,
    getA11ySelectionMessage: PropTypes.object,
    getA11yStatusMessage: PropTypes.func,
    highlightFirstItemOnOpen: PropTypes.bool,
    highlightedIndex: PropTypes.number,
    inline: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    itemToString: PropTypes.func,
    itemToValue: PropTypes.func,
    loading: PropTypes.bool,
    loadingMessage: customPropTypes.itemShorthand,
    moveFocusOnTab: PropTypes.bool,
    multiple: PropTypes.bool,
    noResultsMessage: customPropTypes.itemShorthand,
    offset: PropTypes.string,
    onOpenChange: PropTypes.func,
    onSearchQueryChange: PropTypes.func,
    onSelectedChange: PropTypes.func,
    open: PropTypes.bool,
    placeholder: PropTypes.string,
    position: PropTypes.oneOf(POSITIONS),
    renderItem: PropTypes.func,
    renderSelectedItem: PropTypes.func,
    search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    searchQuery: PropTypes.string,
    searchInput: customPropTypes.itemShorthand,
    toggleIndicator: customPropTypes.itemShorthandWithoutJSX,
    triggerButton: customPropTypes.itemShorthand,
    unstable_pinned: PropTypes.bool,
    value: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
  }

  static defaultProps = {
    align: 'start',
    as: 'div',
    checkableIndicator: 'icon-checkmark',
    clearIndicator: 'icon-close',
    itemToString: item => {
      if (!item || React.isValidElement(item)) {
        return ''
      }

      // targets DropdownItem shorthand objects
      return (item as any).header || String(item)
    },
    itemToValue: item => {
      if (!item || React.isValidElement(item)) {
        return ''
      }

      // targets DropdownItem shorthand objects
      return (item as any).header || String(item)
    },
    position: 'below',
    toggleIndicator: {},
    triggerButton: {},
  }

  static autoControlledProps = [
    'activeSelectedIndex',
    'highlightedIndex',
    'open',
    'searchQuery',
    'value',
  ]

  static Item = DropdownItem
  static SearchInput = DropdownSearchInput
  static SelectedItem = DropdownSelectedItem

  componentWillUnmount() {
    this.clearStartingString.cancel()
    this.clearA11ySelectionMessage.cancel()
  }

  getInitialAutoControlledState({ multiple, search }: DropdownProps): DropdownState {
    return {
      a11ySelectionStatus: '',
      activeSelectedIndex: multiple ? null : undefined,
      filteredItems: undefined,
      filteredItemStrings: undefined,
      focused: false,
      startingString: search ? undefined : '',
      open: false,
      highlightedIndex: this.props.highlightFirstItemOnOpen ? 0 : null,
      searchQuery: search ? '' : undefined,
      value: [],
      itemIsFromKeyboard: false,
      isFromKeyboard: false,
    }
  }

  defaultTriggerButtonId = _.uniqueId('dropdown-trigger-button-')

  /**
   * Used to compute the filtered items (by value and search query) and, if needed,
   * their string equivalents, in order to be used throughout the component.
   */
  static getAutoControlledStateFromProps(props: DropdownProps, state: DropdownState) {
    const { items, itemToString, itemToValue, multiple, search } = props
    const { searchQuery, value: rawValue } = state

    // `normalizedValue` should be normilized always as it can be received from props
    const normalizedValue = _.isArray(rawValue) ? rawValue : [rawValue]
    const value = multiple ? normalizedValue : normalizedValue.slice(0, 1)

    const filteredItemsByValue = multiple ? _.differenceBy(items, value, itemToValue) : items
    const filteredItemStrings = _.map(filteredItemsByValue, filteredItem =>
      itemToString(filteredItem).toLowerCase(),
    )

    const modifiedState: Partial<DropdownState> = {
      filteredItems: filteredItemsByValue,
      filteredItemStrings,
      value,
    }

    if (search) {
      if (_.isFunction(search)) {
        modifiedState.filteredItems = search(filteredItemsByValue, searchQuery)
      } else {
        modifiedState.filteredItems = filteredItemsByValue.filter(
          item =>
            itemToString(item)
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) !== -1,
        )
      }
    }

    return modifiedState
  }

  renderComponent({
    ElementType,
    classes,
    styles,
    variables,
    unhandledProps,
    rtl,
  }: RenderResultConfig<DropdownProps>) {
    const {
      clearable,
      clearIndicator,
      search,
      multiple,
      getA11yStatusMessage,
      itemToString,
      toggleIndicator,
    } = this.props
    const { highlightedIndex, open, searchQuery, value } = this.state

    return (
      <ElementType className={classes.root} {...unhandledProps}>
        <Downshift
          isOpen={open}
          onChange={this.handleSelectedChange}
          onInputValueChange={this.handleSearchQueryChange}
          inputValue={search ? searchQuery : null}
          stateReducer={this.handleDownshiftStateChanges}
          itemToString={itemToString}
          selectedItem={null}
          getA11yStatusMessage={getA11yStatusMessage}
          highlightedIndex={highlightedIndex}
          onStateChange={this.handleStateChange}
          labelId={this.props['aria-labelledby']}
          environment={this.context.target.defaultView}
          inputId={
            this.props.searchInput && this.props.searchInput['id']
              ? this.props.searchInput['id']
              : undefined
          }
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            getRootProps,
            getToggleButtonProps,
            toggleMenu,
            highlightedIndex,
            selectItemAtIndex,
          }) => {
            const { innerRef, ...accessibilityRootPropsRest } = getRootProps(
              { refKey: 'innerRef' },
              { suppressRefError: true },
            )
            const showClearIndicator = clearable && value.length > 0

            return (
              <Ref innerRef={innerRef}>
                <div
                  ref={this.containerRef}
                  className={cx(Dropdown.slotClassNames.container, classes.container)}
                  onClick={search && !open ? this.handleContainerClick : undefined}
                >
                  <div
                    ref={this.selectedItemsRef}
                    className={cx(Dropdown.slotClassNames.selectedItems, classes.selectedItems)}
                  >
                    {multiple && this.renderSelectedItems(variables, rtl)}
                    {search
                      ? this.renderSearchInput(
                          accessibilityRootPropsRest,
                          rtl,
                          highlightedIndex,
                          getInputProps,
                          selectItemAtIndex,
                          toggleMenu,
                          variables,
                        )
                      : this.renderTriggerButton(styles, rtl, getToggleButtonProps)}
                  </div>
                  {showClearIndicator
                    ? Icon.create(clearIndicator, {
                        defaultProps: () => ({
                          className: Dropdown.slotClassNames.clearIndicator,
                          styles: styles.clearIndicator,
                          xSpacing: 'none',
                        }),
                        overrideProps: (predefinedProps: IconProps) => ({
                          onClick: (e: React.SyntheticEvent<HTMLElement>, iconProps: IconProps) => {
                            _.invoke(predefinedProps, 'onClick', e, iconProps)
                            this.handleClear(e)
                          },
                        }),
                      })
                    : Icon.create(toggleIndicator, {
                        defaultProps: () => ({
                          className: Dropdown.slotClassNames.toggleIndicator,
                          name: 'chevron-down',
                          styles: styles.toggleIndicator,
                          outline: true,
                          size: 'small',
                        }),
                        overrideProps: (predefinedProps: IconProps) => ({
                          onClick: (e, indicatorProps: IconProps) => {
                            _.invoke(predefinedProps, 'onClick', e, indicatorProps)
                            getToggleButtonProps().onClick(e)
                          },
                        }),
                      })}
                  {this.renderItemsList(
                    styles,
                    variables,
                    highlightedIndex,
                    toggleMenu,
                    selectItemAtIndex,
                    getMenuProps,
                    getItemProps,
                    getInputProps,
                    rtl,
                  )}
                </div>
              </Ref>
            )
          }}
        </Downshift>
        <Portal open={!!this.props.getA11ySelectionMessage}>
          <div
            role="status"
            aria-live="polite"
            aria-relevant="additions text"
            style={screenReaderContainerStyles}
          >
            {this.state.a11ySelectionStatus}
          </div>
        </Portal>
      </ElementType>
    )
  }

  renderTriggerButton(
    styles: ComponentSlotStylesInput,
    rtl: boolean,
    getToggleButtonProps: (options?: GetToggleButtonPropsOptions) => any,
  ): JSX.Element {
    const { triggerButton } = this.props
    const { value } = this.state

    const content = this.getSelectedItemAsString(value[0])
    const triggerButtonId = triggerButton['id'] || this.defaultTriggerButtonId

    const triggerButtonProps = getToggleButtonProps({
      onFocus: this.handleTriggerButtonOrListFocus,
      onBlur: this.handleTriggerButtonBlur,
      onKeyDown: e => {
        this.handleTriggerButtonKeyDown(e, rtl)
      },
      'aria-label': undefined,
      'aria-labelledby': [this.props['aria-labelledby'], triggerButtonId]
        .filter(l => !!l)
        .join(' '),
    })

    const { onClick, onFocus, onBlur, onKeyDown, ...restTriggerButtonProps } = triggerButtonProps

    return (
      <Ref innerRef={this.buttonRef}>
        {Button.create(triggerButton, {
          defaultProps: () => ({
            className: Dropdown.slotClassNames.triggerButton,
            content,
            id: triggerButtonId,
            fluid: true,
            styles: styles.triggerButton,
            ...restTriggerButtonProps,
          }),
          overrideProps: (predefinedProps: IconProps) => ({
            onClick: e => {
              onClick(e)
              _.invoke(predefinedProps, 'onClick', e, predefinedProps)
            },
            onFocus: e => {
              onFocus(e)
              _.invoke(predefinedProps, 'onFocus', e, predefinedProps)
            },
            onBlur: e => {
              onBlur(e)
              _.invoke(predefinedProps, 'onBlur', e, predefinedProps)
            },
            onKeyDown: e => {
              onKeyDown(e)
              _.invoke(predefinedProps, 'onKeyDown', e, predefinedProps)
            },
          }),
        })}
      </Ref>
    )
  }

  renderSearchInput(
    accessibilityComboboxProps: Object,
    rtl: boolean,
    highlightedIndex: number,
    getInputProps: (options?: GetInputPropsOptions) => any,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    toggleMenu: () => void,
    variables,
  ): JSX.Element {
    const { inline, searchInput, multiple, placeholder } = this.props
    const { searchQuery, value } = this.state

    const noPlaceholder = searchQuery.length > 0 || (multiple && value.length > 0)

    return DropdownSearchInput.create(searchInput || {}, {
      defaultProps: () => ({
        className: Dropdown.slotClassNames.searchInput,
        placeholder: noPlaceholder ? '' : placeholder,
        inline,
        variables,
        inputRef: this.inputRef,
      }),
      overrideProps: this.handleSearchInputOverrides(
        highlightedIndex,
        rtl,
        selectItemAtIndex,
        toggleMenu,
        accessibilityComboboxProps,
        getInputProps,
      ),
    })
  }

  renderItemsList(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    highlightedIndex: number,
    toggleMenu: () => void,
    selectItemAtIndex: (index: number) => void,
    getMenuProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue<DropdownItemProps>>) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
    rtl: boolean,
  ) {
    const { align, offset, position, search, unstable_pinned } = this.props
    const { open } = this.state
    const items = open ? this.renderItems(styles, variables, getItemProps, highlightedIndex) : []
    const { innerRef, ...accessibilityMenuProps } = getMenuProps(
      { refKey: 'innerRef' },
      { suppressRefError: true },
    )

    // If it's just a selection, some attributes and listeners from Downshift input need to go on the menu list.
    if (!search) {
      const accessibilityInputProps = getInputProps()

      accessibilityMenuProps['aria-activedescendant'] =
        accessibilityInputProps['aria-activedescendant']
      accessibilityMenuProps['onKeyDown'] = e => {
        this.handleListKeyDown(
          e,
          highlightedIndex,
          accessibilityInputProps['onKeyDown'],
          toggleMenu,
          selectItemAtIndex,
        )
      }
    }

    return (
      <Ref
        innerRef={(listElement: HTMLElement) => {
          handleRef(this.listRef, listElement)
          handleRef(innerRef, listElement)
        }}
      >
        <Popper
          align={align}
          position={position}
          offset={offset}
          rtl={rtl}
          enabled={open}
          targetRef={this.containerRef}
          unstable_pinned={unstable_pinned}
          positioningDependencies={[items.length]}
        >
          <List
            className={Dropdown.slotClassNames.itemsList}
            {...accessibilityMenuProps}
            styles={styles.list}
            tabIndex={search ? undefined : -1} // needs to be focused when trigger button is activated.
            aria-hidden={!open}
            onFocus={this.handleTriggerButtonOrListFocus}
            onBlur={this.handleListBlur}
            items={items}
          />
        </Popper>
      </Ref>
    )
  }

  renderItems(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue<DropdownItemProps>>) => any,
    highlightedIndex: number,
  ) {
    const {
      loading,
      loadingMessage,
      noResultsMessage,
      renderItem,
      checkable,
      checkableIndicator,
    } = this.props
    const { filteredItems, value } = this.state

    const items = _.map(filteredItems, (item, index) => ({
      children: () => {
        const selected = value.indexOf(item) !== -1

        return DropdownItem.create(item, {
          defaultProps: () => ({
            className: Dropdown.slotClassNames.item,
            active: highlightedIndex === index,
            selected,
            checkable,
            checkableIndicator,
            isFromKeyboard: this.state.itemIsFromKeyboard,
            variables,
            ...(typeof item === 'object' &&
              !item.hasOwnProperty('key') && {
                key: (item as any).header,
              }),
          }),
          overrideProps: this.handleItemOverrides(item, index, getItemProps, selected),
          render: renderItem,
        })
      },
    }))

    return [
      ...items,
      loading &&
        ListItem.create(loadingMessage, {
          defaultProps: () => ({
            key: 'loading-message',
            styles: styles.loadingMessage,
          }),
        }),
      !loading &&
        items.length === 0 &&
        ListItem.create(noResultsMessage, {
          defaultProps: () => ({
            key: 'no-results-message',
            styles: styles.noResultsMessage,
          }),
        }),
    ]
  }

  renderSelectedItems(variables, rtl: boolean) {
    const { renderSelectedItem } = this.props
    const { value } = this.state

    if (value.length === 0) {
      return null
    }

    return value.map((item: DropdownItemProps, index) =>
      // (!) an item matches DropdownItemProps
      DropdownSelectedItem.create(item, {
        defaultProps: () => ({
          className: Dropdown.slotClassNames.selectedItem,
          active: this.isSelectedItemActive(index),
          variables,
          ...(typeof item === 'object' &&
            !item.hasOwnProperty('key') && {
              key: (item as any).header,
            }),
        }),
        overrideProps: this.handleSelectedItemOverrides(item, rtl),
        render: renderSelectedItem,
      }),
    )
  }

  handleSearchQueryChange = (searchQuery: string) => {
    this.setStateAndInvokeHandler('onSearchQueryChange', null, {
      searchQuery,
      highlightedIndex: this.props.highlightFirstItemOnOpen ? 0 : null,
      open: searchQuery === '' ? false : this.state.open,
    })
  }

  handleDownshiftStateChanges = (
    state: DownshiftState<ShorthandValue<DropdownItemProps>>,
    changes: StateChangeOptions<ShorthandValue<DropdownItemProps>>,
  ) => {
    const activeElement: Element = this.context.target.activeElement

    switch (changes.type) {
      case Downshift.stateChangeTypes.blurButton:
        // Downshift closes the list by default on trigger blur. It does not support the case when dropdown is
        // single selection and focuses list on trigger click/up/down/space/enter. Treating that here.
        if (state.isOpen && activeElement === this.listRef.current) {
          return {} // won't change state in this case.
        }
      default:
        return changes
    }
  }

  handleStateChange = (changes: StateChangeOptions<ShorthandValue<DropdownItemProps>>) => {
    if (changes.isOpen !== undefined && changes.isOpen !== this.state.open) {
      const newState = { open: changes.isOpen, highlightedIndex: this.state.highlightedIndex }

      if (changes.isOpen) {
        const highlightedIndexOnArrowKeyOpen = this.getHighlightedIndexOnArrowKeyOpen(changes)
        if (_.isNumber(highlightedIndexOnArrowKeyOpen)) {
          newState.highlightedIndex = highlightedIndexOnArrowKeyOpen
        }
        if (!this.props.search) {
          this.listRef.current.focus()
        }
      } else {
        newState.highlightedIndex = null
      }

      this.setStateAndInvokeHandler('onOpenChange', null, newState)
    }

    if (this.state.open && _.isNumber(changes.highlightedIndex)) {
      const itemIsFromKeyboard = changes.type !== Downshift.stateChangeTypes.itemMouseEnter
      this.setState({ itemIsFromKeyboard, highlightedIndex: changes.highlightedIndex })
    }
  }

  isSelectedItemActive = (index: number): boolean => {
    return index === this.state.activeSelectedIndex
  }

  handleItemOverrides = (
    item: ShorthandValue<DropdownItemProps>,
    index: number,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue<DropdownItemProps>>) => any,
    selected: boolean,
  ) => (predefinedProps: DropdownItemProps) => ({
    accessibilityItemProps: {
      ...getItemProps({
        item,
        index,
        onClick: e => {
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()
          _.invoke(predefinedProps, 'onClick', e, predefinedProps)
        },
      }),
      // for single selection the selected item should have aria-selected, instead of the highlighted
      ...(!this.props.multiple && {
        'aria-selected': selected,
      }),
    },
  })

  handleSelectedItemOverrides = (item: ShorthandValue<DropdownItemProps>, rtl: boolean) => (
    predefinedProps: DropdownSelectedItemProps,
  ) => ({
    onRemove: (e: React.SyntheticEvent, dropdownSelectedItemProps: DropdownSelectedItemProps) => {
      this.handleSelectedItemRemove(e, item, predefinedProps, dropdownSelectedItemProps)
    },
    onClick: (e: React.SyntheticEvent, dropdownSelectedItemProps: DropdownSelectedItemProps) => {
      this.setState({ activeSelectedIndex: this.state.value.indexOf(item) })

      e.stopPropagation()
      _.invoke(predefinedProps, 'onClick', e, dropdownSelectedItemProps)
    },
    onKeyDown: (e: React.SyntheticEvent, dropdownSelectedItemProps: DropdownSelectedItemProps) => {
      this.handleSelectedItemKeyDown(e, item, predefinedProps, dropdownSelectedItemProps, rtl)
    },
  })

  handleSearchInputOverrides = (
    highlightedIndex: number,
    rtl: boolean,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    toggleMenu: () => void,
    accessibilityComboboxProps: Object,
    getInputProps: (options?: GetInputPropsOptions) => any,
  ) => (predefinedProps: DropdownSearchInputProps) => {
    const handleInputBlur = (
      e: React.SyntheticEvent,
      searchInputProps: DropdownSearchInputProps,
    ) => {
      this.setState({ focused: false, isFromKeyboard: isFromKeyboard() })
      e.nativeEvent['preventDownshiftDefault'] = true
      _.invoke(predefinedProps, 'onInputBlur', e, searchInputProps)
    }

    const handleInputKeyDown = (
      e: React.SyntheticEvent,
      searchInputProps: DropdownSearchInputProps,
    ) => {
      switch (keyboardKey.getCode(e)) {
        case keyboardKey.Tab:
          this.handleTabSelection(e, highlightedIndex, selectItemAtIndex, toggleMenu)
          break
        case keyboardKey.ArrowLeft:
          if (!rtl) {
            this.trySetLastSelectedItemAsActive()
          }
          break
        case keyboardKey.ArrowRight:
          if (rtl) {
            this.trySetLastSelectedItemAsActive()
          }
          break
        case keyboardKey.Backspace:
          this.tryRemoveItemFromValue()
          break
        default:
          break
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
      accessibilityComboboxProps,
      onFocus: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        this.setState({ focused: true, isFromKeyboard: isFromKeyboard() })

        _.invoke(predefinedProps, 'onFocus', e, searchInputProps)
      },
      onInputBlur: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputBlur(e, searchInputProps)
      },
      onInputKeyDown: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputKeyDown(e, searchInputProps)
      },
    }
  }

  /**
   * Custom Tab selection logic, at least until Downshift will implement selection on blur.
   * Also keeps focus on multiple selection dropdown when selecting by Tab.
   */
  handleTabSelection = (
    e: React.SyntheticEvent,
    highlightedIndex: number,
    selectItemAtIndex: (highlightedIndex: number) => void,
    toggleMenu: () => void,
  ): void => {
    if (this.state.open) {
      if (!_.isNil(highlightedIndex) && this.state.filteredItems.length) {
        selectItemAtIndex(highlightedIndex)
        if (!this.props.moveFocusOnTab && this.props.multiple) {
          e.preventDefault()
        }
      } else {
        toggleMenu()
      }
    }
  }

  trySetLastSelectedItemAsActive = () => {
    const { multiple } = this.props
    const { value } = this.state

    if (!multiple || (this.inputRef.current && this.inputRef.current.selectionStart !== 0)) {
      return
    }

    if (value.length > 0) {
      // If last element was already active, perform a 'reset' of activeSelectedIndex.
      if (this.state.activeSelectedIndex === value.length - 1) {
        this.setState({ activeSelectedIndex: null }, () => {
          this.setState({ activeSelectedIndex: value.length - 1 })
        })
      } else {
        this.setState({ activeSelectedIndex: value.length - 1 })
      }
    }
  }

  tryRemoveItemFromValue = () => {
    const { multiple } = this.props
    const { searchQuery, value } = this.state

    if (
      multiple &&
      (searchQuery === '' || this.inputRef.current.selectionStart === 0) &&
      value.length > 0
    ) {
      this.removeItemFromValue()
    }
  }

  handleClear = (e: React.SyntheticEvent<HTMLElement>) => {
    const {
      activeSelectedIndex,
      highlightedIndex,
      open,
      searchQuery,
      value,
    } = this.getInitialAutoControlledState(this.props)

    this.setStateAndInvokeHandler('onSelectedChange', e, {
      activeSelectedIndex,
      highlightedIndex,
      open,
      searchQuery,
      value,
    })
    this.setState({ activeSelectedIndex, highlightedIndex, open, searchQuery, value })

    this.tryFocusSearchInput()
    this.tryFocusTriggerButton()
  }

  handleContainerClick = () => {
    this.tryFocusSearchInput()
  }

  handleTriggerButtonKeyDown = (e: React.SyntheticEvent, rtl: boolean) => {
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.ArrowLeft:
        if (!rtl) {
          this.trySetLastSelectedItemAsActive()
        }
        return
      case keyboardKey.ArrowRight:
        if (rtl) {
          this.trySetLastSelectedItemAsActive()
        }
        return
      default:
        return
    }
  }

  handleListKeyDown = (
    e: React.SyntheticEvent,
    highlightedIndex: number,
    accessibilityInputPropsKeyDown: (e) => any,
    toggleMenu: () => void,
    selectItemAtIndex: (index: number) => void,
  ) => {
    const keyCode = keyboardKey.getCode(e)
    switch (keyCode) {
      case keyboardKey.Tab:
        this.handleTabSelection(e, highlightedIndex, selectItemAtIndex, toggleMenu)
        return
      case keyboardKey.Escape:
        accessibilityInputPropsKeyDown(e)
        this.tryFocusTriggerButton()
        e.stopPropagation()
        return
      default:
        const keyString = String.fromCharCode(keyCode)
        if (/[a-zA-Z0-9]/.test(keyString)) {
          this.setHighlightedIndexOnCharKeyDown(keyString)
        }
        accessibilityInputPropsKeyDown(e)
        return
    }
  }

  handleSelectedChange = (item: ShorthandValue<DropdownItemProps>) => {
    const { items, multiple, getA11ySelectionMessage } = this.props
    const { value } = this.state

    this.setStateAndInvokeHandler('onSelectedChange', null, {
      searchQuery: this.getSelectedItemAsString(item),
      value: multiple ? [...value, item] : [item],
    })

    if (!multiple) {
      this.setState({ highlightedIndex: items.indexOf(item) })
    }

    if (getA11ySelectionMessage && getA11ySelectionMessage.onAdd) {
      this.setA11ySelectionMessage(getA11ySelectionMessage.onAdd(item))
    }

    if (multiple) {
      setTimeout(
        () =>
          (this.selectedItemsRef.current.scrollTop = this.selectedItemsRef.current.scrollHeight),
        0,
      )
    }

    this.tryFocusTriggerButton()
  }

  handleSelectedItemKeyDown(
    e: React.SyntheticEvent,
    item: ShorthandValue<DropdownItemProps>,
    predefinedProps: DropdownSelectedItemProps,
    dropdownSelectedItemProps: DropdownSelectedItemProps,
    rtl: boolean,
  ) {
    const { activeSelectedIndex, value } = this.state

    const previousKey = rtl ? keyboardKey.ArrowRight : keyboardKey.ArrowLeft
    const nextKey = rtl ? keyboardKey.ArrowLeft : keyboardKey.ArrowRight

    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Delete:
      case keyboardKey.Backspace:
        this.handleSelectedItemRemove(e, item, predefinedProps, dropdownSelectedItemProps)
        break
      case previousKey:
        if (value.length > 0 && !_.isNil(activeSelectedIndex) && activeSelectedIndex > 0) {
          this.setState({ activeSelectedIndex: activeSelectedIndex - 1 })
        }
        break
      case nextKey:
        if (value.length > 0 && !_.isNil(activeSelectedIndex)) {
          if (activeSelectedIndex < value.length - 1) {
            this.setState({ activeSelectedIndex: activeSelectedIndex + 1 })
          } else {
            this.setState({ activeSelectedIndex: null })
            if (this.props.search) {
              e.preventDefault() // prevents caret to forward one position in input.
              this.inputRef.current.focus()
            } else {
              this.buttonRef.current.focus()
            }
          }
        }
        break
      default:
        break
    }
    _.invoke(predefinedProps, 'onKeyDown', e, dropdownSelectedItemProps)
  }

  handleTriggerButtonOrListFocus = () => {
    this.setState({ focused: true, isFromKeyboard: isFromKeyboard() })
  }

  handleTriggerButtonBlur = e => {
    if (this.listRef.current !== e.relatedTarget) {
      this.setState({ focused: false, isFromKeyboard: isFromKeyboard() })
    }
  }

  handleListBlur = e => {
    if (this.buttonRef.current !== e.relatedTarget) {
      this.setState({ focused: false, isFromKeyboard: isFromKeyboard() })
    }
  }

  /**
   * Sets highlightedIndex to be the item that starts with the character keys the
   * user has typed. Only used in non-search dropdowns.
   *
   * @param keystring - The string the item needs to start with. It is composed by typing keys in fast succession.
   */
  setHighlightedIndexOnCharKeyDown = (keyString: string): void => {
    const { highlightedIndex, filteredItemStrings, startingString } = this.state
    const newStartingString = `${startingString}${keyString.toLowerCase()}`
    let newHighlightedIndex = -1

    this.setStartingString(newStartingString)

    if (_.isNumber(highlightedIndex)) {
      newHighlightedIndex = _.findIndex(
        filteredItemStrings,
        item => item.startsWith(newStartingString),
        highlightedIndex + (startingString.length > 0 ? 0 : 1),
      )
    }

    if (newHighlightedIndex < 0) {
      newHighlightedIndex = _.findIndex(filteredItemStrings, item =>
        item.startsWith(newStartingString),
      )
    }

    if (newHighlightedIndex >= 0) {
      this.setState({
        highlightedIndex: newHighlightedIndex,
      })
    }
  }

  handleSelectedItemRemove(
    e: React.SyntheticEvent,
    item: ShorthandValue<DropdownItemProps>,
    predefinedProps: DropdownSelectedItemProps,
    dropdownSelectedItemProps: DropdownSelectedItemProps,
  ) {
    this.setState({ activeSelectedIndex: null })
    this.removeItemFromValue(item)
    this.tryFocusSearchInput()
    this.tryFocusTriggerButton()
    _.invoke(predefinedProps, 'onRemove', e, dropdownSelectedItemProps)
  }

  removeItemFromValue(item?: ShorthandValue<DropdownItemProps>) {
    const { getA11ySelectionMessage } = this.props
    let { value } = this.state
    let poppedItem = item

    if (poppedItem) {
      value = value.filter(currentElement => currentElement !== item)
    } else {
      poppedItem = value.pop()
    }

    if (getA11ySelectionMessage && getA11ySelectionMessage.onRemove) {
      this.setA11ySelectionMessage(getA11ySelectionMessage.onRemove(poppedItem))
    }

    this.setStateAndInvokeHandler('onSelectedChange', null, { value })
  }

  /**
   * Calls setState and invokes event handler exposed to user.
   * We don't have the event object for most events coming from Downshift se we send an empty event
   * because we want to keep the event handling interface
   */
  setStateAndInvokeHandler = (
    handlerName: keyof DropdownProps,
    event: React.SyntheticEvent<HTMLElement>,
    newState: Partial<DropdownState>,
  ) => {
    const proposedValue = _.isNil(newState.value) ? this.state.value : newState.value
    // `proposedValue` should be normalized for single/multiple variations, `null` condition is
    // required as first item can be undefined
    const newValue = this.props.multiple ? proposedValue : proposedValue[0] || null

    this.setState(newState as DropdownState)
    _.invoke(this.props, handlerName, event, { ...this.props, ...newState, value: newValue })
  }

  tryFocusTriggerButton = () => {
    if (!this.props.search) {
      this.buttonRef.current.focus()
    }
  }

  tryFocusSearchInput = () => {
    if (this.props.search) {
      this.inputRef.current.focus()
    }
  }

  /**
   * If there is no value we use the placeholder value
   * otherwise, for single selection we convert the value with itemToString
   * and for multiple selection we return empty string, the values are rendered by renderSelectedItems
   */
  getSelectedItemAsString = (value: ShorthandValue<DropdownItemProps>): string => {
    const { itemToString, multiple, placeholder } = this.props

    if (!value) {
      return placeholder
    }

    if (multiple) {
      return ''
    }

    return itemToString(value)
  }

  getHighlightedIndexOnArrowKeyOpen = (
    changes: StateChangeOptions<ShorthandValue<DropdownItemProps>>,
  ): number => {
    const { filteredItems, highlightedIndex, value } = this.state
    const { highlightFirstItemOnOpen, items, multiple, search } = this.props
    const isArrowUp = changes.type === Downshift.stateChangeTypes.keyDownArrowUp
    const isArrowDown = changes.type === Downshift.stateChangeTypes.keyDownArrowDown
    const itemsLength = filteredItems.length

    if (highlightedIndex) {
      return highlightedIndex
    }

    if (highlightFirstItemOnOpen) {
      // otherwise, if highlightFirstItemOnOpen prop is provied, highlight first item.
      return 0
    }

    if (!multiple && !search && value.length > 0) {
      // in single selection, if there is a selected item, highlight it.
      const offset = isArrowUp ? -1 : isArrowDown ? 1 : 0
      const newHighlightedIndex = items.indexOf(value[0]) + offset
      if (newHighlightedIndex >= itemsLength) {
        return 0
      }
      if (newHighlightedIndex < 0) {
        return itemsLength - 1
      }
      return newHighlightedIndex
    }

    if (isArrowDown) {
      return 0
    }
    if (isArrowUp) {
      return itemsLength - 1
    }

    return null
  }

  /**
   * Function that sets and cleans the selection message after it has been set,
   * so it is not read anymore via virtual cursor.
   */
  setA11ySelectionMessage = (a11ySelectionStatus: string): void => {
    this.setState({ a11ySelectionStatus })
    this.clearA11ySelectionMessage()
  }

  setStartingString = (startingString: string): void => {
    this.setState({ startingString })
    this.clearStartingString()
  }

  clearA11ySelectionMessage = _.debounce(() => {
    this.setState({ a11ySelectionStatus: '' })
  }, Dropdown.a11yStatusCleanupTime)

  clearStartingString = _.debounce(() => {
    this.setState({ startingString: '' })
  }, Dropdown.charKeyPressedCleanupTime)
}

Dropdown.slotClassNames = {
  clearIndicator: `${Dropdown.className}__clear-indicator`,
  container: `${Dropdown.className}__container`,
  toggleIndicator: `${Dropdown.className}__toggle-indicator`,
  item: `${Dropdown.className}__item`,
  itemsList: `${Dropdown.className}__items-list`,
  searchInput: `${Dropdown.className}__searchinput`,
  selectedItem: `${Dropdown.className}__selecteditem`,
  selectedItems: `${Dropdown.className}__selected-items`,
  triggerButton: `${Dropdown.className}__trigger-button`,
}

/**
 * A Dropdown allows user to select one or more values from a list of options.
 * Can be created with search and multi-selection capabilities.
 *
 * @accessibility
 * Implements [ARIA Combo Box](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox) design pattern, uses aria-live to announce state changes.
 * @accessibilityIssues
 * [Issue 991203: VoiceOver doesn't narrate properly elements in the input/combobox](https://bugs.chromium.org/p/chromium/issues/detail?id=991203)
 */
export default withSafeTypeForAs<typeof Dropdown, DropdownProps>(Dropdown)
