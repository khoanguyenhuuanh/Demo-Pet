"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const sidebarEl = document.getElementById("sidebar");
const formEl = document.getElementById("container-form");
const submitButton = document.getElementById("submit-btn");

//ANIMATION SIDEBAR
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

const petArr = JSON.parse(getFromStorage("pets"));
const breedArr = JSON.parse(getFromStorage("breeds"));

//SHOW TABLE EDIT PET
renderTableEdit(petArr);
//renderBreed(breedArr);

//START EDIT PET
function startEditPet(pet) {
  formEl.classList.remove("hide");
  idInput.value = pet.idPet;
  nameInput.value = pet.namePet;
  ageInput.value = pet.agePet;
  typeInput.value = pet.typePet;
  checkValueType();
  weightInput.value = pet.weightPet;
  lengthInput.value = pet.lengthPet;
  colorInput.value = pet.colorPet;
  breedInput.value = pet.breedPet;
  vaccinatedInput.checked = pet.vaccinatedPet;
  dewormedInput.checked = pet.dewormedPet;
  sterilizedInput.checked = pet.sterilizedPet;
}

//CREATE TABLE EDIT
function renderTableEdit(petArr) {
  //INIT TABLE PET
  tableBodyEl.innerHTML = "";
  //INIT ROW
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    //INIT CELL IN ROW
    for (let j = 0; j < 13; j++) {
      const cell = document.createElement("td");
      switch (j) {
        //CELL ID PET
        case 0:
          cell.innerHTML = petArr[i].idPet;
          cell.style.fontWeight = "bold";
          break;
        //CEL NAME PET
        case 1:
          cell.innerHTML = petArr[i].namePet;
          break;
        //CEL AGE PET
        case 2:
          cell.innerHTML = petArr[i].agePet;
          break;
        //CEL TYPE PET
        case 3:
          cell.innerHTML = petArr[i].typePet;
          break;
        //CEL WEIGHT PET
        case 4:
          cell.innerHTML = `${petArr[i].weightPet} kg`;
          break;
        //CEL LENGTH PET
        case 5:
          cell.innerHTML = `${petArr[i].lengthPet} cm`;
          break;
        //CELL BREED PET
        case 6:
          cell.innerHTML = petArr[i].breedPet;
          break;
        //CELL COLOR PET
        case 7:
          cell.classList.add("bi");
          cell.classList.add("bi-square-fill");
          cell.style.color = petArr[i].colorPet;
          break;
        //CEL VACCINATED PET
        case 8:
          cell.classList.add("bi");
          if (petArr[i].vaccinatedPet) {
            cell.classList.add("bi-check-circle-fill");
            cell.style.color = "green";
          } else {
            cell.classList.add("bi-x-circle-fill");
            cell.style.color = "red";
          }
          break;
        //CEL DEWORMED PET
        case 9:
          cell.classList.add("bi");
          if (petArr[i].dewormedPet) {
            cell.classList.add("bi-check-circle-fill");
            cell.style.color = "green";
          } else {
            cell.classList.add("bi-x-circle-fill");
            cell.style.color = "red";
          }
          break;
        //CEL STERILIZED PET
        case 10:
          cell.classList.add("bi");
          if (petArr[i].sterilizedPet) {
            cell.classList.add("bi-check-circle-fill");
            cell.style.color = "green";
          } else {
            cell.classList.add("bi-x-circle-fill");
            cell.style.color = "red";
          }
          break;
        //CEL DATE PET
        case 11:
          cell.innerHTML = petArr[i].datePet;
          break;
        //CEL BUTTON EDIT PET
        case 12:
          let btn = document.createElement("button");
          btn.textContent = "Edit";
          btn.classList.add("btn");
          btn.classList.add("btn-warning");
          cell.appendChild(btn);
          btn.addEventListener("click", function () {
            startEditPet(petArr[i]);
          });
          break;
      }
      row.appendChild(cell);
    }
    tableBodyEl.appendChild(row);
  }
}

//CREATE BREED PET
function renderBreed(breedArr) {
  breedInput.innerHTML = "";
  const optionSelectType = document.createElement("option");
  optionSelectType.innerHTML = "Select Breed";
  breedInput.appendChild(optionSelectType);
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = breedArr[i].breedName;
    breedInput.appendChild(option);
  }
}

const validateData = function (data) {
  // CHECK NAME PET
  if (data.namePet === "") {
    let requiredName = "Please input your Name Pet";
    alert(requiredName);
    return false;
  } // CHECK AGE PET
  else if (isNaN(data.agePet) || data.agePet > 15 || data.agePet < 1) {
    alert("Age must be between 1 and 15!");
    return false;
  } // CHECK WEIGHT PET
  else if (isNaN(data.weightPet) || data.weightPet > 15 || data.weightPet < 1) {
    alert("Weight must be between 1 and 15!");
    return false;
  } // CHECK LENGTH PET
  else if (
    isNaN(data.lengthPet) ||
    data.lengthPet > 100 ||
    data.lengthPet < 1
  ) {
    alert("Length must be between 1 and 100!");
    return false;
  } // CHECK TYPE PET
  else if (data.typePet === "Select Type") {
    alert("Please select Type!");
    return false;
  } // CHECK BREED PET
  else if (data.breedPet === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
};

//CREATE DATE PET
const createDate = function (dateData) {
  let date = String(dateData.getDate());
  date = date < 10 ? (date = `0${date}`) : date;
  let month = String(dateData.getMonth());
  month = month < 10 ? (month = `0${month}`) : month;
  const year = dateData.getFullYear();
  return `${date}/${month}/${year}`;
};

//EVENT WHEN CLICK SUBMIT
submitButton.addEventListener("click", function () {
  //GET DATA FORM INPUT
  const data = {
    idPet: idInput.value,
    namePet: nameInput.value,
    agePet: parseInt(ageInput.value),
    typePet: typeInput.value,
    weightPet: parseInt(weightInput.value),
    lengthPet: parseInt(lengthInput.value),
    colorPet: colorInput.value,
    breedPet: breedInput.value,
    vaccinatedPet: vaccinatedInput.checked,
    dewormedPet: dewormedInput.checked,
    sterilizedPet: sterilizedInput.checked,
    bmiPet: "?",
    datePet: createDate(new Date()),
  };

  //CHECK VALIDATE DATA INPUT
  if (validateData(data)) {
    for (let i = 0; i < petArr.length; i++) {
      if (data.idPet === petArr[i].idPet) {
        petArr[i] = data;
      }
    }
    saveToStorage("pets", JSON.stringify(petArr));
    renderTableEdit(petArr);
    formEl.classList.add("hide");
  }
});

//CHECK TYPE CAT
function isTypeCat(breed) {
  return breed.typePet === "Cat";
}

//CHECK TYPE DOG
function isTypeDog(breed) {
  return breed.typePet === "Dog";
}

//CHECK TYPE PET TO CREATE BREED PET
document.getElementById("input-type").onchange = function () {
  checkValueType();
};

//CHECK VALUE TYPE PET TO CREATE FRORM
function checkValueType() {
  if (typeInput.value === "Cat") {
    const typeBreed = JSON.parse(getFromStorage("breeds"));
    renderBreed(typeBreed.filter(isTypeCat));
  } else if (typeInput.value === "Dog") {
    const typeBreed = JSON.parse(getFromStorage("breeds"));
    renderBreed(typeBreed.filter(isTypeDog));
  }
}
