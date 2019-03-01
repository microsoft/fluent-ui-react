//
// Typings for `screener-runner`
//

type ScreenerRunnerKeys = {
  alt: string
  control: string
  enter: string
  escape: string
  return: string
  shift: string
  tab: string
  leftArrow: string
  upArrow: string
  rightArrow: string
  downArrow: string
}

type ScreenerStepBuilder = {
  /** This executes custom JS code against the client browser the test is running in. */
  executeScript(code): ScreenerStepBuilder

  /** This will click on the first element matching the provided css selector. */
  click(selector: string): ScreenerStepBuilder

  /** This will capture a visual snapshot. */
  snapshot(name: string, options?: any): ScreenerStepBuilder

  /** this will move the mouse over the first element matching the provided css selector. */
  hover(selector: string): ScreenerStepBuilder

  /** This will press and hold the mouse button over the first element matching the provided css selector. */
  mouseDown(selector: string): ScreenerStepBuilder

  /** This will release the mouse button. selector is optional. */
  mouseUp(selector: string): ScreenerStepBuilder

  /** This will set cursor focus on the first element matching the provided css selector. */
  focus(selector: string): ScreenerStepBuilder

  /** This will set the value of the input field matching the provided css selector. */
  setValue(selector: string, value: string, options?: any): ScreenerStepBuilder

  /** This will send the provided keys to the first element matching the provided css selector. */
  keys(selector: string, key: string): ScreenerStepBuilder

  /** This will pause execution for the specified number of ms.*/
  wait(ms: number): ScreenerStepBuilder

  /** This will override the global cssAnimations option for the current UI state. Set to true to enable CSS Animations, and set to false to disable.*/
  cssAnimations(isEnabled: boolean): ScreenerStepBuilder

  /** This will set the current UI state to right-to-left direction. */
  rtl(): ScreenerStepBuilder

  /** This will set the current UI state to left-to-right direction. */
  ltr(): ScreenerStepBuilder

  /** This will return the steps to be run. */
  end(): ScreenerStepBuilder
}

//
// Typings for `*.steps.tsx`
//

declare type ScreenerSteps = ScreenerStep[]

type ScreenerStep = (steps: ScreenerStepBuilder, keys: ScreenerRunnerKeys) => ScreenerStepBuilder
