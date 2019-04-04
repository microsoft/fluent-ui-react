import { LoaderProps } from '../../../../components/Loader/Loader'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { LoaderVariables } from './loaderVariables'

export default {
  indicator: ({
    props: p,
    variables: v,
  }: ComponentStyleFunctionParam<LoaderProps, LoaderVariables>): ICSSInJSStyle => ({
    // Reset existing styles from base theme
    animationName: 'none',
    animationDuration: 'unset',
    animationIterationCount: 'unset',
    animationTimingFunction: 'unset',
    borderColor: 'transparent',
    borderRadius: 0,
    borderStyle: 'none',
    borderWidth: 0,

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
      animationName: t.renderer.renderKeyframe(
        () =>
          ({
            to: {
              opacity: 1,
            },
          } as any),
        {},
      ),
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
      animationName: t.renderer.renderKeyframe(
        () =>
          ({
            to: {
              transform: `translate3d(0, ${v.svgTranslatePosition[p.size]}, 0)`,
            },
          } as any),
        {},
      ),
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
}
