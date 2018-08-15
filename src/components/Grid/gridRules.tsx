import { IGridVariables } from './gridVariables'
import { IGridProps, GridTemplate, FlowType } from './Grid'
import { pxToRem } from '../../lib'

const getCSSTemplateValue = (template: GridTemplate): string => {
  const templateAsNumber = Number(template)

  return !isNaN(templateAsNumber) && templateAsNumber > 0
    ? `repeat(${template}, 1fr)`
    : String(template)
}

const getSizeObjFromCssSizeProp = (size: string): { height: string; width: string } => {
  if (typeof size !== 'string' || !size) {
    return { height: undefined, width: undefined }
  }

  const [height, width = height] = size.split(/[ ,]+/)
  return { height, width }
}

const getGridCssStylesFromSize = (size: string, flowIsColumn: boolean): { grid: string } => {
  const { height: itemHeight, width: itemWidth } = getSizeObjFromCssSizeProp(size)
  return {
    grid: flowIsColumn
      ? `repeat(auto-fill, ${itemHeight}) / auto-flow ${itemWidth}`
      : `auto-flow ${itemHeight} / repeat(auto-fill, ${itemWidth})`,
  }
}

export default {
  root: ({ props: p, variables: v }: { props: IGridProps; variables: IGridVariables }) => {
    const flowIsColumn = p.flow === 'column'
    const {
      alignItems,
      columns,
      flow,
      gap,
      gridSize,
      itemSize,
      justifyItems,
      rows,
      alignContent = flowIsColumn && 'space-evenly',
      justifyContent = !flowIsColumn && 'space-evenly',
    } = p

    const { padding } = v
    const {
      height = itemSize && !flowIsColumn ? 'fit-content' : pxToRem(500),
      width = itemSize && flowIsColumn ? 'fit-content' : '100%',
    } = getSizeObjFromCssSizeProp(gridSize)

    const rules = {
      height,
      width,
      padding,
      alignContent,
      alignItems,
      justifyContent,
      justifyItems,
      background: 'gray', // TODO-Bugaa92: delete
      display: 'grid',
      gridGap: gap || v.gap,
      gridAutoFlow: flow || (rows && !columns && 'column'),
      ...(rows && { gridTemplateRows: getCSSTemplateValue(rows) }),
      ...(columns && { gridTemplateColumns: getCSSTemplateValue(columns) }),
      ...(itemSize && getGridCssStylesFromSize(itemSize, flowIsColumn)),
    }

    return rules
  },
}
