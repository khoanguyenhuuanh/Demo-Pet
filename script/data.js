"use strict";

const exportButton = document.getElementById("export-btn");
const importButton = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");
const sidebarEl = document.getElementById("sidebar");

//ANIMATION SIDEBAR
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

fileInput.addEventListener("click", function () {
  if (!fileInput.value.length) {
    return;
  }
});

const myJSON = getFromStorage("pets");
console.log(myJSON);

//SAVE DATA TO FILE
function saveDynamicDataToFile() {
  let blob = new Blob([myJSON], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "pet.json");
}

//IMPORT JSON
importButton.addEventListener("click", function (event) {
  event.preventDefault();
  let reader = new FileReader();
  reader.readAsText(fileInput.files[0]);
  reader.onload = (event) => {
    let str = event.target.result;
    saveToStorage("pets", str);
    alert("Import success!");
  };
});

//EXPORT DATA
exportButton.addEventListener("click", function () {
  saveDynamicDataToFile();
});
