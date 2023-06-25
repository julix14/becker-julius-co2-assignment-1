const checkbox = document.getElementById("darkmode-toggle");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    setDarkmodeStyle();
    localStorage.setItem("darkmode", "true");
  } else {
    setLightmodeStyle();
    localStorage.setItem("darkmode", "false");
  }
});

function setDarkmodeStyle() {
  document.body.style.backgroundColor = "#171a21";
  document.body.style.color = "#fcfaf9";
  const elements = document.querySelectorAll(
    ".left-zone, .right-zone, .carousel, .middle-border, .content-block"
  );

  for (let element of elements) {
    element.style.backgroundColor = "#171a21";
  }
}

function setLightmodeStyle() {}
