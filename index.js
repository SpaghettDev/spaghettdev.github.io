if (getCookie(document, "bg") == null) {
	setCookie(document, "bg", "on");
} else {
	toggleBGMode(window, isBGModeToggled(window));
	setCookie(document, "bg", isBGModeToggled(window) ? "on" : "off");
}
