"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const sidebarEl = document.getElementById("sidebar");
const findButton = document.getElementById("find-btn");

//ANIMATION SIDEBAR
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

const petArrSearch = [];
const petArr = JSON.parse(getFromStorage("pets"));
const breedArr = JSON.parse(getFromStorage("breeds"));
renderBreed(breedArr);
renderTableDataSearch(petArr);

function renderTableDataSearch(petArr) {
  //INIT TABLE PET
  tableBodyEl.innerHTML = "";
  //INIT ROW
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    //INIT CELL IN ROW
    for (let j = 0; j < 12; j++) {
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

const validateDataSearch = function (dataSearch) {
  let countID = 0;
  let countName = 0;
  let countType = 0;
  let countBreed = 0;
  let countVaccinated = 0;
  let countDewormed = 0;
  let countSterilezed = 0;
  for (let i = 0; i < petArr.length; i++) {
    //SEARCH ID
    if (dataSearch.idPet !== "") {
      if (petArr[i].idPet.includes(dataSearch.idPet)) {
        petArrSearch.push(petArr[i]);
        countID++;
      }
    } // SEARCH NAME
    if (dataSearch.namePet !== "") {
      if (
        petArr[i].namePet.search(new RegExp(dataSearch.namePet, "i")) !== -1
      ) {
        petArrSearch.push(petArr[i]);
        countName++;
      }
    } // SEARCH TYPE
    if (dataSearch.typePet !== "Select Type") {
      if (petArr[i].typePet.includes(dataSearch.typePet)) {
        petArrSearch.push(petArr[i]);
        countType++;
      }
    } // SEARCH BREED
    if (dataSearch.breedPet !== "Select Breed") {
      if (petArr[i].breedPet.includes(dataSearch.breedPet)) {
        petArrSearch.push(petArr[i]);
        countBreed++;
      }
    } // SEARCH VACCINATED
    if (dataSearch.vaccinatedPet) {
      if (petArr[i].vaccinatedPet) {
        petArrSearch.push(petArr[i]);
        countVaccinated++;
      }
    } // SEARCH DEWORMED
    if (dataSearch.dewormedPet) {
      if (petArr[i].dewormedPet) {
        petArrSearch.push(petArr[i]);
        countDewormed++;
      }
    } // SEARCH STERILIZED
    if (dataSearch.sterilizedPet) {
      if (petArr[i].sterilizedPet) {
        petArrSearch.push(petArr[i]);
        countSterilezed++;
      }
    }
  } // CHECK DATA
  if (petArrSearch.length === 0) {
    alert("No results found!");
    return false;
  } else if (
    (dataSearch.idPet !== "" && countID === 0) ||
    (dataSearch.namePet !== "" && countName === 0) ||
    (dataSearch.typePet !== "Select Type" && countType === 0) ||
    (dataSearch.breedPet !== "Select Breed" && countBreed === 0) ||
    (dataSearch.vaccinatedPet && countVaccinated === 0) ||
    (dataSearch.dewormedPet && countDewormed === 0) ||
    (dataSearch.sterilizedPet && countSterilezed === 0)
  ) {
    alert("No results found!");
    return false;
  } else {
    let current = null;
    let count = 0;
    let flag = [];
    for (let i = 0; i < petArrSearch.length; i++) {
      if (petArrSearch[i].idPet !== current) {
        if (count > 0) {
          const data = {
            flagCount: count,
            flagPet: petArrSearch[i - 1],
          };
          flag.push(data);
        }
        current = petArrSearch[i].idPet;
        count = 1;
      } else {
        count++;
      }
      if (count > 0 && i === petArrSearch.length - 1) {
        console.log(petArrSearch[i]);
        const data = {
          flagCount: count,
          flagPet: petArrSearch[i],
        };
        flag.push(data);
      }
    }
    findPet(flag);
    return true;
  }
};

function resetArray(petArrSearch) {
  const n = petArrSearch.length;
  for (let i = 0; i < n; i++) {
    petArrSearch.shift();
  }
}

function findPet(flag) {
  resetArray(petArrSearch);
  let max = flag[0].flagCount;
  for (let i = 0; i < flag.length; i++) {
    if (flag[i].flagCount > max) {
      max = flag[i].flagCount;
    }
  }
  for (let i = 0; i < flag.length; i++) {
    if (flag[i].flagCount === max) {
      petArrSearch.push(flag[i].flagPet);
    }
  }
}

//EVENT WHEN CLICK FIND BUTTON
findButton.addEventListener("click", function () {
  //GET DATA SEARCH FROM INPUT
  const dataSearch = {
    idPet: idInput.value,
    namePet: nameInput.value,
    typePet: typeInput.value,
    breedPet: breedInput.value,
    vaccinatedPet: vaccinatedInput.checked,
    dewormedPet: dewormedInput.checked,
    sterilizedPet: sterilizedInput.checked,
  };

  //CHECK VALIDATE DATA SEARCH
  if (validateDataSearch(dataSearch)) {
    renderTableDataSearch(petArrSearch);
    resetArray(petArrSearch);
  }
});
