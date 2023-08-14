import Confetti from 'react-confetti';
import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './Body.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Body(props) {   
   
  React.useEffect(() => {
    props.q.map(q => {
      setCorrectQA(prev => {
        return {
          ...prev, 
          [q.id]: q.correctAns
        }
      })
    })
  }, [props])


  const [selectedAns, setSelectedAns] = React.useState({})
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [correctQA, setCorrectQA] = React.useState({})
  const [score, setScore] = React.useState(0)


  function ansSelection(obj, id) {
    if([id] in selectedAns) {
      setSelectedAns(prev => {
        return ({
          ...prev,
          [id]: obj
        })
      })
    } else {
      setSelectedAns(prev => {
        return ({
          ...prev,
          [id]: obj
        })
      })
    }
  }

  function restartVars() {
    setSelectedAns({})
    setIsSubmitted(prev => !prev)
    setCorrectQA({})
    setScore(0)
  }

  function checkQuiz() {
    if(Object.keys(selectedAns).length === 5) {
      setShow(false)
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setIsSubmitted(prev => !prev)
  
      for(const [key, value] of Object.entries(correctQA)) {
        if(selectedAns[key] === value) {
          setScore(prev => prev + 1)
        }
      }
    } else {
      setShow(true)
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

  const [show, setShow] = React.useState(false)

  const notif = 
  <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
    <Alert.Heading>Quizzical: Incomplete Answer</Alert.Heading>
    <p>
      Complete the quiz before submitting!
    </p>
  </Alert>

  
  const questionDisplay = props.q.map(q =>
    <div className='body--container-2' id={q.id}>
      <Card className='body--card'>
        <Card.Header className='body--category'>{q.category}</Card.Header>
        <Card.Body>
          <Card.Title className='body--tanong'>{q.tanong}</Card.Title>
          <Card.Text>
              {
                // choices are accessible
                isSubmitted === false
                ?
                  q.questionChoices.map(choice =>
                    Object.values(selectedAns).includes(choice)
                    ?
                    <Button
                            active
                            onClick={() => ansSelection(choice, q.id)} 
                            id={q.id}
                            value={choice}
                            className="body--btn-choice active"
                    >
                      {choice}
                    </Button> 
                    :
                    <Button 
                            className="body--btn-choice" 
                            onClick={() => ansSelection(choice, q.id)} 
                            id={q.id}
                            value={choice}
                    >
                      {choice}
                  </Button>
                  )
                :
                // choices are disabled
                    //const [correctQA, setCorrectQA] = React.useState({})
                    // const [selectedAns, setSelectedAns] = React.useState({})
                q.questionChoices.map(choice =>
                  Object.values(selectedAns).includes(choice) 
                  ?
                    Object.values(correctQA).includes(choice)
                    ?
                    <Button 
                            variant="success"
                            onClick={() => ansSelection(choice, q.id)} 
                            id={q.id}
                            value={choice}
                            className="body--btn-choice active"
                            disabled
                    >
                      {choice}
                    </Button> 
                    :
                    <Button 
                            variant="danger"
                            onClick={() => ansSelection(choice, q.id)} 
                            id={q.id}
                            value={choice}
                            className="body--btn-choice active"
                            disabled
                    >
                      <s>{choice}</s>
                    </Button> 
                  :
                    Object.values(correctQA).includes(choice)
                    ?
                    <Button 
                            variant="success"
                            onClick={() => ansSelection(choice, q.id)} 
                            id={q.id}
                            value={choice}
                            className="body--btn-choice active"
                            disabled
                    >
                      {choice}
                    </Button> 
                    :
                    <Button 
                            onClick={() => ansSelection(choice, q.id)} 
                            id={q.id}
                            value={choice}
                            disabled
                    >
                      <s>{choice}</s>
                    </Button>
                )
              }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )

  
  const quizResultDisplay = 
  <div className='body--card-result-1'>
    <Confetti />
    <Card className='body--card-result-2'>
      <Card.Body>
        <div className='body--card-result-title'>The Quiz is Finished!</div>
        <div className='body--card-result-subtitle' onClick={event => {
            props.handleStartNewGame()
            restartVars()
          }
        }>
          Correct Answers:
          <Card className='body--card-score'>{score} / {props.q.length}</Card>
          <div className='body--card-newgame'>Start New Game</div>
        </div>
      </Card.Body>
    </Card>
  </div>


  return (
    <>  
      <div className='body--container'>
        {
          show
          ?
          notif
          :
          ''
        }
        <div className='body--title'>
          Quizzical
        </div>
      </div>
      {
        isSubmitted === true
        ?
        quizResultDisplay
        :
        ""
      }
      <div className='body--container'>
        {questionDisplay}
      </div>
      {
        isSubmitted === true
        ?
        ""
        :
        <div className='body--start-btn' onClick={checkQuiz}> 
          <p>Check Quiz</p>
        </div>
      }
      <div className='body--container'>
        <div className='body--footer'>
          Built and Designed by Georgette Dalen.
          <br />
          All rights reserved. ©  
        </div>
      </div>
    </>
  )
}

