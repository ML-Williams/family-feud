import React, {useState, useEffect, useCallback} from "react";

type Answer = {
	answer: string
	points: number
}

interface Questions {
	question: string
	answersPoints: Answer[]
}

const questions: Questions[] = [
	{
		question: "What do people do with their dogs that's just for show?",
		answersPoints: [
			{answer: "tricks", points: 33},
			{answer: "groom", points: 27},
			{answer: "dress them", points: 23},
			{answer: "carry them around", points: 16},
			{answer: "dress them", points: 23},
		],

	},
	{
		question: "Why might a child go to bed early without being asked?",
		answersPoints: [
			{answer: "tired", points: 50},
			{answer: "sick", points: 23},
			{answer: "christmas eve", points: 13},
			{answer: "in trouble", points: 10},
			{answer: "bored", points: 3},
		],
	},
	{
		question: "Name a place that's not usually scary, but is often the setting for scary movies.",
		answersPoints: [
			{answer: "house", points: 43},
			{answer: "woods", points: 21},
			{answer: "church", points: 11},
			{answer: "hospital", points: 11},
			{answer: "school", points: 8},
			{answer: "hotel", points: 3}
		],

	},
]

type AnswerProps = {
	answer: Answer
	isSelected: boolean
}
const Answer: React.FC<AnswerProps> = ({answer, isSelected}) => {
		return (
			<div className={"row"}>
					<p className="column">{isSelected && answer.answer}</p>
					<p className="column">{isSelected && answer.points}</p>
			</div>
		)
}
export const Board = () => {
	const [selectedAnswer, setSelectedAnswer] = useState<Answer>()
	const [inputValue, setInputValue] = useState("")


// possibly put in own file to create more questions/answers

	const [currentQuestion, setCurrentQuestion] = useState<Questions>(getRandomQuestion())
	useEffect(() => {
		setCurrentQuestion(getRandomQuestion)
	}, [])

	const handleInputChange = (e: any) => {
		setInputValue(e.target.value)
	}
	const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		const answer = currentQuestion.answersPoints.find((answer) => answer.answer === inputValue)
		if (answer) {
			setSelectedAnswer(answer)
		} else {
			setInputValue("")
		}

	}, [inputValue, currentQuestion.answersPoints])

	function getRandomQuestion(): Questions {
		const randomIndex = Math.floor(Math.random() * questions.length)
		return questions[randomIndex]
	}

// false === one strike animation

	return (
		<div>
			<h1>{currentQuestion.question}</h1>

			{currentQuestion.answersPoints.slice(0,4).map((answer, idx) => (
				<Answer
					key={answer.answer + idx}
					answer={answer}
					isSelected={answer === selectedAnswer}
				/>
			))}

			<form onSubmit={handleSubmit}>
				<input type="text" value={inputValue} onChange={handleInputChange}/>
				<button type="submit">Submit</button>
				<button>No Answer</button>
			</form>
		</div>

	)
}