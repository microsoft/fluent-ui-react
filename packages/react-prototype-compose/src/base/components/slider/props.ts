export interface SliderProps {
  min?: number
  max?: number
  step?: number
  snapToStep?: boolean
  vertical?: boolean
  value?: number
  defaultValue?: number

  onChange?: (ev: MouseEvent | KeyboardEvent, value: number) => void
}
