window.addEventListener("DOMContentLoaded", function(event) {

<<<<<<< HEAD
	var games = localStorage.getItem('schedule');
	var userType = localStorage.getItem('userType');
	var scheduleContainer = document.querySelector('#view');
	var mainGame;

	if(!games){
			console.log('there wasnt anything in local storage so make a fake network request to get data');
			makeRequest(null);

		} else{
			console.log('render list using local browser data for now then make a network request to get updated items');
			var retrieved = localStorage.getItem('schedule');
			schedule = JSON.parse(retrieved);
			renderSchedule(schedule);

			//temporarily commented out until we use rest endpoint
			//makeRequest(schedule);
	}

	document.addEventListener('click', function(e){
		if(e.target.classList.contains('delete-button')){
			deleteGame(e);
		} else if (e.target.classList.contains('edit-button')){
			editGame(e);
		} else if(e.target.classList.contains('save-button')){
			saveGame(e);
		} else if(e.target.classList.contains('large_button')){
			renderGamePage(e);
		} else if(e.target.id === 'returnToSchedule-button'){
			returnToSchedule();
		} else if (e.target.id === 'goEventFeed-button'){
			renderEventPage(e);
		} else if(e.target.id === 'addEvent-button'){
			addEvent(e);
		}
	});

	// only allow addition of games if coach
	if(userType === "coach"){
		document.querySelector('#addGame-button').classList.remove('hidden');
	}


	function makeRequest(compare){
		loadJSON(function(response) {

			var currentTeam = localStorage.getItem('currentTeam');

		    // Do Something with the response e.g.
		    jsonresponse = JSON.parse(response);

		    // Assuming json data is wrapped in square brackets as Drew suggests
		    schedule = jsonresponse.teams[currentTeam].schedule;
		    localStorage.setItem('schedule', JSON.stringify(schedule));

		    // now that there is something on screen, make a request and update the container if local and request data differs
		    // make sure schedule container is empty
		    if(JSON.stringify(schedule) !== JSON.stringify(compare)){
		    	console.log('local and request different');
		    	while(scheduleContainer.firstChild){
		    		console.log('remove kid');
		    		scheduleContainer.removeChild(scheduleContainer.firstChild);
		    	}
		    	renderSchedule(schedule);
			}
		});
	}

	function renderSchedule(schedule){
		let t = document.getElementById('schedule-view');
		let markup = schedule.map(game =>`<div class="large_button" id="${game.date}" data-date="${game.date}" data-opponent="${game.team2}" onclick="">
											<span>${game.date} </span><span>${game.team1}</span> vs. <span>${game.team2}</span> <br>
											<button class="delete-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> delete </button>
											<button class="edit-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> edit </button>
											</div>`).join('');
		t.content.querySelector('#schedule-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		scheduleContainer.appendChild(clonedTemplate);

		if(userType === "coach"){
			// collect buttons and turn it into an array
			var actionButtons = Array.from(scheduleContainer.getElementsByTagName('button'));
			actionButtons.forEach(button => {button.classList.remove('hidden')});
		}
	}

	function deleteGame(e){

		if(userType === 'coach'){

			var finder = e.target.dataset.date;
			var el = document.getElementById(finder);
			el.parentNode.removeChild(el);

			//perform get request when using REST
			let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
			var result = scheduleCopy.filter(function(game){
				if(game.date !== e.target.dataset.date || game.team2 !== e.target.dataset.opponent){
					return true;
				} else{
					return false;
				}
			});
			// perform post request when using REST
			localStorage.setItem('schedule', JSON.stringify(result));
		} else{
			//do nothing, user doesn't have permissions
		}
	}

	function editGame(e){

		if(userType === 'coach'){

			var scheduleContainer = document.querySelector('.schedule');
			//perform get request when using REST
			let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
			var result = scheduleCopy.filter(function(game){
				if(game.date !== e.target.dataset.date || game.team2 !== e.target.dataset.opponent){
					return false;
				} else{
					return true;
				}
			})[0];

			let t = document.getElementById('update-view');
			let markup = `<label>Date<input name="date" data-date="${result.date}" value="${result.date}"></label>
						  <label>Opponent<input name="team2" data-opponent="${result.team2}" value="${result.team2}"></label>
						  <button class="save-button"> save </button>`;
			t.innerHTML = markup;
			t.classList.remove('hidden');
			scheduleContainer.classList.add('hidden');
		}
	}

	function saveGame(e){

		var scheduleContainer = document.querySelector('.schedule');
		var scheduleView = document.getElementById('view');
		let t = document.getElementById('update-view');
		// get request
		let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));

		var inputs = document.getElementsByTagName('input');
		var result = scheduleCopy.filter(function(game){
				if(game.date !== inputs.date.dataset.date || game.team2 !== inputs.team2.dataset.opponent){
					return false;
				} else{
					return true;
				}
			})[0];

		result.date = inputs.date.value;
		result.team2 = inputs.team2.value;

		localStorage.setItem('schedule', JSON.stringify(scheduleCopy));

		// delete the existing stuff and add some new stuff in
		while(scheduleView.firstChild){
		    console.log('remove kid');
		    scheduleView.removeChild(scheduleView.firstChild);
		 }

		renderSchedule(scheduleCopy);
		t.classList.add('hidden');
		scheduleContainer.classList.remove('hidden');
	}

=======
>>>>>>> 37521947bc2eb74b7c66fe8faf994c98ee85bcb4
	function loadJSON(callback) {

	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    // when using network, change the json file to a REST endpoint
	    xobj.open('GET', '../json/teams.json', true);
	    xobj.onreadystatechange = function() {
	        if (xobj.readyState == 4 && xobj.status == "200") {
	            // .open will NOT return a value but simply returns undefined in async mode so use a callback
	            callback(xobj.responseText);
	        }
	    }
	    xobj.send(null);
	}

	function renderGamePage(e){
		//hide the schedule container
		var schedule = document.querySelector('.schedule');
		var gamePage = document.getElementById('gamePage-view');

		schedule.classList.add('hidden');
		//perform get request when using REST
		//should only return an array with the 1 game with the fit date and opponent
		let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
		var currentGame = scheduleCopy.filter(function(game){
			if(game.date !== e.target.dataset.date || game.team2 !== e.target.dataset.opponent){
				return false;
			} else{
				return true;
			}
		})[0];
    mainGame = currentGame;
		let markup = `<main class="margin_center">
						<button id="returnToSchedule-button"> Return to Schedule </button>
						<div class="live-game-info text_align_center">
							<h1 class="no_margin"> ${currentGame.date} </h1>
							<h3 class="no_margin"> ${currentGame.location} </h3>
						</div>
						<div class="live-game-teams">
							<div class="live-game-team">
								<h1 class="no_margin"> ${currentGame.team1}</h1>
							</div>
							<div id="live-game-vs">
								<p> vs. </p>
							</div>
							<div class="live-game-team">
								<h1 class="no_margin"> ${currentGame.team2} </h1>
							</div>
						</div>
						<div class="live-game-stats">
							<div class="live-game-stats-team">
								<div class="stat-container">
									<div class="stat-item">
										<h2> Goals: ${currentGame.team1Goals} </h2>
										<ul>
											<li>Shots on Goal: ${currentGame.team1Shots}</li>
											<li>Corner Kicks: ${currentGame.team1Corners} </li>
											<li>Goal Kicks: ${currentGame.team1GoalKicks}</li>
										</ul>
									</div>
									<div class="stat-item">
										<h2> Cards </h2>
										<ul>
											<li> Yellow: ${currentGame.team1YellowCards} </li>
											<li> Red: ${currentGame.team1RedCards} </li>
										</ul>
									</div>
								</div>
							</div>
							<div class="live-game-stats-team">
								<div class="stat-container">
									<div class="stat-item">
										<h2> Goals: ${currentGame.team2Goals} </h2>
										<ul>
											<li>Shots on Goal: ${currentGame.team2Shots}</li>
											<li>Corner Kicks: ${currentGame.team2Corners} </li>
											<li>Goal Kicks: ${currentGame.team2GoalKicks}</li>
										</ul>
									</div>
									<div class="stat-item">
										<h2> Cards </h2>
										<ul>
											<li> Yellow: ${currentGame.team2YellowCards} </li>
											<li> Red: ${currentGame.team2RedCards} </li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="event-feed-button button text_align_center">
						<button id="goEventFeed-button">Go To Event</button>
						</div>
					</main>`;

<<<<<<< HEAD
		//insert html into the game page and display it
		gamePage.innerHTML = markup;
		gamePage.classList.remove('hidden');
		};

		function renderEventPage(e){
			var schedule = document.querySelector('.schedule');
			var gamePage = document.getElementById('gamePage-view');
			var eventPage = document.getElementById('eventPage-view');

			gamePage.classList.add('hidden');
			let markup = `<main class="margin_center">	<section class="add-event">
					<h1> Add Event </h1>
					<button id="returnToSchedule-button"> Return to Schedule </button>
					<form id="event-form">
						<select form="event-form" name="event-type" id="event-type-selection">
							<option value="Goal Attempt"> Goal Attempt</option>
							<option value="Corner Kick"> Corner Kick</option>
							<option value="Goal Kick"> Goal Kick</option>
							<option value="Yellow Card"> Yellow Card</option>
							<option value="Red Card"> Red Card</option>
						</select>
						<select form="team-form" name="team-type" id="team-type-selection">
							<option value="${mainGame.team1}">${mainGame.team1}</option>
							<option value="${mainGame.team2}">${mainGame.team2}</option>
						</select>
						<input type="number" name="player-number" placeholder="Enter Player #" id="playerNumber-input">
						<button class="form-button" type="submit" id="addEvent-button">Add Event</button>
					</form>
				</section>
				</main>`;
			eventPage.innerHTML = markup;
			eventPage.classList.remove('hidden');
		}

		function addEvent(e){
			e.preventDefault();
			const playerNumberInput = document.getElementById('playerNumber-input');
			const eventSelect = document.getElementById('event-type-selection');
			const teamSelect = document.getElementById('team-type-selection');
			const eventValue = eventSelect.options[eventSelect.selectedIndex].value;
			const teamValue = teamSelect.options[teamSelect.selectedIndex].value;
			const inputs = document.getElementsByTagName('input');

			if(checkEmptyInput(inputs)){
				var newEvent = {
					"playerNumber": playerNumberInput.value,
					"event": eventValue,
					"team": teamValue
				};
			}

			let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
			var teamChoice = (newEvent.team == mainGame.team1);

			for (var i = 0; i < (Object.keys(schedule)).length; i++) {
				if(  (scheduleCopy[i]).date == mainGame.date) {
					if(teamChoice){
						if(eventValue == "Goal Attempt"){
							scheduleCopy[i].team1GoalKicks += 1;
						}	else if(eventValue == "Corner Kick"){
							scheduleCopy[i].team1Corners += 1;
						} else if(eventValue == "Yellow Card"){
							scheduleCopy[i].team1YellowCards += 1;
						} else if(eventValue == "Red Card"){
							scheduleCopy[i].team1RedCards += 1;
						}
					} else {
						if(eventValue == "Goal Attempt"){
							scheduleCopy[i].team2GoalKicks += 1;
						}	else if(eventValue == "Corner Kick"){
							scheduleCopy[i].team2Corners += 1;
						} else if(eventValue == "Yellow Card"){
							scheduleCopy[i].team2YellowCards += 1;
						} else if(eventValue == "Red Card"){
							scheduleCopy[i].team2RedCards += 1;
						}
					}
				}
			}

			localStorage.setItem('schedule', JSON.stringify(scheduleCopy));
			renderEventPage(e);
		}

		function checkEmptyInput(arr){
			console.log('checking for empty inputs');
			var isFilled = true;
			for(var i = 0; i < arr.length; i++){
				if(arr[i].value === ""){
					console.log('something is empty');
					isFilled = false;
					arr[i].style.border = "2px solid red";
				}
			}
			return isFilled;
		}

		function returnToSchedule(){
			var views = document.body.querySelectorAll(".view");
			//show the schedule container
			var schedule = document.querySelector('.schedule');
			schedule.classList.remove('hidden');
			views.forEach(e => {
				if (e.firstChild) {
					e.removeChild(e.firstChild);
				}
			});
		}

=======
		let markup = schedule.map(game =>`<a href="./liveGame.html" class="large_button"><p>${game.date} ${game.team1} vs. ${game.team2}</p></a>`).join('');
		t.content.querySelector('#schedule-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		document.querySelector('#view').appendChild(clonedTemplate);
	});
>>>>>>> 37521947bc2eb74b7c66fe8faf994c98ee85bcb4
});
