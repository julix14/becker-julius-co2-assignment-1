const checkbox = document.getElementById("darkmode-toggle");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    document.body.style.backgroundColor = "#171a21";
    document.body.style.color = "#fcfaf9";
  } else {
    document.body.style.backgroundColor = "#fcfaf9";
    document.body.style.color = "#171a21";
  }
});
