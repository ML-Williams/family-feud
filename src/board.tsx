import strikeImg from './strikeImg.png';
import React, {useState, useEffect, useCallback} from "react";
// find a way to make the answers reveal after the round is over ✅
// go to next round if round is > 4 and answers are revealed // create a button to go to next round ✅
// score > 300 ? <div> fast money round </div> : null
// strike in a horizontal line ✅
// create a timer for each answer input


let currentRound: number = 1
type Player = {
    id: number;
    name: string;
};

let currentPlayer: Player | null =
    {
        id: 1, name: "Player 1"
    }
let players: Player[] =
    [
        { id: 1, name: "Player 1" },
        { id: 2, name: "Player 2" }
    ]

function togglePlayer(): void {
    if (players.length === 1) {
        currentPlayer = players[0];
    } else {
        const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayer?.id);
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        currentPlayer = players[nextPlayerIndex];
    }
}
type Answer = {
    answer: string[]
    points: number
}

interface Questions {
    question: string
    answersPoints: Answer[]
}
interface FastMoneyQuestions {
    question: string
    answersPoints: Answer[]
}

const fastMoneyQuestions: FastMoneyQuestions[] = [
    {
        question: "Name a reason you might get rid of an old family heirloom.",
        answersPoints: [
            {answer: ["broken"], points: 29},
            {answer: ["ugly"], points: 22},
            {answer: ["divorce"], points: 18},
            {answer: ["sell", "need money", "money"], points: 12},
            {answer: ["too much stuff"], points: 10},
            {answer: ["moving"], points: 5},
        ]
    },
    {
        question: "Name a specific piece of furniture that might be handmade.",
        answersPoints: [
            {answer: ["table"], points: 41},
            {answer: ["chair"], points: 31},
            {answer: ["shelf", "bookshelf"], points: 12},
            {answer: ["dresser"], points: 5},
            {answer: ["bed"], points: 2},
            {answer: ["cabinet"], points: 2},
            {answer: ["bench"], points: 2},
        ]
    },
]

const questions: Questions[] = [
    {
        question: "What do people do with their dogs that's just for show?",
        answersPoints: [
            {answer: ["tricks"], points: 33},
            {answer: ["groom", "trim hair", "cut hair"], points: 27},
            {answer: ["dress them", "clothe them", "costumes"], points: 23},
            {answer: ["carry them around", "tote", "tote them around", "carry"], points: 16},
        ],

    },
    {
        question: "Why might a child go to bed early without being asked?",
        answersPoints: [
            {answer: ["tired", "sleepy", "drowsy"], points: 50},
            {answer: ["sick", "ill", "not feeling well", "unwell",], points: 23},
            {answer: ["christmas eve", "holidays", "christmas"], points: 13},
            {answer: ["in trouble", "on punishment", "grounded", "bad"], points: 10},
            {answer: ["bored", "just because"], points: 3},
        ],
    },
    {
        question: "Name a place that's not usually scary, but is often the setting for scary movies.",
        answersPoints: [
            {answer: ["house", "home"], points: 43},
            {answer: ["woods", "forest", "outside"], points: 21},
            {answer: ["church", "sanctuary"], points: 11},
            {answer: ["hospital", "infirmary"], points: 11},
            {answer: ["school", "college"], points: 8},
            {answer: ["hotel", "motel"], points: 3}
        ],

    },
    {
        question: "Name a reason why workers might go on strike.",
        answersPoints: [
            {answer: ["better pay", "wage", "pay"], points: 77},
            {answer: ["want benefits","health insurance", "insurance"], points: 9},
            {answer: ["no contract", "contract"], points: 7},
            {answer: ["better hours", "work life balance","family time", "hours" ], points: 3},
        ],

    },
]

type AnswerProps = {
    answer: Answer
    isSelected: boolean
    answerIdx : number
}

type FastMoneyAnswerProps = {
    answer: Answer
}



