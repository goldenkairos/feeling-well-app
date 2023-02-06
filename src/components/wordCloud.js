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

      <ReactWordcloud
        words={word2}
        options={{
          fontSizes: [40,100],
          rotations: [0,90],
          rotationAngles:[-90,0,90],
          fontFamily:"Helvetica",
        }}
        style={{ height: 700, width: 700 }}
        
      />

  );
}

export default WordCloud;
