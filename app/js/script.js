const form = document.forms[0]

function makeYou() {
	document.getElementById("your_icon_img").src = '/img/innocent.png'
	document.getElementById("your_icon_img").src =  '/img/mafia.png'
}

function makeThem() {
	for (var i = 1; i < 10; i++) {
		document.getElementById("icon_user_" + (i+1).toString()).src = '/img/innocent.png'
		document.getElementById("icon_user_" + (i+1).toString()).src =  '/img/mafia.png'
	}
}