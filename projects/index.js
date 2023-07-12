/**
 * Shows the error popup, pretty amazing
 */
const showErrorPopup = () => {
	document.getElementById("alert-button").style.display = "";
	document.getElementById("alert-button").checked = false;
	document.getElementsByClassName("alert-parent")[0].style.display = "block";
}

/**
 * Gets a repo's data from api.github.com, if already fetched within a day, returns
 * the cached version
 * 
 * @param {Object} project 
 * @returns {Object}
 */
const getRepoData = async (project) => {
	const localValue = getLocalStorage(window, `cookie_${project["project_name"]}`);
	if (localValue != null) {
		return localValue;
	}

	return fetch(project["project_link"].replace("github.com", "api.github.com/repos"))
		.then(res => res.json())
		.then(res => {
			if (res && Object.keys(res).length < 3) {
				return {};
			}

			setLocalStorage(window, `cookie_${project["project_name"]}`, res, 1);
			return res;
		})
		.catch(e => {});
}

/**
 * Creates a new project box using the project argument as base for the placeholders
 * 
 * @param {object} project 
 * @returns {Node}
 */
const createProjectBox = async (project) => {
	const node = document.getElementsByClassName("project-box-wrapper")[0].cloneNode(true);
	const nodeContent = node.childNodes[1].childNodes[1].childNodes;

	for (let i = 0; i < nodeContent.length; i++) {
		if (nodeContent[i].nodeName == "A") {
			nodeContent[i].href = project["project_link"];
			continue;
		}

		const nodeContentText = nodeContent[i].textContent;

		if (nodeContentText) {
			if (nodeContentText.includes("gh_")) {
				const splitText = nodeContentText.split(/[\{\}]/);

				let fetchedValue = "...";
				nodeContent[i].childNodes[1].textContent = fetchedValue;
				const response = await getRepoData(project);

				if (!response || Object.keys(response).length === 0) {
					showErrorPopup();
				} else {
					switch (splitText[1]) {
						case "gh_size":
							fetchedValue = `${parseInt(response[splitText[1].replace("gh_", "")]) / 1000} MBs`;
							break;
						default:
							fetchedValue = response[splitText[1].replace("gh_", "")];
					}
				}

				nodeContent[i].childNodes[1].textContent = fetchedValue;
				continue;
			}

			const splitText = nodeContentText.split(/[\{\}]/);
			let newText = "";

			for (let l = 0; l < splitText.length; l++) {
				newText += project[splitText[l]] || splitText[l];
			}

			if (nodeContent[i].childNodes.length > 1)
				nodeContent[i].childNodes[1].textContent = newText;
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


fetch("/api/projects/projects.json")
	.then(r => r.json())
	.then(async (projects) => {
		for (let i = 0; i < projects["new"].length; i++) {
			document.getElementsByClassName("projects-container")[0].appendChild(
				await createProjectBox(projects["new"][i])
			);
		}

		for (let i = 0; i < projects["old"].length; i++) {
			document.getElementsByClassName("projects-container")[1].appendChild(
				await createProjectBox(projects["old"][i])
			);
		}
	});


document.getElementById("alert-button").onclick = () => {
	document.getElementById("alert-button").style.display = "none";
	document.getElementById("alert-svg").style.display = "none";
};
