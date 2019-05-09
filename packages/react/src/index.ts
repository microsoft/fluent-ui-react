import * as themes from './themes'

//
// Theme
//
export { themes }
export * from './themes/types'
export * from './themes/colorUtils'

//
// Components
//
export { Ref, RefProps } from '@stardust-ui/react-component-ref'

export { default as Accordion, AccordionProps } from './components/Accordion/Accordion'

export { default as Alert, AlertProps } from './components/Alert/Alert'

export { default as Attachment, AttachmentProps } from './components/Attachment/Attachment'

export { default as Avatar, AvatarProps } from './components/Avatar/Avatar'

export { default as Box, BoxProps } from './components/Box/Box'

export { default as Button, ButtonProps, ButtonState } from './components/Button/Button'
export { default as ButtonGroup, ButtonGroupProps } from './components/Button/ButtonGroup'

export { default as Chat, ChatProps } from './components/Chat/Chat'
export {
  default as ChatItem,
  ChatItemProps,
  ChatItemSlotClassNames,
} from './components/Chat/ChatItem'
export {
  default as ChatMessage,
  ChatMessageProps,
  ChatMessageSlotClassNames,
} from './components/Chat/ChatMessage'

export {
  default as Divider,
  DividerProps,
  DividerPropsWithDefaults,
} from './components/Divider/Divider'
export { default as Dialog, DialogProps } from './components/Dialog/Dialog'

export {
  default as Dropdown,
  DropdownProps,
  DropdownSlotClassNames,
} from './components/Dropdown/Dropdown'

export { default as DropdownItem, DropdownItemProps } from './components/Dropdown/DropdownItem'

export {
  default as DropdownSelectedItem,
  DropdownSelectedItemProps,
} from './components/Dropdown/DropdownSelectedItem'

export {
  default as DropdownSearchInput,
  DropdownSearchInputProps,
} from './components/Dropdown/DropdownSearchInput'

export { default as Embed, EmbedProps, EmbedState } from './components/Embed/Embed'

export { default as Flex, FlexProps } from './components/Flex/Flex'
export { default as FlexItem, FlexItemProps } from './components/Flex/FlexItem'

export { default as Form, FormProps } from './components/Form/Form'
export { default as FormField, FormFieldProps } from './components/Form/FormField'

export { default as Grid, GridProps } from './components/Grid/Grid'

export { default as Header, HeaderProps } from './components/Header/Header'
export {
  default as HeaderDescription,
  HeaderDescriptionProps,
} from './components/Header/HeaderDescription'

export { default as Icon, IconProps, IconXSpacing } from './components/Icon/Icon'

export { default as Image, ImageProps } from './components/Image/Image'

export { default as Input, InputState, InputProps } from './components/Input/Input'

export {
  default as ItemLayout,
  ItemLayoutPropsWithDefaults,
  ItemLayoutProps,
  ItemLayoutSlotClassNames,
} from './components/ItemLayout/ItemLayout'

export { default as Label, LabelProps } from './components/Label/Label'
export { default as Loader, LoaderProps } from './components/Loader/Loader'

export {
  default as Layout,
  LayoutPropsWithDefaults,
  LayoutProps,
  LayoutSlotClassNames,
} from './components/Layout/Layout'

export { default as List, ListProps } from './components/List/List'
export { default as ListItem, ListItemProps } from './components/List/ListItem'

export { default as Menu, MenuProps, MenuState, MenuShorthandKinds } from './components/Menu/Menu'
export {
  default as MenuItem,
  MenuItemState,
  MenuItemProps,
  MenuItemSlotClassNames,
} from './components/Menu/MenuItem'
export { default as MenuDivider, MenuDividerProps } from './components/Menu/MenuDivider'

export {
  default as Popup,
  PopupState,
  PopupProps,
  PopupEvents,
  RestrictedHoverEvents,
  RestrictedClickEvents,
  PopupEventsArray,
} from './components/Popup/Popup'
export { default as PopupContent, PopupContentProps } from './components/Popup/PopupContent'
export { Alignment, Position } from './lib/positioner'

export {
  default as Portal,
  PortalState,
  PortalProps,
  TriggerAccessibility,
} from './components/Portal/Portal'

