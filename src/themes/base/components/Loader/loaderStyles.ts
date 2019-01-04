import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { LoaderVariables } from './loaderVariables'
import { LoaderProps } from '../../../../components/Loader/Loader'
import { pxToRem } from '../../../../lib'
import { FlexDirectionProperty } from 'csstype'
import { ObjectOf } from '../../../../../types/utils'

const rootFlexDirections: ObjectOf<FlexDirectionProperty> = {
  above: 'column-reverse',
  below: 'column',
  start: 'row-reverse',
  end: 'row',
}

export default {
  root: ({
    props: p,
  }: ComponentStyleFunctionParam<LoaderProps, LoaderVariables>): ICSSInJSStyle => ({
    alignItems: 'center',
    display: p.inline ? 'inline-flex' : 'flex',
    justifyContent: 'center',
    flexDirection: rootFlexDirections[p.labelPosition],
  }),
  // TODO: use animation there
  indicator: ({
    props: p,
    theme: t,
    variables: v,
  }: ComponentStyleFunctionParam<LoaderProps, LoaderVariables>): ICSSInJSStyle => {
    const animationName = t.renderer.renderKeyframe(
      () =>
        ({
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        } as any),
      {},
    )
    const borderColor = `${v.foregroundColor} ${v.backgroundColor} ${v.backgroundColor}`

    return {
      animationName,
      animationDuration: '1.3s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.53, 0.21, 0.29, 0.67)',

      borderColor,
      borderRadius: '50%',
      borderStyle: 'solid',
      borderWidth: v.borderSizes[p.size],

      boxSizing: 'border-box',

      width: v.indicatorSizes[p.size],
      height: v.indicatorSizes[p.size],
    }
  },
  label: {
    margin: pxToRem(10),
  },
}
