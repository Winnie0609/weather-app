import React from 'react'

function PieChart({value, width, height}) {
  const percentage = value
  const unactive = 100 - value
  const dasharay = `${percentage} ${unactive}`

  return (
      <svg width={width} height={height} viewBox="0 0 42 42" className="donut">

        <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
        <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" strokeWidth="2"></circle>

        <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ce4b99" strokeWidth="2" strokeDasharray={dasharay} strokeDashoffset="25"
      style={{strokeLinecap: "round"}}
      ></circle>

      <g className="chart-text">
        <text x="50%" y="45%" className="chart-number">
          {percentage}%
        </text>
        <text x="50%" y="53%" className="chart-item">
          huminity
        </text>
      </g>
    </svg>
  )
}

export default PieChart