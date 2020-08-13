/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


CHALLENGE RULES:

- A player loses the entire score when rolls two 6 in  a row and next player plays again. (Save previous roll in separate variable).

- Add input field to the html to ask user to change the winning score (You can read value with .value property).

- Add another dice to the game, and the player loses the current score when one of them is 1 (CSS to position a second dice).

*/

var scores, roundScore, /* winningScore */ activePlayer, gamePlaying;

init();

var previousRoll;

// Adding the event to roll the dice 1
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying) {
    // Giving a random number to dice variable
    dice = Math.floor(Math.random() * 6) + 1;
    
    // Display result and make the dice appear
    // Changing the scr from image to add the given random result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';


    // New function if score is two 6 in a row
    if (dice === 6 && previousRoll === 6) {
      // If player roll twice 6 in a row player lose all your points
      scores [activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();

      // Update the round score if the rolled number was not 1
    } else if (dice !== 1) {
      // Add score
      roundScore += dice; // roundcore = roundscore + dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore; // Add the score to the current player score
      } else {
        // Next player plays (ternary operator)
        nextPlayer();
      }
    
    previousRoll = dice;
  } 
});

// Adding the event to roll the dice 2
document.querySelector('.btn-roll-2').addEventListener('click', function(){
  if(gamePlaying) {
    // Giving a random number to dice variable
    dice = Math.floor(Math.random() * 6) + 1;
    
    // Display result and make the dice appear
    // Changing the scr from image to add the given random result
    var diceDOM = document.querySelector('.dice2');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // New function if score is two 6 in a row
    if (dice === 6 && previousRoll === 6) {
      // If player roll twice 6 in a row player lose all your points
      scores [activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();

      // Update the round score if the rolled number was not 1
    } else if (dice !== 1) {
      // Add score
      roundScore += dice; // roundcore = roundscore + dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore; // Add the score to the current player score
      } else {
        // Next player plays (ternary operator)
        nextPlayer();
      }
    
    previousRoll = dice;
  } 
});


// Button Hold configuration
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
      // Add current score to the global score
      scores[activePlayer] += roundScore;

      // Update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores [activePlayer];
      var winningScore;

      var input = document.querySelector('.final-score').value;
      // Undifined, 0, null or '' is corced to false
      // Anything else is coerced to true
      if (input) {
        var winningScore = input;
      } else {
        winningScore = 100;
      }

      // Check if player won the game
      if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'; // Change text to winner
        // Hide the dice
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // Include the css style
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        gamePlaying = false;
      } else {
        // Next player plays 
        nextPlayer(); 
      }
    }
});

function nextPlayer() {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0; // Reset it to 0
      /* 
      if(activePlayer === 0) {
        activePlayer = 1;
      } else {
        activePlayer = 0;
      }
      */
      // Make both current score reset to 0 
      document.getElementById('current-0').textContent = 0;
      document.getElementById('current-1').textContent = 0;

      // After the player changes we need to change the active class to other player
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');

      // Reference to remove or add class
      //document.querySelector('.player-0-panel').classList.remove('active');
      //document.querySelector('player-1-panel').classList.add('active');

      // Hide dice again and new player plays
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  /* winningScore = 0; */
  activePlayer = 0;
  gamePlaying = true;

  // Ask user for the winning score
  // winningScore = prompt('Enter a value');

  // Hide the dice until the "Roll Dice" is clicked
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  // Make all the scores start in 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1'; // Change text to Player X again
  document.getElementById('name-1').textContent = 'Player 2'; // Change text to Player X again

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}