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

type ScreenerRunnerSteps = {
  /** This will click on the first element matching the provided css selector. */
  click(selector: string): ScreenerRunnerSteps

  /** This will capture a visual snapshot. */
  snapshot(name: string): ScreenerRunnerSteps

  /** this will move the mouse over the first element matching the provided css selector. */
  hover(selector: string): ScreenerRunnerSteps

  /** This will press and hold the mouse button over the first element matching the provided css selector. */
  mouseDown(selector: string): ScreenerRunnerSteps

  /** This will release the mouse button. selector is optional. */
  mouseUp(selector: string): ScreenerRunnerSteps

  /** This will set cursor focus on the first element matching the provided css selector. */
  focus(selector: string): ScreenerRunnerSteps

  /** This will set the value of the input field matching the provided css selector. */
  setValue(selector: string, value: string): ScreenerRunnerSteps

  /** This will send the provided keys to the first element matching the provided css selector. */
  keys(selector: string, key: string): ScreenerRunnerSteps

  /** This will pause execution for the specified number of ms.*/
  wait(ms: number): ScreenerRunnerSteps

  /** This will override the global cssAnimations option for the current UI state. Set to true to enable CSS Animations, and set to false to disable.*/
  cssAnimations(isEnabled: boolean): ScreenerRunnerSteps

  /** This will set the current UI state to right-to-left direction. */
  rtl(): ScreenerRunnerSteps

  /** This will set the current UI state to left-to-right direction. */
  ltr(): ScreenerRunnerSteps

  /** This will return the steps to be run. */
  end(): ScreenerRunnerSteps
}

//
// Typings for `*.steps.tsx`
//

declare type ScreenerSteps = ScreenerStep[]

type ScreenerStep = (steps: ScreenerRunnerSteps, keys: ScreenerRunnerKeys) => ScreenerRunnerSteps
