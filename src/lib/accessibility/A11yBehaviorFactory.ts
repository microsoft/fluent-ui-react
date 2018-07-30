import {
  ButtonBehavior,
  ToggleButtonBehavior,
  ImageBehavior,
  InputBehavior,
  ListBehavior,
  ListItemBehavior,
  SelectableListBehavior,
  SelectableListItemBehavior,
  MenuItemBehavior,
  MenuBehavior,
  DefaultBehavior,
  TreeBehavior,
  TreeItemBehavior,
  GroupBehavior,
} from './Behaviors/behaviors'
import { IAccessibilityBehavior } from './interfaces'

export enum A11yBehaviorType {
  button,
  toggleButton,
  image,
  input,
  list,
  listItem,
  selectableList,
  selectableListItem,
  menu,
  menuItem,
  tree,
  treeitem,
  group,
}

export class A11yBehaviorFactory {
  public static createBehavior(a11yType?: A11yBehaviorType): IAccessibilityBehavior<{}, {}> {
    switch (a11yType) {
      case A11yBehaviorType.button:
        return new ButtonBehavior()
      case A11yBehaviorType.toggleButton:
        return new ToggleButtonBehavior()
      case A11yBehaviorType.image:
        return new ImageBehavior()
      case A11yBehaviorType.input:
        return new InputBehavior()
      case A11yBehaviorType.list:
        return new ListBehavior()
      case A11yBehaviorType.listItem:
        return new ListItemBehavior()
      case A11yBehaviorType.selectableList:
        return new SelectableListBehavior()
      case A11yBehaviorType.selectableListItem:
        return new SelectableListItemBehavior()
      case A11yBehaviorType.menu:
        return new MenuBehavior()
      case A11yBehaviorType.menuItem:
        return new MenuItemBehavior()
      case A11yBehaviorType.tree:
        return new TreeBehavior()
      case A11yBehaviorType.treeitem:
        return new TreeItemBehavior()
      case A11yBehaviorType.group:
        return new GroupBehavior()
      default:
        return new DefaultBehavior()
    }
  }
}