const Answer: React.FC<AnswerProps> = ({answer, isSelected, answerIdx}) => {
    return (
        <div className="row">
            <div className="column">
                { isSelected
                    ? (
                        <div>{answer.answer[0]}
                        </div>
                    )
                    : (
                        <div className='front'> {
                            answer === undefined
                                ? ' '
                                : answerIdx + 1
                        }</div>
                    )
                }
            </div>
            <div className="column">{ isSelected ? <div>{answer.points}</div> : null}</div>
        </div>
    )
}
function getFastMoneyRandomQuestion(): FastMoneyQuestions {
    const randomIndex = Math.floor(Math.random() * fastMoneyQuestions.length)
    const randomQuestion = fastMoneyQuestions[randomIndex]
    const rQuestionHolder = []
    rQuestionHolder.push(randomQuestion)
    return fastMoneyQuestions[randomIndex]
}

const endTurn = () => {
    console.log(currentRound)
    currentRound++
}
const Strike = () => {

return (
    <div>

        <img src={strikeImg}
             alt="strike"
             style={{
                width: "100px",
                height: "100px",
                position:"relative",
                top: "100%",
                left: "500%",
             }}
        />
    </div> )
}
/**
 * fast money round to-do list
 * 1. create questions and answers/points for fast money round
 * 2. create a timer for 50 seconds for round 5 and 60 seconds for round 6
 * 3. proceed to next question after input submission
 *      - once all questions are answered reveal points and go to next round
 * 4. create a div that shows the past questions and the correlating top answer one at a time
 * 5. if combined score is greater than 300 then win 20,000 otherwise 5 * score
 * 6. Go to main menu or game room when game is finished
 * 7. shows the input value after submission in each div for past questions
 * **/

/**
 * fast money break-down
 * 1. have users input display in a div in accordance to the questions order
 * 2. reveal score of each answer after last question submission
 * 3. hide answers of last round
 * 4. render another empty column of divs to repeat round
 * 5. reveal previous answers of last round and scores of each answer of current round
 * 6. reveal top answers of presented questions
 * **/


const FastMoney: React.FC<FastMoneyAnswerProps> = () => {

 return (
     <div>
         <div>
             <div className="fastrow"></div>
         </div>
     </div>)
}

