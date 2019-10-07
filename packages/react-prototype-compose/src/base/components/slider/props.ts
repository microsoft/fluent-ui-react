export interface SliderSlotProps {
  /** Intended to contain the slider */
  root: {}
  /** Intended to provide a track space for the thumb to slide on */
  rail: {}
  /** Intended to provide a selected track section from left to thumb. */
  track: {}
  /** Intended to be a child of the track, where left represents a percentage */
  thumb: {}
}

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  snapToStep?: boolean
  vertical?: boolean
  value?: number
  defaultValue?: number

  onChange?: (ev: MouseEvent | KeyboardEvent, value: number) => void

  slots?: any
  slotProps?: SliderSlotProps
}
