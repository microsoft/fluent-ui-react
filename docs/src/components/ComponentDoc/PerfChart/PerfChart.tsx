import * as React from 'react'
import * as _ from 'lodash'
import { FlexibleXYPlot, HorizontalGridLines, LineSeries, XAxis, YAxis } from 'react-vis'
import PerfChartTooltip from './PerfChartTooltip'
import { PerfData } from './PerfDataContext'

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

  return (
    <FlexibleXYPlot
      onMouseLeave={() => {
        setNearestX(undefined)
      }}
    >
      <YAxis title="ms" />
      <XAxis title="build" />

      <HorizontalGridLines />
      {availableCharts.map((chartName, index) => (
        <LineSeries
          key={chartName}
          data={perfData.map(entry => ({
            x: entry.build,
            y: _.get(entry, `performance.${chartName}.actualTime.median`, 0),
          }))}
          {...(index === 0
            ? {
                onNearestX: (d: { x: number }) => {
                  setNearestX(d.x)
                },
              }
            : undefined)}
        />
      ))}

      {nearestX ? (
        <PerfChartTooltip x={nearestX} data={perfData.find(entry => entry.build === nearestX)} />
      ) : (
        undefined
      )}
    </FlexibleXYPlot>
  )
}

export default PerfChart
