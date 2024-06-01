let nameInput = document.querySelector("#bookmarkName");
let urlInput = document.querySelector("#bookmarkURL");
let boxModal = document.querySelector(".box-info");
let modal = document.querySelector(".modal");
let closeBtn = document.getElementById("closeBtn");

let n = 0;
let arrUrl = [];
if (localStorage.getItem("url")) {
  arrUrl = JSON.parse(localStorage.getItem("url"));
  display(arrUrl);
}
function addUlr(index) {
  if (validationInput(nameInput) && validationInput(urlInput)) {
    let detailsUrl = {
      nameWebsite: nameInput.value,
      urlWebsite: urlInput.value,
    };
    arrUrl.push(detailsUrl);
    localStorage.setItem("url", JSON.stringify(arrUrl));
    display(arrUrl);
    clearInputs();
  } else {
    boxModal.classList.remove("d-none");
    // alert("Invalid input");
  }
}
function display(arr) {
  let tr = "";
  for (let i = 0; i < arr.length; i++) {
    tr += `
          <tr>
            <th>${i + 1}</th>
            <td>${arr[i].nameWebsite}</td>
            <td>
              <a href="${
                arr[i].urlWebsite
              }" target="_blank" class="btn btn-visit text-center">
                <i class="fa-solid fa-eye pe-2"></i> Visit
              </a>
            </td>
            <td class="actions-column">
              <button class="btn btn-danger btn-delete" onclick="deleteRow(${i})">
                <i class="fa-solid fa-trash-can pe-2"></i> Delete
              </button>
            </td>
            <td>
            <button class="btn btn-primary btn-update" onclick="upDateInput(${i})">
            <i class="fa-solid fa-edit pe-2"></i> Update
          </button>
          </td>
          </tr>
    `;
  }
  document.querySelector("#tableBody").innerHTML = tr;
}

function clearInputs() {
  nameInput.value = "";
  urlInput.value = "";
}
function deleteRow(index) {
  arrUrl.splice(index, 1);
  localStorage.setItem("url", JSON.stringify(arrUrl));
  display(arrUrl);
}
function validationInput(index) {
  index.classList.add("is-invalid");
  let validation = {
    bookmarkName: /^[a-zA-Z\s]{4,}$/,
    bookmarkURL: /^(http|https):\/\/[^\s$.?#].[^\s]*$/,
  };
  if (index.value == "") {
    index.classList.remove("is-valid");
    index.classList.remove("is-invalid");
    index.classList.add("inputShadow");
    return false;
  } else if (validation[index.id].test(index.value)) {
    index.classList.add("is-valid");
    index.classList.remove("is-invalid");
    index.classList.remove("inputShadow");
    return true;
  } else {
    index.classList.remove("is-valid");
    index.classList.add("is-invalid");
    index.classList.remove("inputShadow");
    return false;
  }
}
function upDateInput(index) {
  n = index;
  nameInput.value = arrUrl[index].nameWebsite;
  urlInput.value = arrUrl[index].urlWebsite;
  document.querySelector("#addBookmark").classList.add("d-none");
  document.querySelector("#UpdateBookmark").classList.remove("d-none");
}
function upDateRow(index) {
  if (validationInput(nameInput) && validationInput(urlInput)) {
    arrUrl[n].nameWebsite = nameInput.value;
    arrUrl[n].urlWebsite = urlInput.value;
    localStorage.setItem("url", JSON.stringify(arrUrl));
    display(arrUrl);
    clearInputs();

    document.querySelector("#addBookmark").classList.remove("d-none");
    document.querySelector("#UpdateBookmark").classList.add("d-none");
  } else {
    alert("Invalid input");
  }
}

closeBtn.addEventListener("click", function () {
  boxModal.classList.add("d-none");
});
