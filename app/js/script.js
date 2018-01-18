const form = document.forms[0]
var them = []
var assigned = false

var players = [{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false},
{name: "he", isAlive: true, isDetective: false, isMafia: false, isDoctor: false}]

function startGame() {
	// socket.on("start", function(players) {
	// 	localStorage.players = JSON.stringify(players)
	// 	localStorage.night = "true"
	console.log("game stated")
	makeYou()
	makeThem()

	// })
}


function register2(){
	//Opening code with setup for getting ids and access
	socket = io.connect("http://localhost:5000")
	socket.on("id", function (data) {
		console.log("id received")
		if(!assigned){
			id = data;
			var nick = form.nickname.value
			localStorage.id = id
			assigned = true;
			socket.emit("name", {name: nick})
			// socket.on(id.toString(), function (data){
			// 	if(data == "mafia"){
			// 		isMafia = true
			// 	}
			// 	if(data == "doctor"){
			// 		isDoctor = true
			// 	}
			// 	if(data == "detective"){
			// 		isDetective = true
			// 	}
			// })
			console.log(id)
			window.location = '/room'
			startGame()
		}
	socket.on("update", function(players) {
				localStorage.players = JSON.stringify(players)
				makeYou()
				makeThem()
				if (localStorage.night === "true") {
					localStorage.night = "false"
					toDay()
				}
				else{
					localStorage.night = "true"
					toNight()
				}
			})	
	})

}

function toDay() {
	document.body.style.backgroundColor = "teal"
	voteOn()
}

function toNight() {
	document.body.style.backgroundColor = "black"
	players = JSON.parse(localStorage.players)
	if (players[localStorage.id.parseInt()].isDetective) {
		alert("Choose Player to Reveal")
		detectOn()
	}
	else if (players[localStorage.id.parseInt()].isMafia) {
		alert("Choose Player to Kill")
		murderOn()
	}
	else if (players[localStorage.id.parseInt()].isDoctor) {
		alert("Choose Player to Save")
		healOn()
	}
	else {
		alert("Wait for Night to End")
	}
	
}

function makeYou() {
	//players = JSON.parse(localStorage.players)
	var currentUser = players[localStorage.id.parseInt()]
	if (currentUser.isAlive === false) {
		document.getElementById("your_icon_img").src = '/img/dead.png'
	}
	else if (currentUser.isMafia === true) {
		document.getElementById("your_icon_img").src = '/img/mafia.png'
	}
	else if (currentUser.isDetective === true) {
		document.getElementById("your_icon_img").src = '/img/detective.png'
	}
	else if (currentUser.isDoctor === true) {
		document.getElementById("your_icon_img").src = '/img/doctor.png'
	}
	else {
		document.getElementById("your_icon_img").src = '/img/innocent.png'
	}
	
}

function makeThem() {
	//players = JSON.parse(localStorage.players)
	them = JSON.parse(players).slice()
	them.splice(localStorage.id.parseInt(),1)
	for (var l = 0; l < 9; l++) {
		if (them[i].isAlive === false) {
			document.getElementById("icon_user_" + (j+2).toString()).src = '/img/dead.png'
		}
		else if (players[localStorage.id.parseInt()].isMafia === true && them[i].isMafia === true) {
			document.getElementById("icon_user_" + (j+2).toString()).src = '/img/mafia.png'
		}
		else {
			document.getElementById("icon_user_" + (j+2).toString()).src = '/img/innocent.png'
		} 
		document.getElementById("name_user_" + (j+2).toString()).innerHTML = them[i].name
	}
}

function hello() {
	console.log('hello')
}

function detectOn() {
	for (var j = 0; j < 9; j++) {
		if (them[i].isAlive === true) {
			document.getElementById("icon_user_" + (j+2).toString()).onclick = detect.bind(null, j)
		}
	}
}

function voteOn() {
	for (var j = 0; j < 9; j++) {
		if (them[i].isAlive === true) {
			document.getElementById("icon_user_" + (j+2).toString()).onclick = vote.bind(null, j)
		}
	}
}

function murderOn() {
	for (var j = 0; j < 9; j++) {
		if (them[i].isAlive === true) {
			document.getElementById("icon_user_" + (j+2).toString()).onclick = murder.bind(null, j)
		}
	}
}

function healOn() {
	for (var j = 0; j < 9; j++) {
		if (them[i].isAlive === true) {
			document.getElementById("icon_user_" + (j+2).toString()).onclick = heal.bind(null, j)
		}
	}
}

function detect(index) {
	console.log('them[index] ', them, index)
	if (them[index].isMafia === true) {
		document.getElementById("icon_user_" + (index+2).toString()).src =  '/img/mafia.png'
	}
	else if (them[index].isDoctor === true) {
		document.getElementById("icon_user_" + (index+2).toString()).src =  '/img/doctor.png'
	}
	else{
		document.getElementById("icon_user_" + (index+2).toString()).src =  '/img/none.png'
	}
	for (var k = 1; k < 10; k++) {
		document.getElementById("icon_user_" + (k+1).toString()).onclick = null
	}
}

function vote(index) {
	for (var k = 1; k < 10; k++) {
		document.getElementById("icon_user_" + (k+1).toString()).onclick = null
	}
}

function murder(index) {
	
	for (var k = 1; k < 10; k++) {
		document.getElementById("icon_user_" + (k+1).toString()).onclick = null
	}	
}

function heal(index) {
	
	for (var k = 1; k < 10; k++) {
		document.getElementById("icon_user_" + (k+1).toString()).onclick = null
	}	
}







