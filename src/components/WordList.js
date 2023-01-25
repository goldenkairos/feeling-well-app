


const wordList = ["Happy", "Grateful", "Excited", "Content", "Confident", "Fear", "Anxious", "Proud", "Thankful"]

const WordList = ({submitNewWord}) => {
  const wordsComponent = wordList.map((word) => {
    return (
      <div className='feeling' onClick={()=>submitNewWord({"description":word})}>{word}</div>
    )
  })


  return (
    <div>{wordsComponent}</div>  
  )
}

export default WordList;