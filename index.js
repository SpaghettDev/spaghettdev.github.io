if (getCookie(document, "bg") == null) {
	setCookie(document, "bg", "on");
} else {
	toggleBGMode(window, getCookie(document, "bg") == "on");
	setCookie(document, "bg", isBGModeToggled(window) ? "on" : "off");
}
