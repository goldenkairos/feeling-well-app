import React from "react";

import ReactWordcloud from "react-wordcloud";

function WordCloud({ wordsFreq }) {
  const word2 = [];
  for (const [key, value] of Object.entries(wordsFreq)) {
    word2.push({
      text: `${key}`,
      value: `${value}`,
    });
  }


  return (
    <div style={{ height: 400, width: 600 }}>
      <ReactWordcloud
        words={word2}
        options={{
          fontSizes: [40,100],
          rotations: [0,90],
          rotationAngles:[-90,0,90],
          // enableOptimizations: true,
          // deterministic:true,////change the position of the word each render
          
        }}
      />
    </div>
  );
}

export default WordCloud;
