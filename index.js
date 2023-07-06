if (getCookie(document, "bg") == "black") {
	toggleBGMode(document);
}


document.getElementById("bg-btn").onclick = () => {
	toggleBGMode(document);
	setCookie(document, "bg", document.body.style.backgroundColor, 3652.5);
};

document.getElementById("home-btn").onclick = () => {
	window.location.replace("./index");
};
