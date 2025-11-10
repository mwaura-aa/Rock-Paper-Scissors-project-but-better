const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const reset = document.getElementById("reset");
const autoPlay = document.getElementById('autoPlay');
let scores = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0
}

rock.onclick = () => {
  let cpu = computerMove();
  
  result('rock', cpu, scores);
}

paper.onclick = () => {
  let cpu = computerMove();
  
  result('paper', cpu, scores);
}

scissors.onclick = () => {
  let cpu = computerMove();
  
  result('scissors', cpu, scores);
}

reset.onclick = () => {
  scores.wins = 0;
  scores.losses = 0;
  scores.ties = 0;
  localStorage.removeItem("score");
}

let isAutoPlaying = false;
let intervalId;

autoPlay.onclick = () => {
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
    let playerChoice = computerMove();
    let cpu = computerMove();

    result(playerChoice, cpu, scores);
  }, 1000);
  isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.body.addEventListener('keydown', () => {
  if(event.key === 'r'){
    let cpu = computerMove();
    
    result('rock', cpu, scores);
  }
  else if(event.key === 'p'){
    let cpu = computerMove();
    
    result('paper', cpu, scores)
  };
  else if(event.key === 's'){
    let cpu = computerMove();
    
    result('scissors', cpu, scores);
  };
});

function computerMove(){
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  let compChoice = '';
  if(randomNumber === 1){
    compChoice = 'rock';
  }
  else if(randomNumber === 2){
    compChoice = 'paper';
  }
  else{
    compChoice = 'scissors';
  }
  return compChoice;
}

function result(userChoice, computerMove, score){
  let outcome = '';
  if(userChoice === 'rock'){
    if(computerMove === 'rock'){
      outcome = 'Tie';
    }

    else if(computerMove === 'paper'){
      outcome = 'You Lose'; 
    }

    else{
      outcome = 'You Win';
    }
  }

  else if(userChoice === 'paper'){
    if(computerMove === 'rock'){
      outcome = 'You Win';
    }

    else if(computerMove === 'paper'){
      outcome = 'Tie'; 
    }

    else{
      outcome = 'You Lose';
    }
  }

  else{
    if(computerMove === 'rock'){
      outcome = 'You Lose';
    }

    else if(computerMove === 'paper'){
      outcome = 'You Win'; 
    }

    else{
      outcome = 'Tie';
    }
  }

  if(outcome === 'You Win'){
    scores.wins++;
  }
  else if(outcome === 'You Lose'){
    scores.losses++;
  }
  else{
    scores.ties++;
  }

  localStorage.setItem('score',JSON.stringify(scores));

  document.getElementById("js-result").innerHTML = outcome;
  document.getElementById("js-moves").innerHTML = `You <img src="move img/${userChoice}-emoji.png" alt="${userChoice}" class="move-img">
    <img src="move img/${computerMove}-emoji.png" alt="${computerMove}" class="move-img"> computer`
  document.getElementById("rate").innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}


