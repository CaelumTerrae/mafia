var socket;
var id;
var assigned = false
var isMafia = false;
var isDoctor = false;
var isDetective = false;


function setup(nick){
	createCanvas(600, 400);
	background(51)
	//Opening code with setup for getting ids and access
	socket = io.connect("http://localhost:5000")

	socket.on("id", function (data) {
		if(!assigned){
			id = data;
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
		}
	})

}


