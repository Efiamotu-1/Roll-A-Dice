'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')
const current0El = document.querySelector('#current--0')
const current1El = document.querySelector('#current--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')



// starating conditions
// score0El.textContent = 0
// score1El.textContent = 0
// diceEl.classList.add('hidden')

let scores, currentScore, activePlayer, playing = true


const init = function() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}

init();


const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}
// Rolling dice functionality

btnRoll.addEventListener('click', function() {
    // Generating a random dice roll
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1
        console.log(dice);
        //  Display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`
    
        //  Check for rolled 1
        if (dice !== 1) {
            // Add to current score
            currentScore = currentScore + dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
            // current0El.textContent = currentScore //CHANGE LATER
        }
        else {
            //  switch to next player
           switchPlayer()
        }

    }
})

btnHold.addEventListener('click', function () {
    // Add current score to active player's score
    if(playing) {

        scores[activePlayer] += currentScore;
    
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    
        //  Check if the score is >=100
        if(scores[activePlayer] >= 100) {
            // finish the game
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            diceEl.classList.add('hidden')
        }
        else {
    
            // switch to the next player
            switchPlayer()
        }
    }

})

btnNew.addEventListener('click', init)