const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let correctAnswers = 0 // To track correct answers
let totalQuestionsAnswered = 0 // To track total questions answered
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is 1+1",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 2,
        imgSrc: "/media/test.png",
    },
    {
        question: "What is 1+2",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 3,
        imgSrc: "/media/test.png",
    },
    {
        question: "What is 1+0",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 1,
        imgSrc: "/media/test.png",
    },
    {
        question: "What is 1+3",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 4,
        imgSrc: "/media/test.png",
    },
    {
        question: "What is 8/2",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 4,
        imgSrc: "/media/test.png",
    },
]

const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = -1
    correctAnswers = 0
    totalQuestionsAnswered = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS - 1) {
        localStorage.setItem('mostRecentScore', `${((correctAnswers / totalQuestionsAnswered) * 100).toFixed(2)}%`)

        return window.location.assign('endA.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter + 1} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${((questionCounter + 1) / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    document.getElementById("img").src = currentQuestion.imgSrc;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            correctAnswers++
        }

        totalQuestionsAnswered++

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

        updateScoreDisplay()
    })
})

updateScoreDisplay = () => {
    const percentageCorrect = ((correctAnswers / totalQuestionsAnswered) * 100).toFixed(2)
    scoreText.innerText = `${percentageCorrect}% (${correctAnswers}/${totalQuestionsAnswered})`
}

startGame()
