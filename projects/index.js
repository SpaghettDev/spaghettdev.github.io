const showErrorPopup =  () => {
	document.getElementById("alert-button").style.display = "";
	document.getElementById("alert-button").checked = false;
	document.getElementsByClassName("alert-parent")[0].style.display = "block";
}

const getRepoData = async (projectLink) => {
	return fetch(projectLink.replace("github.com", "api.github.com/repos"))
		.then(res => res.json())
		.then(res => res)
		.catch(e => {});
}

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

				nodeContent[i].childNodes[1].textContent = "...";
				let fetchedValue = "...";
				const response = await getRepoData(project["project_link"]);

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
