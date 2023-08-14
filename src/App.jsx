import React from 'react'
import {nanoid} from "nanoid";
import he from "he";
import Quizzical from './Quizzical';
import Body from './body';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {

  const [questionPool, setQuestionPool] = React.useState([])
  const [startnewgamebtn, setStartnewgamebtn] = React.useState(1)
  const [question, setQuestion] = React.useState([])
  const [start, setStart] = React.useState(false)

  React.useEffect(() => {
    async function fetchQs() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple")
      const data = await res.json()
      setQuestionPool(data.results)
    }
    
    fetchQs()
  }, [question])
  

  function handleStartNewGame() {
    setStartnewgamebtn(prev => prev + 1)  
    setQuestion([])
    getQuestionSet()
  }

  function isStart() {
    setTimeout(() => {
      setStart(prev => !prev)
    }, 3000)
    getQuestionSet()
  }

  async function getQuestionSet() {
    for(let i = 0; i < 5; i++) {
      let curr = questionPool[i]
      const choices = [...curr.incorrect_answers, curr.correct_answer].sort(() => .5 - Math.random())
      setQuestion(prev => {
        return ([
          ...prev,
          {
            id: nanoid(),
            category: he.decode(curr.category),
            tanong: he.decode(curr.question),
            correctAns: he.decode(curr.correct_answer),
            questionChoices: choices.map(i => he.decode(i))
          }]
        )
      })
    }
  }


  return (
    <>
        {
          start === true
          ?
          <Body 
            q={question}
            handleStartNewGame={handleStartNewGame}
          />
          :
          <>
          <Quizzical 
            start={isStart}
          />
          </>
        }
    </>
  )
}

