import {
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ICSSInJSStyle,
} from '@fluentui/styles'
import { FlexDirectionProperty } from 'csstype'
import { LoaderProps } from '../../../../components/Loader/Loader'
import { LoaderVariables } from './loaderVariables'
import { pxToRem } from '../../../../utils'
import { ObjectOf } from '../../../../types'

const rootFlexDirections: ObjectOf<FlexDirectionProperty> = {
  above: 'column-reverse',
  below: 'column',
  start: 'row-reverse',
  end: 'row',
}

const loaderStyles: ComponentSlotStylesPrepared<LoaderProps, LoaderVariables> = {
  root: ({
    props: p,
  }: ComponentStyleFunctionParam<LoaderProps, LoaderVariables>): ICSSInJSStyle => ({
    alignItems: 'center',
    display: p.inline ? 'inline-flex' : 'flex',
    justifyContent: 'center',
    flexDirection: rootFlexDirections[p.labelPosition],
  }),
  indicator: ({
    props: p,
    variables: v,
  }: ComponentStyleFunctionParam<LoaderProps, LoaderVariables>): ICSSInJSStyle => ({
    height: v.containerHeights[p.size],
    width: v.containerWidths[p.size],
    overflow: 'hidden',
  }),
  svg: ({
    props: p,
    theme: t,
    variables: v,
  }: ComponentStyleFunctionParam<LoaderProps, LoaderVariables>) => {
    const outerAnimation: ICSSInJSStyle = {
      animationName: {
        to: {
          opacity: 1,
        },
      },
      animationDelay: '1.5s',
      animationDirection: 'normal',
      animationDuration: '.3s',
      animationFillMode: 'both',
      animationIterationCount: '1',
      animationPlayState: 'running',
      animationTimingFunction: 'ease-out',
      display: 'block',
      overflow: 'hidden',
      position: 'relative',
    }
    const svgAnimation: ICSSInJSStyle = {
      animationName: {
        to: {
          transform: `translate3d(0, ${v.svgTranslatePosition[p.size]}, 0)`,
        },
      },
      animationDelay: '0s',
      animationDirection: 'normal',
      animationDuration: '2s',
      animationFillMode: 'both',
      animationPlayState: 'running',
      animationTimingFunction: 'steps(60, end)',
      animationIterationCount: 'infinite',
    }

    return {
      ...outerAnimation,

      ':before': {
        ...svgAnimation,

        backgroundImage: v.svgContent,
        content: '" "',
        display: 'block',
        overflow: 'hidden',

        height: v.svgHeights[p.size],
        width: v.svgWidths[p.size],
      },
    }
  },
  label: () => ({
    margin: pxToRem(10),
  }),
}

export default loaderStyles
