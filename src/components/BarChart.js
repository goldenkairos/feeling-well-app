import React from "react";
import "./BarChart.css";
// import Dashboard from "./Dashboard";
// import { wordsFreq } from "./Dashboard.js";

function BarGroup(props) {
  let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = d => d * 10

  let width = widthScale(props.d.value)
  let yMid = props.barHeight * 0.5
  const wordsFreq = props.wordsFreq

  // const words2 = props.words2

  const words = [];
  for (const [key, value] of Object.entries(wordsFreq)) {
    words.push({
      name: `${key}`,
      value: `${value}`,
    });}

  
  return (<g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
  </g>)
}

// function WordCloud({ wordsFreq }) {
//   const word2 = [];
//   for (const [key, value] of Object.entries(wordsFreq)) {
//     word2.push({
//       text: `${key}`,
//       value: `${value}`,
//     })
// }

class BarChart extends React.Component {


  state = {
    data: 
    [
      { name: 'Happy', value: 3 },
      { name: 'Amazed', value: 10 },
      { name: 'Cheerful', value: 35 },
      { name: 'Thu', value: 50 },
      { name: 'Fri', value: 55 },
      { name: 'Sat', value: 40 },
      { name: 'Sun', value: 30 }
    ]
  }

  render() {
    let barHeight = 30
        
    let barGroups = this.state.data.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                    <BarGroup d={d} barHeight={barHeight} />
                                                  </g>)                         
    
    return (
    <div>
    <svg width="800" height="300" >
      <g className="container">
        <text className="title" x="10" y="30"> Your Mental Well-Being At a Glance </text>
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
    </div>)
  }
}

// ReactDOM.render(
//   <BarChart />,
//   document.getElementById('app')
// )

export default BarChart;