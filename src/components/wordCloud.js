import React from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";

// import "tippy.js/dist/tippy.css";
// import "tippy.js/animations/scale.css";

// import words from "./words";
// const words = [
//   { Text: "happy", Value: 1 },
//   { Text: "wonderful", Value: 1 },
//   { Text: "amused", Value: 1 },
//   { Text: "confident", Value: 1 },
//   { Text: "empowered", Value: 1 },
//   { Text: "creative", Value: 100 },
//   { Text: "cheerful", Value: 4 },
//   { Text: "proud", Value: 1 },
//   { Text: "grateful", Value: 1000 },
// ]

function WordCloud({ wordsFreq }) {
  const word2 = [];
  for (const [key, value] of Object.entries(wordsFreq)) {
    word2.push({
      text: `${key}`,
      value: `${value}`,
    });
  }

  // const word2 = words.map((d) => ({
  //   text: d.Text,
  //   value: d.Value
  // })

  return (
    <div style={{ height: 200, width: 600 }}>
      <ReactWordcloud
        words={word2}
        options={{
          fontSizes: [50,100],
          rotations: [0,90],
          rotationAngles:[-90,0,90],
          enableOptimizations: true,
          
        }}
      />
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<WordCloud />, rootElement);

export default WordCloud;
