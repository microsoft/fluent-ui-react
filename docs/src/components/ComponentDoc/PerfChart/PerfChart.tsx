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

export type PerfChartProps = { perfData: PerfData }

const sampleToXAxis = sample => {
  return new Date(sample.ts).getTime()
}

const formatXAxis = val => {
  const date = new Date(val)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

/**
 * Draws a performance chart for all items in perfData.performance.
 * Shows tooltip with details for selected build on mouse hover.
 * x-axis is a build number
 * y-axis is a render time
 */
const PerfChart: React.FC<PerfChartProps> = ({ perfData }) => {
  const availableCharts: string[] = perfData
    .reduce((acc, next) => {
      return Array.from(new Set([...acc, ...Object.keys(next.performance)]))
    }, [] as string[])
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
        data={perfData.map(sample => ({
          x: sampleToXAxis(sample),
          y: _.get(sample, `performance.${chartName}.actualTime.${data}`, 0),
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
      <XAxis tickFormat={formatXAxis} tickLabelAngle={-30} />

      <HorizontalGridLines />

      {/* git tags */}
      {perfData
        .filter(sample => sample.tag)
        .map(sample => {
          const data = [
            { x: sampleToXAxis(sample), y: 0 },
            { x: sampleToXAxis(sample), y: 1000 },
          ]
          return (
            <DecorativeAxis
              key={sample.build}
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
          .filter(sample => sample.tag)
          .map(sample => ({
            x: sampleToXAxis(sample),
            y: 0,
            label: sample.tag,
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
      })}

      {lineSeries('curve-min', 'min', {
        opacity: 0.5,
        stroke: minColor,
        strokeStyle: 'dashed',
        curve: curveBundle.beta(1),
      })}

      {nearestX && (
        <PerfChartTooltip
          x={nearestX}
          data={perfData.find(sample => sampleToXAxis(sample) === nearestX)}
        />
      )}
    </FlexibleXYPlot>
  )
}

export default PerfChart