export const Board = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([])
    const [inputValue, setInputValue] = useState("")
    const [strike, setStrike] = useState(0)
    const [showStrike, setShowStrike] = useState(false)
    const [score, setScore] = useState(0)
    let fastMoney = currentRound === 4 && score > 299


    const [currentQuestion, setCurrentQuestion] = useState<Questions>(getRandomQuestion())



    const showStrikeImg = () => {
        setShowStrike(true)
        setTimeout(() => {
            setShowStrike(false)
        }, 2000)
    }
    useEffect(() => {
        setCurrentQuestion(getRandomQuestion)
    }, [])

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const answer = currentQuestion.answersPoints.find((answer) => answer.answer.includes(inputValue))
        const addScore = (answer: Answer) => {
            setScore(score + answer.points)
            if (currentRound  === 2) {
                setScore(score + (answer.points * 2))
            }
            if (currentRound === 3) {
                setScore(score + (answer.points * 3))
            }
        }
        if (answer) {
            setSelectedAnswers(prev => [...prev, answer])
            setInputValue("")
            addScore(answer)
            return

        } else {
            setInputValue("")
            setStrike(strike + 1)
            showStrikeImg()

        } if (inputValue === " ") {
           setInputValue("")
        }
        if (inputValue === "no answer") {
            setStrike(strike + 1)
            setShowStrike(true)
            showStrikeImg()

        } if (strike === 1) {
            setShowStrike(true)
            showStrikeImg()

        } if (strike === 2) {
            setShowStrike(true)
            showStrikeImg()
        }

        if(strike === 3) {
            showStrikeImg()
            togglePlayer()
        }


        if (currentRound < 4 && allAnswered) {
            endTurn()
            togglePlayer()
            setCurrentQuestion(getRandomQuestion)
            setStrike(0)
            console.log("I am working")
        }
        if (!allAnswered && strike === 2) {
            currentQuestion.answersPoints.forEach((answer) => {
                setSelectedAnswers(prev => [...prev, answer])
            })
            }


    }, [inputValue, currentQuestion.answersPoints])

    const handleFastSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
    },[])

    function getRandomQuestion(): Questions {
        const randomIndex = Math.floor(Math.random() * questions.length)
        return questions[randomIndex]
    }

    // this merges to two arrays by adding the length of answers and
    // the difference of that with empty strings to keep a total of 8 divs on the board at all


    const answers = currentQuestion.answersPoints.concat(Array
    (8 - currentQuestion.answersPoints.length)
        .fill(undefined))

    const n = currentQuestion.answersPoints
    const allAnswered = selectedAnswers.length === currentQuestion.answersPoints.length
    const [currentFastMoneyQuestion, setCurrentFastMoneyQuestion] = useState<FastMoneyQuestions>(getFastMoneyRandomQuestion())
    const fastQuestions = currentFastMoneyQuestion.question
    const fastAnswers = currentFastMoneyQuestion.answersPoints

    useEffect(() => {
        setCurrentFastMoneyQuestion(getFastMoneyRandomQuestion)
    }, [])

    return (
        <div>
            <div>
            {!fastMoney ? <div>
            <div
                className="score"
            >
                {score}
            </div>

			<h1
                style={
                {
                    textAlign: "center",
                    fontSize: "2rem",
                    color: "blue",
                }
            }
            >{currentQuestion.question}</h1>
            <div className="container">
                <div>
                    {strike === 1 && (
                        <div
                            className={showStrike ? "visible" : "hidden"}
                        >
                            <Strike/>
                        </div>)}
                    {strike === 2 && (
                        <div
                            className={showStrike ? "visible" : "hidden"}
                        >
                            <Strike/>
                            <Strike/>
                        </div>)}
                    {strike === 3 && (
                        <div
                            className={showStrike ? "visible" : "hidden"}
                        >
                            <Strike/>
                            <Strike/>
                            <Strike/>
                        </div>)}
                </div>
            <div
				style={
                {
                    marginLeft: "18%",
                    position:"absolute",
					display:"flex",
                    border: "5px solid black",
				}
            }
			>
				<div
					style={
                    {
						flex: 1
					}
                }
				>{answers.slice(0, 4).map((answer, idx) => (

                    <Answer
                        answerIdx={n.indexOf(answer)}
                        key={idx}
                        answer={answer}
                        isSelected={selectedAnswers.includes(answer)}
                    />
                ))}
				</div>
				<div
					style={
                    {
						flex:1
					}
                }
				>
                {answers.slice(4, 8).map((answer, idx) => {

                    return (
                        <Answer
                            answerIdx={n.indexOf(answer)}
                            key={idx}
                            answer={answer}
                            isSelected={selectedAnswers.includes(answer)}
                        />
                    )
                })}
				    </div>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                style={
                {
                    justifyContent: "center",
                    position: "relative",
                    top: "300px",
                    display: "flex",
                }
            }
            >
                <input type="text" value={inputValue} onChange={handleInputChange}/>
                <button type="submit">Submit</button>
                <button onClick={
                    () => {
                        setInputValue("no answer")
                        }
                }>
                    No Answer
                </button>
            </form>
            </div> :
                <div>
                <div
                    style={
                        {
                            textAlign: "center",
                            fontSize: "2rem",
                            color: "blue",
                        }
                    }>
                    {fastQuestions}
                </div>
                    { fastAnswers.slice(0,5).map((answer, idx) => {
                        return (
                        <FastMoney answer={answer} key={idx} />)
                        })
                    }
                    <form
                        onSubmit={handleFastSubmit}
                    >
                        <input type="text" value={inputValue} onChange={handleInputChange}/>
                        <button type="submit" onSubmit={() => {
                            setInputValue("")
                        }
                        }>Submit</button>
                        <button>No Answer</button>
                    </form>
                </div>
                }

            {strike === 3 && currentRound < 4 || allAnswered && currentRound < 4 ?
                <button
                    style={{
                        position:"relative",
                        left:"48%",
                        top:"400px",
                        display:"flex",


                    }}
                    onClick={
                    () => {
                setCurrentQuestion(getRandomQuestion)
                setStrike(0)
                setSelectedAnswers([])
                setInputValue("")
                endTurn()
            }
                }>Next Round</button>
                : null
            }
             </div>
        </div>

    )
}

