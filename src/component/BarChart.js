import React from 'react';
import '../style/index.css';

function Test({data}) {
  // console.log(data)

  const temp = data
  const maxHeight = 200
  const chartHeight = maxHeight + 20
  const barWidth = 50
  const barMargin = 30
  const numberofBars = temp.length
  let width = numberofBars * (barWidth + barMargin)

  return (
    <>
      <Chart height={chartHeight} width={width} data={data}>
        {temp.map((data, index) => {
          const barHeight = data.temp * 3;
          // const barHeight = data.temp;
          return (
            <Bar
              key={index}
              // key={data.name}
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

const Chart = ({ children, width, height, data }) => (
  <svg
    // viewBox={`0 0 ${width} ${height}`}   
    viewBox={`0 0 ${width} 270`}   
    width="100%"
    height="70%"
    preserveAspectRatio="xMidYMax meet"
  >
    <g className="x axis" transform="translate(5, -150)">
      {data.map((day, index) => (
        <text key={index} x={80 * index} y="400">{day.day}</text>
      ))}
    </g>
    {children}
  </svg>
)

const Bar = ({ x, y, width, height, temp }) => (
  <>
    <rect x={x} y={y} width={width} height={height} fill="black"/> 
    <text x={x + width / 3} y={y - 5}>
        {temp}
    </text>
  </>
)

export default Test
