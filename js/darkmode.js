function setStyles() {
  if (localStorage.getItem("darkmode") == "true") {
    document.getElementById("theme").href = "css/darkmode.css";
  } else {
    document.getElementById("theme").href = "css/lightmode.css";
  }
}
function enableButton() {
  const checkbox = document.getElementById("darkmode-toggle");
  if (localStorage.getItem("darkmode") == "true") {
    checkbox.checked = true;
    setStyles();
  }
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      localStorage.setItem("darkmode", "true");
      setStyles();
    } else {
      localStorage.setItem("darkmode", "false");
      setStyles();
    }
  });
}
