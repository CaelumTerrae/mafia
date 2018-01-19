const form = document.forms[0]
var them = []
var assigned = false
var id
var night = false

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

var inProgress = false
var socket = null

function startGame() {
	//Opening code with setup for getting ids and access
	if (!inProgress) {
		socket = io.connect("http://localhost:5000")
		inProgress = true	
	}
	socket.on("id", function (data) {
		console.log("id received")
		if(!assigned){
			id = data;
			var nick = 'Noah'
			assigned = true;
			socket.emit("name", {nick: nick, id: id})
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
		makeYou()
		console.log("made them")
		makeThem()
		}
		socket.on("update", function(plays) {
			players = plays
			makeYou()
			makeThem()
				if (night === false) {
					toNight()
					night = true
				}
				else{
					toDay()
					night = false
				}
		})	
	})


}


function register2(){
	window.location = '/room'
}

function toDay() {
	document.body.style.backgroundColor = "teal"
	document.getElementById("task").innerHTML = "Choose Player to Lynch"
	voteOn()
}

function toNight() {
	document.body.style.backgroundColor = "black"
	if (players[id].isDetective) {
		document.getElementById("task").innerHTML = "Choose Player to Reveal" 
		detectOn()
	}
	else if (players[id].isMafia) {
		document.getElementById("task").innerHTML = "Choose Player to Kill"
		murderOn()
	}
	else if (players[id].isDoctor) {
		document.getElementById("task").innerHTML = "Choose Player to Save"
		healOn()
	}
	else {
		document.getElementById("task").innerHTML = "Wait for Night to End"
	}
	
}

function makeYou() {
	//players = JSON.parse(localStorage.players)
	var currentUser = players[id]
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
	them = players.slice()
	them.splice(id,1)
	for (var l = 0; l < 9; l++) {
		if (them[l].isAlive === false) {
			document.getElementById("icon_user_" + (l+2).toString()).src = '/img/dead.png'
		}
		else if (players[id].isMafia === true && them[l].isMafia === true) {
			document.getElementById("icon_user_" + (l+2).toString()).src = '/img/mafia.png'
		}
		else {
			document.getElementById("icon_user_" + (l+2).toString()).src = '/img/innocent.png'
		} 
		document.getElementById("name_user_" + (l+2).toString()).innerHTML = them[l].name
	}
}

function hello() {
	console.log('hello')
}

function detectOn() {
	for (var j = 0; j < 9; j++) {
		if (them[j].isAlive === true) {
			document.getElementById("icon_user_" + (j+2).toString()).onclick = detect.bind(null, j)
		}
	}
}

function voteOn() {
	console.log("voting on")
	for (var x = 0; x < 9; x++) {
		if (them[x].isAlive === true) {
			document.getElementById("icon_user_" + (x+2).toString()).onclick = vote.bind(null, x)
		}
	}
}

function murderOn() {
	for (var y = 0; y < 9; y++) {
		if (them[y].isAlive === true) {
			document.getElementById("icon_user_" + (y+2).toString()).onclick = murder.bind(null, y)
		}
	}
}

function healOn() {
	for (var z = 0; z < 9; z++) {
		if (them[z].isAlive === true) {
			document.getElementById("icon_user_" + (z+2).toString()).onclick = heal.bind(null, z)
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
	socket.emit("dayVote", {id: index})
	for (var k = 1; k < 10; k++) {
		document.getElementById("icon_user_" + (k+1).toString()).onclick = null
	}
}

function murder(index) {
	console.log("Tried to kill")
	socket.emit("mafiakill", {id: index})
	for (var k = 1; k < 10; k++) {
		document.getElementById("icon_user_" + (k+1).toString()).onclick = null
	}	
}

function heal(index) {
	socket.emit("heal", {id: index})
	for (var k = 1; k < 10; k++) {
		document.getElementById("icon_user_" + (k+1).toString()).onclick = null
	}	
}







