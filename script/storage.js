"use strict";

//SAVE PET TO LOCAL STORAGE
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//GET PET FORM LOCAL STORAGE
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//DISPLAY PET TO TABLE
function displayPet(petArr) {
  renderTableData(petArr);
}

//DISPLAY GREED TO TABLE
function displayBreed(breedArr) {
  renderBreedTable(breedArr);
}
