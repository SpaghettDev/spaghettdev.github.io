let reqApi = window.location.href.split("/").slice(4);

switch (reqApi[0])
{
    case "?test":
        document.write("hello");
        document.close();
        break;
    default:
        document.write("-1");
        break;
}
