/**
 * 
 * @param {Document} doc 
 * @param {string} name 
 * @param {any} value 
 * @param {number} days 
 */
const setCookie = (doc, name, value, days) => {
	let expires = "";

	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}

	doc.cookie = `${name}=${value || ""}${expires}; path=/; samesite:none`;
}

/**
 * 
 * @param {Document} doc 
 * @param {string} name 
 * @returns 
 */
const getCookie = (doc, name) => {
	let nameEQ = name + "=";
	let ca = doc.cookie.split(";");

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	
	return null;
}

/**
 * 
 * @param {Window} win
 * @param {boolean} bool
 */
const toggleBGMode = (win, bool) => {
	let winDocElem = win.document.documentElement;

	if (bool) {
		winDocElem.style.setProperty("--bg", "#000");
		winDocElem.style.setProperty("--text", "#fff");
		winDocElem.style.setProperty("--box-shadow", "rgba(255, 255, 255, 0.1) 0px 4px 16px, rgba(255, 255, 255, 0.1) 0px 8px 24px, rgba(255, 255, 255, 0.1) 0px 16px 56px");
	} else {
		winDocElem.style.setProperty("--bg", "#fff");
		winDocElem.style.setProperty("--text", "#000");
		winDocElem.style.setProperty("--box-shadow", "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px");
	}
}

/**
 * 
 * @param {Window} win
 */
const isBGModeToggled = (win) => {
	return win.getComputedStyle(win.document.documentElement).getPropertyValue("--bg") == "#000"
}

window.setCookie = setCookie;
window.getCookie = getCookie;
window.toggleBGMode = toggleBGMode;
window.isBGModeToggled = isBGModeToggled;
