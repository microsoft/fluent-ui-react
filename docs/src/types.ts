interface ScreenerKeys {
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

type ScreenerStepsOptions = { [key: string]: any }

interface ScreenerSteps {
  url(url: string): ScreenerSteps
  snapshot(name: string, options?: ScreenerStepsOptions): ScreenerSteps
  click(selector: string): ScreenerSteps
  hover(selector: string): ScreenerSteps
  mouseDown(selector: string): ScreenerSteps
  mouseUp(selector: string): ScreenerSteps
  setValue(selector: string, text: string, options?: ScreenerStepsOptions): ScreenerSteps
  keys(selector: string, keys: string): ScreenerSteps
  executeScript(code: string, isAsync?: boolean): ScreenerSteps
  ignore(selector: string): ScreenerSteps
  wait(msOrSelector: string | number): ScreenerSteps
  waitForNotFound(selector: string): ScreenerSteps
  cssAnimations(isEnabled: string): ScreenerSteps
  rtl(): ScreenerSteps
  ltr(): ScreenerSteps
  end(): ScreenerSteps
}

export type ScreenerStepsArray = ((steps: ScreenerSteps, keys: ScreenerKeys) => ScreenerSteps)[]

export type ExampleSource = {
  js: string
  ts: string
}
