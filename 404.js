if (getCookie(document, "bg") == null) {
	setCookie(document, "bg", "on");
} else {
	toggleBGMode(window, getCookie(document, "bg") == "on");
	setCookie(document, "bg", isBGModeToggled(window) ? "on" : "off");
}

document.getElementById("reason").outerText = `The requested resource doesn't exist. (${window.location.href.split("/").splice(3).join("")})`;
