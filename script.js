import { fecthDataFromAPI } from "./api/api.service.js";

let items = [];

const shopListDOM = document.getElementById("listId");
function printList() {
  shopListDOM.innerHTML = "";
  for (let item of items) {
    shopListDOM.innerHTML += `<li><label><input onchange="checkedItem('${
      item.name
    }') " type="checkbox" ${item.isBought ? "checked" : ""}/><span class="${
      item.isBought ? "textSpan" : ""
    }"> ${item.name} </span></label><span onclick="deleteItemFromList('${
      item.name
    }')" class="item-delete-btn">x</span> </li>`;
  }
}

function checkedItem(itemName) {
  for (let item of items) {
    if (item.name == itemName) {
      item.isBought = !item.isBought;
    }
  }
  printList();
}

function deleteItemFromList(itemName) {
  const filterItems = [];
  for (let item of items) {
    if (item.name != itemName) {
      filterItems.push(item);
    }
  }
  items = filterItems;
  printList();
}

function capitalizerFirst(text) {
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);
  return firstLetter.toUpperCase() + rest.toLowerCase();
}

function addItemToList() {
  const inputDOM = document.getElementById("inputId");
  const newItemName = inputDOM.value.trim();
  inputDOM.value = "";

  //Guard
  if (!newItemName) {
    alert("debes introducir algo");
    return;
  }

  if (newItemName.length >= 25) {
    alert("Mucho Texto");
    return;
  }

  for (const item of items) {
    if (item.name.toLowerCase() == newItemName.toLowerCase()) {
      alert("El producto ya está en la lista");
      return;
    }
  }

  const newItem = {
    name: capitalizerFirst(newItemName),
    isBought: false,
  };

  items.push(newItem);
  printList();
}

//Función principal - Aquí empieza la aplicación
async function main() {
  items = await fecthDataFromAPI();
  printList();
}

main();
window.addItemToList = addItemToList;
window.deleteItemFromList = deleteItemFromList;
window.checkedItem = checkedItem;
