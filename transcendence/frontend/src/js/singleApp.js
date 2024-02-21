let currentStateIndex = 0;


let state = { 
  bodyText: body.innerHTML,
  currPage : "home",
//   idxState : 0
};

// Change the look of your app based on state
function render() {
	document.body.innerHTML = state.bodyText;
}

// Set initial state and render app for the first time
(function initialize() {
  window.history.replaceState(state, null, "");
  render(state);
})();

// Update state, history, and user interface
function handleButtonClick(url) {
	window.history.pushState(state, null, url);
	render(state);
}

// Tell your browser to give you old state and re-render on back
window.onpopstate = function (event) {
	if (event.state)
		state = event.state;
	let stateJson = JSON.stringify(event.state);

	// console.log(taskList);
	// console.log(event.state.currPage);
	  // Log the JSON string
	//   console.log('Navigated to state:', stateJson);
  render(state);
};

function homePage() {
    console.log("coming home");

    state.bodyText = body.innerHTML;

	// state.bodyText = `<H1>Home</H1>
	// 			<button id="game-button">Game</button>
	// 			<button id="chat-button">Chat</button>
	// 			<button id="tournament-button">Tournament</button>
	// 			<button id="task-button">Task</button>
	// 			<script src="app.js"></script>`;
	// currentStateIndex++;
	// state.currPage = "home";
	handleButtonClick("")
}

function gamePage() {

    state.bodyText = body.innerHTML;
	// state.bodyText = `<H1>Game</H1>
	// 			<button id="home-button">Home</button>
	// 			<button id="chat-button">Chat</button>
	// 			<button id="tournament-button">Tournament</button>
	// 			<button id="task-button">Task</button>
	// 			<script src="app.js"></script>`;
	// currentStateIndex++;
	// state.currPage = "game";
	handleButtonClick("game")
}

function chatPage() {

    state.bodyText = body.innerHTML;
	// state.bodyText = `<H1>Chat</H1>
	// 			<button id="home-button">Home</button>
	// 			<button id="game-button">Game</button>
	// 			<button id="tournament-button">Tournament</button>
	// 			<button id="task-button">Task</button>
	// 			<script src="app.js"></script>`;
	// currentStateIndex++;
	// state.currPage = "chat";
	handleButtonClick("")
}

function tournamentPage() {
    state.bodyText = body.innerHTML;
	// state.bodyText = `<H1>Tournament</H1>
	// 			<button id="home-button">Home</button>
	// 			<button id="game-button">Game</button>
	// 			<button id="chat-button">Chat</button>
	// 			<button id="task-button">Task</button>
	// 			<script src="app.js"></script>`;
	// currentStateIndex++;
	// state.currPage = "tournament";
	// handleButtonClick("tournament")///tournament
}

function taskPage(buttonId) {
    state.bodyText = body.innerHTML;
	// if (buttonId == "addtask-button")
	// {
	// 	addTask();
	// 	// var elementToUpdate = document.getElementById('taskList');
    // 	// elementToUpdate.textContent = taskList;
	// 	// return;
	// }
	// state.bodyText = `<H1>Task</H1>
	// 			<button id="home-button">Home</button>
	// 			<button id="game-button">Game</button>
	// 			<button id="chat-button">Chat</button>
	// 			<button id="tournament-button">Tournament</button>
	// 			<label for="taskInput">New Task:</label>
	// 			<input type="text" id="taskInput" placeholder="Enter task name">
	// 			<button id="addtask-button">Add Task</button>
	// 			<ul id="taskList">`
	// 			+ taskList +					
	// 			`</ul>
	// 			<script src="app.js"></script>`;
	// if (buttonId == "addtask-button") {
	// 	// replaceAllHistory(state);
	// 	window.history.replaceState(state, null, "");
	// 	state.currPage = "task";
	// 	render(state);
	// }
	// else {
	// 	handleButtonClick("")///task
	// 	state.currPage = "task";
	// }
    handleButtonClick("")///task
}

// document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('click', function(event) {
		
        console.log("click event happened");
        
        if (event.target.tagName === 'BUTTON') {
			let buttonId = event.target.id;

			if (buttonId == "sidebar-btn-home")
				homePage();
			else if (buttonId == "sidebar-btn-game")
				gamePage();
			else if (buttonId == "sidebar-btn-chat")
				chatPage();
			else if (buttonId == "sidebar-btn-nothing")
				tournamentPage();
			else if (buttonId == "sidebar-btn-profile")
				taskPage(buttonId);
		}
	});
// });