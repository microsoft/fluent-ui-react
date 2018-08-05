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
import { Accessibility } from './interfaces'

export enum AccessibilityType {
  default,
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
}

export class AccessibilityFactory {
  private static BehaviorsMap: Map<string, Accessibility> = new Map([
    [AccessibilityType[AccessibilityType.default], DefaultBehavior],
    [AccessibilityType[AccessibilityType.button], ButtonBehavior],
    [AccessibilityType[AccessibilityType.toggleButton], ToggleButtonBehavior],
    [AccessibilityType[AccessibilityType.image], ImageBehavior],
    [AccessibilityType[AccessibilityType.input], InputBehavior],
    [AccessibilityType[AccessibilityType.list], ListBehavior],
    [AccessibilityType[AccessibilityType.listItem], ListItemBehavior],
    [AccessibilityType[AccessibilityType.selectableList], SelectableListBehavior],
    [AccessibilityType[AccessibilityType.selectableListItem], SelectableListItemBehavior],
    [AccessibilityType[AccessibilityType.menu], MenuBehavior],
    [AccessibilityType[AccessibilityType.menuItem], MenuItemBehavior],
    [AccessibilityType[AccessibilityType.tree], TreeBehavior],
    [AccessibilityType[AccessibilityType.treeItem], TreeItemBehavior],
    [AccessibilityType[AccessibilityType.group], GroupBehavior],
  ] as [string, Accessibility][])

  public static getAccessibility(name?: string): Accessibility {
    return this.BehaviorsMap.get(name) || DefaultBehavior
  }

  public static registerAccessibility(name: string, accessibility: Accessibility): void {
    if (this.BehaviorsMap.get(name)) {
      console.error(`Accessibility behavior with name ${name} already exists in the BehaviorsMap`)
      return
    }

    AccessibilityFactory.BehaviorsMap.set(name, accessibility)
  }
}
