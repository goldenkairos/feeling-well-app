import React from 'react';
import BarGroup from './BarGroup.js';
import './BarGraph.css';



export default function BarChart({ wordsFreq }) {
  const word2 = [];
  for (const [key, value] of Object.entries(wordsFreq)) {
    word2.push({
      name: `${key}`,
      value: `${value}`,
    });
  }

  let barHeight = 30
      
  let barGroups = word2.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                  <BarGroup d={d} barHeight={barHeight} />
                                                  </g>)



  return (
    <svg width="1000" height="1000" >
      <g className="container">
        <text className="title" x="150" y="30">Your Well-being at A Glance</text>
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  )
}