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
      className="actualWordCloud"
      words={word2}
      // fontSize={(word) => Math.log2(word.value) * 1}
      options={{
        fontSizes: [30, 70],
        rotations: [0, 90],
        rotationAngles: [-90, 0, 90],
        fontFamily: "Helvetica",
        minSize:[100, 400],
        size:[100,100],
        
      }}
      style={{ opacity: 0.9, height: "75%", width: "75%", fontSizes:"1vw" }}
    />
  );
}

export default WordCloud;
