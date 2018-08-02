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
  ChatMessageBehavior,
} from './Behaviors/behaviors'
import { IAccessibilityBehavior } from './interfaces'

export enum AccBehaviorType {
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
  treeItem,
  group,
  chatMessage,
}

export class AccBehaviorFactory {
  private static BehaviorsMap: Map<string, () => IAccessibilityBehavior<{}, {}>> = new Map([
    [AccBehaviorType[AccBehaviorType.button], () => new ButtonBehavior()],
    [AccBehaviorType[AccBehaviorType.toggleButton], () => new ToggleButtonBehavior()],
    [AccBehaviorType[AccBehaviorType.image], () => new ImageBehavior()],
    [AccBehaviorType[AccBehaviorType.input], () => new InputBehavior()],
    [AccBehaviorType[AccBehaviorType.list], () => new ListBehavior()],
    [AccBehaviorType[AccBehaviorType.listItem], () => new ListItemBehavior()],
    [AccBehaviorType[AccBehaviorType.selectableList], () => new SelectableListBehavior()],
    [AccBehaviorType[AccBehaviorType.selectableListItem], () => new SelectableListItemBehavior()],
    [AccBehaviorType[AccBehaviorType.menu], () => new MenuBehavior()],
    [AccBehaviorType[AccBehaviorType.menuItem], () => new MenuItemBehavior()],
    [AccBehaviorType[AccBehaviorType.tree], () => new TreeBehavior()],
    [AccBehaviorType[AccBehaviorType.treeItem], () => new TreeItemBehavior()],
    [AccBehaviorType[AccBehaviorType.group], () => new GroupBehavior()],
    [AccBehaviorType[AccBehaviorType.chatMessage], () => new ChatMessageBehavior()],
  ] as [string, () => IAccessibilityBehavior<{}, {}>][])

  public static getBehavior(
    accBehavior?: AccBehaviorType | string,
  ): IAccessibilityBehavior<{}, {}> {
    let accBehaviorName: string = accBehavior as string

    if (typeof accBehavior !== 'string') {
      accBehaviorName = AccBehaviorType[accBehavior]
    }
    return this.BehaviorsMap.get(accBehaviorName)
      ? this.BehaviorsMap.get(accBehaviorName)()
      : new DefaultBehavior()
  }

  public static registerBehavior(
    name: string,
    behavior: () => IAccessibilityBehavior<{}, {}>,
  ): void {
    if (this.BehaviorsMap.get(name)) {
      console.error(`Behavior with name ${name} already exists in the BehaviorsMap`)
      return
    }

    AccBehaviorFactory.BehaviorsMap.set(name, behavior)
  }
}
