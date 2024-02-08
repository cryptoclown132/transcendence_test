const startScreen = document.querySelector(".start-screen");
const inviteScreen = document.querySelector(".game-invitation");
const startScreenBtn = document.querySelector(".start-screen-btn");
const inviteScreenBtn = document.querySelector(".send-invite-btn");
const gameScreen = document.querySelector(".game-screen");

startScreenBtn.addEventListener('click', () => {
	startScreen.classList.add("hidden");
	inviteScreen.classList.add("show");
})

inviteScreenBtn.addEventListener('click', () => {
	inviteScreen.classList.remove("show");
	gameScreen.classList.add("show");
})
