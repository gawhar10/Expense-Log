const getInputvalues = () => {
  const itemName = document.querySelector("#itemName");
  const itemCost = document.querySelector("#itemCost");
  const listItem = { itemName: itemName.value, itemCost: itemCost.value };
  return listItem;
};

const liForList = (itemName, itemPrice) => {
  const list = document.querySelector("#logList");
  const li = document.createElement("li");
  const removeBtn = document.createElement("button");
  const removeIcon = document.createElement("img");
  removeIcon.src = "./img/remove.png";
  removeIcon.classList.add("remove_icon");
  removeBtn.classList.add("remove_btn");
  removeBtn.append(removeIcon);
  li.innerHTML = `${itemName} ${itemPrice} `;
  li.append(removeBtn);
  list.appendChild(li);
};

const summery = () => {
  let logList = document.querySelector("#logList").children;
  /* To convert HTMLCollections into array. */
  logList = Array.from(logList);
  let totalItems = 0;
  let totalSpent = 0;
  const itemInfoArr = [];
  logList.forEach((item) => {
    /* .split() method to split array. you can pass space or whatever to split. */
    const itemInfo = item.innerHTML.split(" ");
    totalItems += 1;
    totalSpent += Number(itemInfo[1]);
    const tempArr = [itemInfo[0], itemInfo[1]];
    itemInfoArr.push(tempArr);
  });
  document.querySelector("#totalItems").innerHTML = totalItems;
  document.querySelector("#totalSpent").innerHTML = `${totalSpent}`;
  localStorage.setItem("itemInfo", JSON.stringify(itemInfoArr));
};

const createListFromLocalStorage = () => {
  const itemInfoArr = JSON.parse(localStorage.getItem("itemInfo"));
  if (itemInfoArr) {
    let totalItems = 0;
    let totalSpent = 0;
    itemInfoArr.forEach((item) => {
      liForList(item[0], item[1]);
      totalItems += 1;
      totalSpent += Number(item[1]);
    });
    document.querySelector("#totalItems").innerHTML = totalItems;
    document.querySelector("#totalSpent").innerHTML = `${totalSpent}`;
  }
};

createListFromLocalStorage();

document.querySelector("#saveInput").addEventListener("click", (event) => {
  event.preventDefault();
  const listItem = getInputvalues();
  if (listItem.itemName === "" || listItem.itemCost === "") {
    const warningMsg = document.querySelector("#warningMsg");
    warningMsg.innerHTML = "Invalid Name or Cost!";
    setTimeout(() => {
      warningMsg.innerHTML = "";
    }, 3000);
  } else {
    document.querySelector("#itemName").value = "";
    document.querySelector("#itemCost").value = "";
    liForList(listItem.itemName, listItem.itemCost);
    summery();
  }
});

document.querySelector("#logList").addEventListener("click", (event) => {
  const el = event.target;
  if (el.classList.contains("remove_btn")) {
    el.parentElement.remove();
    summery();
  } else if (el.classList.contains("remove_icon")) {
    el.parentElement.parentElement.remove();
    summery();
  }
});

document.querySelector("#clearAll").addEventListener("click", (event) => {
  let logList = document.querySelector("#logList").children;
  logList = Array.from(logList);
  // console.log(logList);
  logList.forEach((node) => {
    node.remove();
  });
  localStorage.removeItem("itemInfo");
  document.querySelector("#totalItems").innerHTML = "0";
  document.querySelector("#totalSpent").innerHTML = "0.0";
});
