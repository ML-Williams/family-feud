import React, {useState, useEffect} from "react";
export const Board = () => {
    const [showAnswer, setShowAnswer] = useState(false)
    const [inputValue, setInputValue] = useState("")

    interface Questions {
        question: string
        answersPoints: [string, number][]
    }
// possibly put in own file to create more questions/answers
    const questions: Questions[] = [
        {
            question: "What do people do with their dogs that's just for show?",
            answersPoints: [
                ["tricks", 33],
                ["groom", 27],
                ["dress them", 23],
                ["carry them around", 16],
                ["dress them", 23],
            ],

        },
        {
            question: "Why might a child go to bed early without being asked?",
            answersPoints: [
                ["tired", 50],
                ["sick", 23],
                ["christmas eve", 13],
                ["in trouble", 10],
                ["bored", 3],
            ],
        },
        {
            question: "Name a place that's not usually scary, but is often the setting for scary movies.",
            answersPoints: [
                ["house", 43],
                ["woods", 21],
                ["church", 11],
                ["hospital", 11],
                ["school", 8],
                ["hotel", 3]
            ],

        },
    ]
    const [currentQuestion, setCurrentQuestion] = useState<Questions>(getRandomQuestion())
    useEffect(() => {
        setCurrentQuestion(getRandomQuestion)
    },[])

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const answers = currentQuestion.answersPoints.find(([answer]) => answer === inputValue)
        if (answers) {
            setShowAnswer(true)
        } else {
            setInputValue("")
        }

    }


    function getRandomQuestion(): Questions  {
        const randomIndex = Math.floor(Math.random() * questions.length)
        return questions[randomIndex]
    }
// false === one strike animation

    return (
        <div>
            <h1>{currentQuestion.question}</h1>
            <div className="row">
                <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[0]}</p>):false} </div>
                <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[1]}</p>):false}</div>
            </div>
            <div className="row">
                <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[2]}</p>):false}</div>
                <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[3]}</p>):false}</div>
        </div>

        <div className="row">
            <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[4]}</p>):false}</div>
            <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[5]}</p>):false}</div>
        </div>

        <div className="row">
            <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[6]}</p>):false}</div>
            <div className="column">{showAnswer ? (<p>{currentQuestion.answersPoints[7]}</p>):false}</div>
        </div>
       <form onSubmit={handleSubmit}>
     <input type="text" value={inputValue} onChange={handleInputChange}/>
        <button type="submit">Submit</button>
     <button>No Answer</button>
       </form>
        </div>

)
        }