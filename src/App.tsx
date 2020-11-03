import React , {useState} from 'react';
import {fetchQuestions} from './API'
import QuestionCard from './components/QuestionCard';
import {Difficulty, QuestionState} from './API'
import { GlobalStyle, Wrapper } from './App.styles'

const first=false;
const second=true;
let result=2+2;
const sandra='cute';

const TOTAL_QUESTIONS = 10;
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [displayAnswer, setDisplayAnswer] = useState("")

  console.log(questions);


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswers = (e : any) => {
    if (!gameOver) {
     
      const answer = e.currentTarget.value;
      
      const correct = questions[number].correct_answer === answer;
      correct ? setDisplayAnswer(answer) : setDisplayAnswer("");
     
      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {

    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }

  }
  return   ( 
    <>
    <GlobalStyle/>
   <Wrapper>
 
  {first && second && <h1>{result}</h1>} 
  <h1>React Quiz Game</h1>
  {gameOver ? (
  <button className='start' onClick={startTrivia}>
    Start
  </button>
  ):null}
   {!gameOver ? <p className="score">Score:{score}</p> : null}
   {loading ? <p>Loading Questions...</p> : null}
   {!loading && !gameOver && (
      <QuestionCard 
  questionNumber={number + 1}
  totalQuestion={TOTAL_QUESTIONS}
  question={questions[number].question}
  answers={questions[number].answers}
  userAnswer={userAnswers ? userAnswers[number] : undefined}
  callback={checkAnswers} 
  />)}

{!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
    </Wrapper>
  </>
  )
}

     
  


export default App;
