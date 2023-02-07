import React from "react";

import ReactWordcloud from "react-wordcloud";
import BarChart from "./BarChart.js";

function WordCloud({ wordsFreq }) {
  const word2 = [];
  for (const [key, value] of Object.entries(wordsFreq)) {
    word2.push({
      text: `${key}`,
      value: `${value}`,
    });
  }

  return (
    <div>
    <ReactWordcloud
      className="actualWordCloud"
      words={word2}
      options={{
        fontSizes: [40, 100],
        rotations: [0, 90],
        rotationAngles: [-90, 0, 90],
        fontFamily: "Helvetica",
      }}
      style={{ opacity: 0.9, height: "75%", width: "75%" }}
    />
    {/* <BarChart words={word2}/> */}
    </div>
  );
}

export default WordCloud;
