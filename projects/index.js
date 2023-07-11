const createProjectBox = (project) => {
	let node = document.getElementsByClassName("project-box-wrapper")[0].cloneNode(true);
	let nodeContent = node.childNodes[1].childNodes[1].childNodes;

	for (let i = 0; i < nodeContent.length; i++) {
		for (let j = 0; j < nodeContent.length; j++) {
			if (nodeContent[j].nodeName == "A") {
				nodeContent[j].href = project["project_link"];
				continue;
			}

			let nodeContentText = nodeContent[j].outerText;

			if (nodeContentText) {
	if (nodeContentText.includes("gh_")) {
		let splitText = nodeContentText.split(/[\{\}]/);

		// nodeContent[j].childNodes[1].textContent = "...";

		fetch(project["project_link"].replace("github.com", "api.github.com/repos"))
			.then(r => r.json())
			.then(r => {
				console.log(nodeContent[j].childNodes)
				switch (splitText[1]) {
					case "gh_size":
						nodeContent[j].childNodes[1].textContent = `${parseInt(r[splitText[1].replace("gh_", "")]) / 1000} MBs`;
						break;
					default:
						nodeContent[j].childNodes[1].textContent = r[splitText[1].replace("gh_", "")];
				}
			});
		continue;
	}

				let splitText = nodeContentText.split(/[\{\}]/);
				let newText = "";

				for (let l = 0; l < splitText.length; l++) {
					newText += project[splitText[l]] || splitText[l];
				}

				nodeContent[j].outerText = newText;
			}
		}
	}

	node.style.display = "flex";

	return node;
}

if (getCookie(document, "bg") == null) {
	setCookie(document, "bg", "on");
} else {
	toggleBGMode(window, isBGModeToggled(window));
	setCookie(document, "bg", isBGModeToggled(window) ? "on" : "off");
}

let projectBox = document.getElementsByClassName("project-box-content");
fetch("/api/projects/projects.json")
	.then(r => r.json())
	.then(projects => {
		for (let i = 0; i < projects["new"].length; i++) {
			document.getElementsByClassName("projects-container")[0].appendChild(createProjectBox(projects["new"][i]));
// 			for (let j = 0; j < projectBox.length; j++) {
// 				let elemCh = projectBox[j].childNodes;

// 				for (let k = 0; k < elemCh.length; k++) {
// 					if (elemCh[k].nodeName == "A") {
// 						elemCh[k].href = projects["new"][i]["project_link"];
// 						continue;
// 					}

// 					let elemChText = elemCh[k].outerText;

// 					if (elemChText) {
// 						if (elemChText.includes("gh_")) {
// 							let splitText = elemChText.split(/[\{\}]/);

// 							elemCh[k].childNodes[1].textContent = "...";

// 							fetch(projects["new"][i]["project_link"].replace("github.com", "api.github.com/repos"))
// 								.then(r => r.json())
// 								.then(r => {
// 									switch (splitText[1]) {
// 										case "gh_size":
// 											elemCh[k].childNodes[1].textContent = parseInt(r[splitText[1].replace("gh_", "")]) / 1000}
// 											break;
// 										default:
// 											elemCh[k].childNodes[1].textContent = r[splitText[1].replace("gh_", "")];
// 									}
// 								});
// 							continue;
// 						}

// 						let splitText = elemChText.split(/[\{\}]/);
// 						let newText = "";

// 						for (let l = 0; l < splitText.length; l++) {
// 							newText += projects["new"][i][splitText[l]] || splitText[l];
// 						}

// 						elemCh[k].outerText = newText;
// 					}
// 				}
// 			}
		}
	});
