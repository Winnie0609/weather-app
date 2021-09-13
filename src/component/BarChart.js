import React from 'react';
import '../style/index.css';

function Barchart({data}) {

  const temp = data
  const maxHeight = 200
  const chartHeight = maxHeight + 20
  const barWidth = 10
  const barMargin = 70
  const numberofBars = temp.length
  let width = numberofBars * (barWidth + barMargin)

  return (
    <>
      <Chart height={chartHeight} width={width} data={data}>
        {temp.map((data, index) => {
          const barHeight = data.temp * 5;
          return (
            <Bar
              key={index}
              x={index * (barWidth + barMargin)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
              expenseName={data.name}
              temp={data.temp}
            />
          )
        })}
      </Chart> 
    </>
  );
}

const Chart = ({ children, width, data }) => (
  <svg
    viewBox={`0 0 ${width} 270`}   
    width="100%"
    height="70%"
    preserveAspectRatio="xMidYMax meet"
    className="barchart"
  >
    <g className="x axis" transform="translate(-10, -150)">
      {data.map((day, index) => (
        <text key={index} x={81 * index} y="400">{day.day}</text>
      ))}
    </g>
    {children}
  </svg>
)

const Bar = ({ x, y, width, height, temp }) => (
  <>
    <rect x={x} y={y} width={width} height={height} rx="5" fill="#5773FF"/> 
    <text x={x + width / 3} y={y - 20}>
        {temp}°
    </text>
  </>
)

export default Barchart