export { default as Provider, ProviderProps } from './components/Provider/Provider'
export {
  default as ProviderConsumer,
  ProviderConsumerProps,
} from './components/Provider/ProviderConsumer'

export { default as RadioGroup, RadioGroupProps } from './components/RadioGroup/RadioGroup'
export {
  default as RadioGroupItem,
  RadioGroupItemState,
  RadioGroupItemProps,
} from './components/RadioGroup/RadioGroupItem'

export { default as Segment, SegmentProps } from './components/Segment/Segment'

export { default as Status, StatusProps } from './components/Status/Status'

export { default as Text, TextProps } from './components/Text/Text'

export { default as Animation, AnimationProps } from './components/Animation/Animation'

export { default as Tree } from './components/Tree'

export { default as Reaction, ReactionProps, ReactionState } from './components/Reaction/Reaction'
export { default as ReactionGroup, ReactionGroupProps } from './components/Reaction/ReactionGroup'

export { default as Video, VideoProps } from './components/Video/Video'

//
// Accessibility
//
export * from './lib/accessibility/types'
export { default as menuBehavior } from './lib/accessibility/Behaviors/Menu/menuBehavior'
export { default as menuItemBehavior } from './lib/accessibility/Behaviors/Menu/menuItemBehavior'
export {
  default as menuDividerBehavior,
} from './lib/accessibility/Behaviors/Menu/menuDividerBehavior'
export { default as tabBehavior } from './lib/accessibility/Behaviors/Tab/tabBehavior'
export { default as tabListBehavior } from './lib/accessibility/Behaviors/Tab/tabListBehavior'
export { default as toolbarBehavior } from './lib/accessibility/Behaviors/Toolbar/toolbarBehavior'
export {
  default as toolbarButtonBehavior,
} from './lib/accessibility/Behaviors/Toolbar/toolbarButtonBehavior'
export {
  default as radioGroupBehavior,
} from './lib/accessibility/Behaviors/Radio/radioGroupBehavior'
export {
  default as radioGroupItemBehavior,
} from './lib/accessibility/Behaviors/Radio/radioGroupItemBehavior'
export { default as chatBehavior } from './lib/accessibility/Behaviors/Chat/chatBehavior'
export {
  default as chatMessageBehavior,
} from './lib/accessibility/Behaviors/Chat/chatMessageBehavior'
export { default as gridBehavior } from './lib/accessibility/Behaviors/Grid/gridBehavior'
export {
  default as popupFocusTrapBehavior,
} from './lib/accessibility/Behaviors/Popup/popupFocusTrapBehavior'
export {
  default as popupAutoFocusBehavior,
} from './lib/accessibility/Behaviors/Popup/popupAutoFocusBehavior'
export { default as dialogBehavior } from './lib/accessibility/Behaviors/Dialog/dialogBehavior'
export { default as statusBehavior } from './lib/accessibility/Behaviors/Status/statusBehavior'
export { default as alertBehavior } from './lib/accessibility/Behaviors/Alert/alertBehavior'
export {
  default as alertWarningBehavior,
} from './lib/accessibility/Behaviors/Alert/alertWarningBehavior'

//
// Utilities
//
export { default as mergeThemes } from './lib/mergeThemes'
export { createComponent } from './lib'
export {
  RenderStardustResultConfig,
  CreateStardustComponentConfig,
} from './lib/createStardustComponent'
export {
  AnimatedComponentProps,
  StyledComponentProps,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  SizeValue,
} from './lib'
export { ShorthandValue, ShorthandRenderer } from './types'

//
// FocusZone
//
import {
  getFirstTabbable,
  getLastTabbable,
  getNextElement,
  getPreviousElement,
  focusAsync,
} from './lib/accessibility/FocusZone/focusUtilities'
export const FocusZoneUtilities = {
  getFirstTabbable,
  getLastTabbable,
  getNextElement,
  getPreviousElement,
  focusAsync,
}
export { FocusZoneDirection, FocusZoneProps } from './lib/accessibility/FocusZone/FocusZone.types'
export { FocusZoneMode } from './lib/accessibility/types'
