const startScreen = document.querySelector(".start-screen");
const inviteScreen = document.querySelector(".game-invitation");
const startScreenBtn = document.querySelector(".start-screen-btn");
const inviteScreenBtn = document.querySelector(".send-invite-btn");
const gameScreen = document.querySelector(".game-screen");

const loadingScreen = document.querySelector(".loader");


startScreenBtn.addEventListener('click', () => {
	startScreen.classList.add("hidden");
	inviteScreen.classList.add("show");
})

inviteScreenBtn.addEventListener('click', () => {
	const usernameInput = document.querySelector('.input-user-field');
	const username = usernameInput.value.trim();

	if (username === '') { // check if user existing
		alert('Please fill in the username field.');
		return;
	}
	inviteScreen.classList.remove("show");
	loadingScreen.classList.add("show");
	setTimeout(function() {
		loadingScreen.classList.remove("show");
		gameScreen.classList.add("show");
	}, 1300);
})
