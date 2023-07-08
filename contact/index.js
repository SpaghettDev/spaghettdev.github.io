if (getCookie(document, "bg") == null) {
	setCookie(document, "bg", "on");
} else {
	toggleBGMode(window, isBGModeToggled(window));
	setCookie(document, "bg", isBGModeToggled(window) ? "on" : "off");
}

const contactMap = {
	"{email}": "spaghettdev@gmail.com",
	"{discord_og}": "SpaghettDev#4966",
	"{discord_alt}": "\"᲼᲼#3314\"",
	"{twitter}": "@SpaghettDev"
}

for (i = 0; i < document.getElementById("contact-info").childNodes.length; i++) {
	let span = document.getElementById("contact-info").childNodes[i];

	for (j = 0; j < span.childNodes.length; j++) {
		let text = span.childNodes[j].outerText;

		if (text) {
			if (text.match(/\{.*\}/g)) {
				document.getElementById("contact-info").childNodes[i].childNodes[j].outerText = text.replace(/\{(.*)\}/g, (m) => contactMap[m]);
			}
		}
	}
}
