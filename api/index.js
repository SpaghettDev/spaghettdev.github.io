const redirect = (newLocation) => {
    window.location.href = newLocation;
}

const redirect404 = () => {
    window.location.href = "/404"
}


let reqApi = window.location.href.split("/");

if (reqApi.length > 1) {
    redirect404();
}

reqApi = reqApi.slice(4);

switch (reqApi[0])
{
    case "?test":
        redirect("/test");
        break;

    case "?projects":
        redirect("/api/projects/projects.json");
        break;

    default:
        redirect404();
        break;
}
