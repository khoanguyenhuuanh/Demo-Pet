"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitButton = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const sidebarEl = document.getElementById("sidebar");

//ANIMATION SIDEBAR
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

const breedArr =
  JSON.parse(getFromStorage("breeds")) === null
    ? []
    : JSON.parse(getFromStorage("breeds"));

//DISPLAY BREED
displayBreed(breedArr);

// DELETE BREED
function deleteBreed(breed) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedArr[i].number === breed.number) {
        breedArr.splice(i, 1);
        renderBreedTable(breedArr);
        saveToStorage("breeds", JSON.stringify(breedArr));
        break;
      }
    }
  }
}

// CREATE TABLE BREED
function renderBreedTable(breedArr) {
  //INIT TABLE PET
  tableBodyEl.innerHTML = "";
  //INIT ROW
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    breedArr[i].number = i + 1;
    //INIT CELL FOR ROW
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("td");

      switch (j) {
        case 0:
          cell.innerHTML = breedArr[i].number;
          break;
        case 1:
          cell.innerHTML = breedArr[i].breedName;
          break;
        case 2:
          cell.innerHTML = breedArr[i].typePet;
          break;
        case 3:
          let btn = document.createElement("button");
          btn.textContent = "Delete";
          btn.classList.add("btn");
          btn.classList.add("btn-danger");
          cell.appendChild(btn);
          btn.addEventListener("click", function () {
            deleteBreed(breedArr[i]);
          });
          break;
      }
      row.appendChild(cell);
    }
    tableBodyEl.appendChild(row);
  }
}

//VALIDATE DATA BREED
const validateDataBreed = function (dataBreed) {
  for (let i = 0; i < breedArr.length; i++) {
    if (dataBreed.breedName === breedArr[i].breedName) {
      const checkRepeat = "Breed already exists!";
      alert(checkRepeat);
      return false;
    }
  }
  if (dataBreed.breedName === "" || dataBreed.typePet === "Select Type") {
    const requiredBreedName = "Please input your breed name!";
    const requiredTypePet = "Please chose your type pet!";
    if (dataBreed.breedName === "") {
      alert(requiredBreedName);
    } else if (dataBreed.typePet === "Select Type") {
      alert(requiredTypePet);
    }
    return false;
  } else {
    return true;
  }
};

//EVENT WHEN CLICK SUBMIT
submitButton.addEventListener("click", function () {
  const dataBreed = {
    number: 0,
    breedName: breedInput.value,
    typePet: typeInput.value,
  };

  if (validateDataBreed(dataBreed)) {
    breedArr.push(dataBreed);
    renderBreedTable(breedArr);
    saveToStorage("breeds", JSON.stringify(breedArr));
    console.log(breedArr);
  }
});
