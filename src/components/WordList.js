


const wordList = ["Happy", "Grateful", "Excited", "Content", "Confident", "Fear", "Anxious", "Proud", "Thankful"]

const WordList = ({addWord}) => {
  const wordsComponent = wordList.map((word) => {
    return (
      <div onClick={()=>addWord({"description":word})}>{word}</div>
    )
  })


  return (
    <div>{wordsComponent}</div>  
  )
}

export default WordList;