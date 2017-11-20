window.addEventListener("DOMContentLoaded", function(event) {
	const locationInput = document.getElementById('location');
  const opponentInput = document.getElementById('opponent');
	const dateInput = document.getElementById('date');
	const timeInput = document.getElementById('time');
	const signUpButton = document.getElementById('signUp-button');

  var inputs = document.getElementsByTagName('input');

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
    console.log(isFilled);
		return isFilled;
	}

	function submitInfo(e){
		e.preventDefault();
    console.log(inputs);
		if(checkEmptyInput(inputs)){
			var location = inputs.location;
			var date = inputs.dateInput;
			var time = inputs.timeInput;
      var opponent = inputs.opponentInput;
      console.log(location, date, time, opponent);
			//window.location.href = "./schedule.html";
		}
	}

	signUpButton.addEventListener('click', submitInfo);

});
