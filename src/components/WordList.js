


const wordList = ["Happy", "Grateful", "Excited", "Content", "Confident", "Fear", "Anxious", "Proud", "Thankful"]

const WordList = ({submitNewWord}) => {
  const wordsComponent = wordList.map((word) => {
    return (
      <button className='feeling' onClick={()=>submitNewWord({"description":word})}>{word}</button>
    )
  })


  return (
    <div className="container">{wordsComponent}</div>  
  )
}

export default WordList;