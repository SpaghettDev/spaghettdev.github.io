const toggleBGMode = () => {
  if (document.body.style.backgroundColor == "black") {
    document.body.style.backgroundColor = "white";
  } else {
    document.body.style.backgroundColor = "black";
  }
}

toggleBGMode()