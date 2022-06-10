'use strict';

// Select Elements
const scoreEl_0 = document.getElementById('score--0');
const scoreEl_1 = document.getElementById('score--1');
const currentEl_0 = document.getElementById('current--0');
const currentEl_1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const btnClose = document.querySelector('.btn--close');

const playerEl_0 = document.querySelector('.player--0');
const playerEl_1 = document.querySelector('.player--1');

// Global Variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Add click events to buttons
btnRoll.addEventListener('click', RollDice);
btnHold.addEventListener('click', HoldScore);
btnRules.addEventListener('click', ShowRules);
btnClose.addEventListener('click', HideRules);
btnNew.addEventListener('click', ResetGame);

// Generate random number and display dice
function RollDice() {
	const dice = Math.trunc(Math.random() * 6) + 1;
	diceEl.classList.remove('hidden');
	diceEl.src = `images/dice-${dice}.png`;

	UpdateScore(dice);
}

// Check for losing conditions and update score
function UpdateScore(dice) {
	if (dice !== 1) {
		currentScore += dice;
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
	} else {
		SwitchPlayer();
	}
}

// Switch active player
function SwitchPlayer() {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;

	playerEl_0.classList.toggle('player--active');
	playerEl_1.classList.toggle('player--active');
}

// Check for winning conditions and switch players after storing score
function HoldScore() {
	scores[activePlayer] += currentScore;
	document.getElementById(`score--${activePlayer}`).textContent =
		scores[activePlayer];

	if (scores[activePlayer] >= 100) {
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add('player--winner');
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.remove('player--active');

		document.getElementById(`current--${activePlayer}`).textContent = 0;
		document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
		document.getElementById(`name--${activePlayer === 0 ? 1 : 0}`).textContent =
			'Loser!';

		btnNew.classList.remove('hidden');
		btnHold.classList.add('hidden');
		btnRoll.classList.add('hidden');
		btnRules.classList.add('hidden');
		diceEl.classList.add('hidden');
	} else {
		SwitchPlayer();
	}
}

function ShowRules() {
	modalEl.classList.remove('hidden');
	overlayEl.classList.remove('hidden');
}

function HideRules() {
	modalEl.classList.add('hidden');
	overlayEl.classList.add('hidden');
}

// Return game to initial state
function ResetGame() {
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.remove('player--winner');

	document.getElementById('name--0').textContent = 'Player 1';
	document.getElementById('name--1').textContent = 'Player 2';

	scoreEl_0.textContent = 0;
	scoreEl_1.textContent = 0;
	currentScore = 0;
	activePlayer = 0;
	scores = [0, 0];

	diceEl.classList.add('hidden');
	btnNew.classList.add('hidden');
	btnRoll.classList.remove('hidden');
	btnHold.classList.remove('hidden');
	btnRules.classList.remove('hidden');

	playerEl_0.classList.add('player--active');
}
