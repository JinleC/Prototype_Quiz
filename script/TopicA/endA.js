const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const btn1 = document.getElementById('saveScoreBtn');

const highScores = JSON.parse(localStorage.getItem('highScoresA')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = `Accuracy: ${mostRecentScore}`

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScoresA', JSON.stringify(highScores))
    window.location.assign('')

    
}

btn1.addEventListener('click', (event) => {
    window.location.assign('./highscoresA.html')
});