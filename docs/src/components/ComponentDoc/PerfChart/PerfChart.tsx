import * as React from 'react'
import * as _ from 'lodash'
import {
  DecorativeAxis,
  DiscreteColorLegend,
  FlexibleXYPlot,
  HorizontalGridLines,
  LabelSeries,
  LineSeries,
  XAxis,
  YAxis,
} from 'react-vis'
import PerfChartTooltip from './PerfChartTooltip'
import { PerfData } from './PerfDataContext'
import { curveBundle } from 'd3-shape'

/**
 * Draws a performance chart for all items in perfData.performance.
 * Shows tooltip with details for selected build on mouse hover.
 * x-axis is a build number
 * y-axis is a render time
 */
const PerfChart: React.FC<{ perfData: PerfData }> = ({ perfData }) => {
  const availableCharts: string[] = perfData
    .reduce(
      (acc, next) => {
        return Array.from(new Set([...acc, ...Object.keys(next.performance)]))
      },
      [] as string[],
    )
    .sort()

  const [nearestX, setNearestX] = React.useState<number>()

  const maxColor = '#ff8080'
  const medColor = '#555555'
  const minColor = '#59b359'
  const tagColor = '#888888'

  const lineSeries = (key, data = 'median', props) =>
    availableCharts.map((chartName, index) => (
      <LineSeries
        {...props}
        key={chartName + key}
        data={perfData.map(entry => ({
          x: entry.build,
          y: _.get(entry, `performance.${chartName}.actualTime.${data}`, 0),
        }))}
        {...(index === 0 && {
          onNearestX: (d: { x: number }) => {
            setNearestX(d.x)
          },
        })}
      />
    ))

  return (
    <FlexibleXYPlot
      onMouseLeave={() => {
        setNearestX(undefined)
      }}
    >
      <DiscreteColorLegend
        colors={[maxColor, medColor, minColor]}
        items={['max', 'median', 'min']}
        orientation="vertical"
        style={{ position: 'absolute', top: 0, right: 0, background: 'white' }}
      />
      <YAxis title="ms" />
      <XAxis title="version / build" />

      <HorizontalGridLines />

      {/* git tags */}
      {perfData
        .filter(entry => entry.tag)
        .map(entry => {
          const data = [{ x: entry.build, y: 0 }, { x: entry.build, y: 1000 }]
          return (
            <DecorativeAxis
              style={{
                ticks: { display: 'none' },
                text: { display: 'none' },
                line: { stroke: tagColor },
              }}
              axisStart={data[0]}
              axisEnd={data[1]}
              axisDomain={[data[0].y, data[1].y]}
            />
          )
        })}

      <LabelSeries
        allowOffsetToBeReversed
        data={perfData
          .filter(entry => entry.tag)
          .map(entry => ({
            x: entry.build,
            y: 0,
            label: entry.tag,
            style: {
              fontSize: 10,
              fill: tagColor,
            },
            labelAnchorX: 'end',
            yOffset: 0,
            xOffset: 0,
          }))}
      />

      {lineSeries('curve-max', 'max', {
        opacity: 0.5,
        stroke: maxColor,
        strokeStyle: 'dashed',
        curve: curveBundle.beta(0.5),
      })}

      {lineSeries('curve-median', 'median', {
        stroke: medColor,
        strokeWidth: '2px',
        curve: curveBundle.beta(1),
      })}

      {lineSeries('curve-min', 'min', {
        opacity: 0.5,
        stroke: minColor,
        strokeStyle: 'dashed',
        curve: curveBundle.beta(1),
      })}

      {nearestX && (
        <PerfChartTooltip x={nearestX} data={perfData.find(entry => entry.build === nearestX)} />
      )}
    </FlexibleXYPlot>
  )
}

export default PerfChart
