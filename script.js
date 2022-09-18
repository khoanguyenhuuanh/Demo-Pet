"use strict";

const submitButton = document.getElementById("submit-btn");
const healthyButton = document.getElementById("healthy-btn");
const bmiButton = document.getElementById("bmi-btn");
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

//ANIMATION SIDEBAR
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

let healthyPetArr = [];
let healthyCheck = false;

const petArr =
  JSON.parse(getFromStorage("pets")) === null
    ? []
    : JSON.parse(getFromStorage("pets"));

const breedArr = JSON.parse(getFromStorage("breeds"));

//DISPLAY PET
displayPet(petArr);

//CREATE BREED OPTION FORM
renderBreed(breedArr);

//VALIDATE PET
const validateData = function (data) {
  // CHECK EMPTY PET ARRAY TO APPLY LOOP
  for (let i = 0; petArr.length === 0 ? i < 1 : i < petArr.length; i++) {
    // CHECK ID
    if (petArr.length !== 0 ? data.idPet === petArr[i].idPet : false) {
      alert("ID must unique!");
      return false;
    } // REQUIRED INPUT ID & NAME
    else if (data.idPet === "" || data.namePet === "") {
      let requiredID = "Please input your ID Pet";
      let requiredName = "Please input your Name Pet";
      if (data.idPet === "") {
        alert(requiredID);
      } else {
        alert(requiredName);
      }
      return false;
    } // CHECK AGE PET
    else if (isNaN(data.agePet) || data.agePet > 15 || data.agePet < 1) {
      alert("Age must be between 1 and 15!");
      return false;
    } // CHECK WEIGHT PET
    else if (
      isNaN(data.weightPet) ||
      data.weightPet > 15 ||
      data.weightPet < 1
    ) {
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
  }
  return true;
};

//DELETE PET
function deletePet(pet) {
  //CONFIRM BEFORE DELETE
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (healthyCheck === false) {
        //DELETE IN SHOW ALL PET
        if (pet.idPet === petArr[i].idPet) {
          petArr.splice(i, 1);
          saveToStorage("pets", JSON.stringify(petArr));
          renderTableData(petArr);
        }
      } else {
        //DELETE IN HEALTHY PET
        if (pet.idPet === petArr[i].idPet) {
          petArr.splice(i, 1);
          healthyPetArr = petArr.filter(isHealthy);
          saveToStorage("pets", JSON.stringify(petArr));
          renderTableData(healthyPetArr);
        }
      }
    }
  }
}

// CREATE TABLE PET
function renderTableData(petArr) {
  //INIT TABLE PET
  tableBodyEl.innerHTML = "";
  //INIT ROW
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    //INIT CELL IN ROW
    for (let j = 0; j < 14; j++) {
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
        //CELL BMI PET
        case 11:
          cell.innerHTML = petArr[i].bmiPet;
          break;
        //CEL DATE PET
        case 12:
          cell.innerHTML = petArr[i].datePet;
          break;
        //CEL BUTTON DELETE PET
        case 13:
          let btn = document.createElement("button");
          btn.textContent = "Delete";
          btn.classList.add("btn");
          btn.classList.add("btn-danger");
          cell.appendChild(btn);
          btn.addEventListener("click", function () {
            deletePet(petArr[i]);
          });
          break;
      }
      row.appendChild(cell);
    }
    tableBodyEl.appendChild(row);
  }
}

//RESET INPUT WHEN SUBMIT
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//CHECK HEALTHY PET
function isHealthy(pet) {
  return (
    pet.vaccinatedPet === true &&
    pet.dewormedPet === true &&
    pet.sterilizedPet === true
  );
}

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
    petArr.push(data);
    saveToStorage("pets", JSON.stringify(petArr));
    clearInput();
    //SUBMIT WHEN SHOW HEALTHY PET OR SHOW ALL PET
    if (healthyCheck === true) {
      healthyPetArr = petArr.filter(isHealthy);
      renderTableData(healthyPetArr);
    } else {
      renderTableData(petArr);
    }
  }
});

//EVENT WHEN CLICK SHOW HEALTHY PET
healthyButton.addEventListener("click", function () {
  if (healthyCheck === false) {
    healthyCheck = true;
    healthyButton.textContent = "Show All Pet";
    healthyPetArr = petArr.filter(isHealthy); // FILTER HEALTHY PET FORM PET ARRAY
    renderTableData(healthyPetArr);
  } else {
    healthyCheck = false;
    healthyButton.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});

//EVENT WHEN CLICK CALCULATE BMI
bmiButton.addEventListener("click", function () {
  let bmi = 0;
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].typePet === "Dog") {
      bmi = (petArr[i].weightPet * 703) / petArr[i].lengthPet ** 2;
    } else {
      bmi = (petArr[i].weightPet * 886) / petArr[i].lengthPet ** 2;
    }
    petArr[i].bmiPet = bmi.toFixed(2);
  }
  saveToStorage("pets", JSON.stringify(petArr));
  //CALCULATE WHEN SHOW HEALTHY PET OR SHOW ALL PET
  if (healthyCheck === true) {
    healthyPetArr = petArr.filter(isHealthy);
    renderTableData(healthyPetArr);
  } else {
    renderTableData(petArr);
  }
});

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
  if (typeInput.value === "Cat") {
    renderBreed(breedArr.filter(isTypeCat));
  } else if (typeInput.value === "Dog") {
    renderBreed(breedArr.filter(isTypeDog));
  } else {
    renderBreed(breedArr);
  }
};
