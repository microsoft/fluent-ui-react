import { useCallback, useRef, useState } from 'react'

import { useControlledState } from '../../hooks/use-controlled-state'
import { useWindowEvent } from '../../hooks/use-window-event'
import { SliderProps } from './props'

export interface SliderState {
  min: number
  max: number
  value: number
  percentage: number

  trackRef: React.Ref<HTMLDivElement>
  onMouseDown: React.MouseEventHandler
  onKeyDown: React.KeyboardEventHandler
}

export interface SliderSlotProps {
  /** Intended to contain the slidre */
  root: {}
  /** Intended to provide a track space for the thumb to slide on */
  track: {}
  /** Intended to provide a selected track section from left to thumb. */
  selectedTrack: {}
  /** Intended to be a child of the track, where left represents a percentage */
  thumb: {}
}

function _getDragValues(
  ev: any,
  containerRect: any,
  min: any,
  max: any,
  step: any,
  snapToStep: any,
) {
  const range = max - min
  const percentage = Math.min(
    1,
    Math.max(0, (ev.clientX - containerRect.left) / containerRect.width),
  )
  const value = Math.round(min + (percentage * range) / step) * step

  return {
    percentage: snapToStep ? (100 * value) / (max - min) : 100 * percentage,
    value,
  }
}

/**
 * Slider hook for building an accessible slider.
 *
 * https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/#slider
 */
export const useSliderState = (userProps: SliderProps) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    snapToStep,
    onChange,
    defaultValue,
  } = userProps
  const [dragging, setDragging] = useState(false)
  const [value, setValue] = useControlledState(controlledValue, defaultValue)
  const [dragState, setDragState] = useState({
    trackRect: null,
  })
  const trackRef = useRef(null)
  const percentage = (100 * (value - min)) / (max - min)

  const _updateValue = useCallback(
    (ev, val) => {
      if (onChange) {
        onChange(ev, val)
      }

      setValue(val)
      return val
    },
    [onChange, setValue],
  )

  const onMouseMove = useCallback(
    (ev: any, allowDefault: any) => {
      if (dragState && dragState.trackRect) {
        const drag = _getDragValues(ev, dragState.trackRect, min, max, step, snapToStep)

        _updateValue(ev, drag.value)
      }

      if (!allowDefault) {
        ev.preventDefault()
        ev.stopPropagation()
      }
    },
    [_getDragValues, dragging, dragState, min, max, step, snapToStep, _updateValue],
  )

  const onMouseDown = useCallback(
    (ev: any) => {
      setDragState({
        trackRect: (trackRef.current as any).getBoundingClientRect(),
      })
      setDragging(true)
      onMouseMove(ev, true)
    },
    [onMouseMove, setDragging, dragState, setDragState, trackRef],
  )

  const onMouseUp = useCallback(
    (ev: any) => {
      setDragging(false)

      ev.preventDefault()
      ev.stopPropagation()
    },
    [setDragging],
  )

  useWindowEvent('mousemove', dragging && onMouseMove)
  useWindowEvent('mouseup', dragging && onMouseUp)

  const onKeyDown = (ev: any) => {
    let newValue

    switch (ev.which) {
      case 36: // home
        newValue = min
        break

      case 35: // end
        newValue = max
        break

      case 37: // left
      case 40: // down
        newValue = ev.metaKey ? min : Math.max(min, value - step)
        break

      case 38: // up
      case 39: // right
        newValue = ev.metaKey ? max : Math.min(max, value + step)
        break

      default:
        return
    }

    _updateValue(ev, newValue)
    ev.preventDefault()
    ev.stopPropagation()
  }

  return {
    min,
    max,
    value,
    trackRef,
    onMouseDown,
    onKeyDown,
    percentage,
  }
}

export const useSliderSlots: (props: SliderProps, state: SliderState) => SliderSlotProps = (
  props: SliderProps,
  state: SliderState,
) => {
  const { min, max, value, trackRef, onMouseDown, onKeyDown, percentage } = state

  return {
    root: {
      role: 'slider',
      tabIndex: 0,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      onMouseDown,
      onKeyDown,
    },
    track: {
      ref: trackRef,
    },
    selectedTrack: {
      style: {
        width: `${percentage}%`,
      },
    },
    thumb: {
      style: {
        left: `${percentage}%`,
      },
    },
  }
}
