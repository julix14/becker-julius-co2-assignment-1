let slideIndex = 1;
function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  let i;
  let element = document.getElementsByClassName("content-block");
  if (n > element.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = element.length;
  }
  for (i = 0; i < element.length; i++) {
    element[i].style.display = "none";
  }
  element[slideIndex - 1].style.display = "flex";
}
