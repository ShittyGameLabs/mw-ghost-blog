"use strict";

/**
 * event listener for resizing window to remove sidebar, can be expanded out to add navigation functionality and animation.
 */
window.onload = function() {
//   console.log("loaded");
  window.addEventListener("resize", () => {
    const nav = document.getElementsByClassName("nav")[0];
    const main = document.getElementById("content");
    //   console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      nav.style.display = "none";
      main.style.width = "100vw";
    } else {
      nav.style.display = "block";
      main.style.width = "calc(100vw - 300px)"
    }
  });
};
