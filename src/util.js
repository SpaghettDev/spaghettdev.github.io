const toggleBGMode = (doc) => {
	if (doc.body.style.backgroundColor == "black") {
		doc.body.style.backgroundColor = "white";
	} else {
		doc.body.style.backgroundColor = "black";
	}
}

const isBGModeToggled = (doc) => {
	return doc.body.style.backgroundColor == "black";
}

const setCookie = (doc, name, value, days) => {
	var expires = "";

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}

	doc.cookie = `${name}=${value || ""}${expires}; path=/; samesite:none`;
}

const getCookie = (doc, name) => {
	var nameEQ = name + "=";
	var ca = doc.cookie.split(";");

	for (let i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}

	return null;
}


window.toggleBGMode = toggleBGMode;
window.isBGModeToggled = isBGModeToggled;
window.setCookie = setCookie;
window.getCookie = getCookie;
