let kitchenInput = document.getElementById("kitchen-input");
kitchenInput.focus();
let addBtn = document.getElementById("add-btn");
let kitchenItemsList = document.getElementById("kitchen-items-lists");

let kitchenInputData;
let kitchenInputDataArray = [];

// addBtn.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         addBtn.click(); // Using the reference directly
//     }
// });
// addBtn.addEventListener("keypress", function(event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//         addKitchenItems(); // Call the function directly
//     }
// });

function setLocalStorage() {
    localStorage.setItem("kitchenInput", JSON.stringify(kitchenInputDataArray));

}

function getLocalStorage() {

    if (localStorage.getItem("kitchenInput")) {
        kitchenInputDataArray = JSON.parse(localStorage.getItem("kitchenInput"));

        buildUI();

    }
}

function buildUI() {
    kitchenItemsList.textContent = '';
    var index = 0;
    kitchenInputDataArray.forEach(function(item) {
        //create Dom Elements
        let li = document.createElement("li");

        //for editing adding a span element under li
        let spanEle = document.createElement("span");
        spanEle.classList.add("li-edit", index);
        li.appendChild(spanEle);
        spanEle.innerText = item;


        // li.innerText = kitchenInputData;
        li.style.cssText = "animation-name: slideIn";
        kitchenItemsList.appendChild(li);
        kitchenInput.value = '';
        kitchenInput.focus();
        console.log(li);

        // trash button
        let trashBtn = document.createElement("i");
        trashBtn.classList.add("fa-solid", "fa-trash", index);
        li.appendChild(trashBtn);
        console.log(trashBtn);

        // trashBtn.addEventListener("click", deleteKitchenItems);

        // function deleteKitchenItems() {
        //     li.remove();

        // }

        //Create edit button

        let editBtn = document.createElement("i");
        editBtn.classList.add("fa-solid", "fa-pen-to-square", index++);
        li.appendChild(editBtn);

    });

}

//Step:-2
// create addKitchenItems function


function addKitchenItems() {

    kitchenInputData = kitchenInput.value;
    if (!kitchenInputData || kitchenInputData.trim() === "") {
        alert("INVALID INPUT!!!Enter some text");
        return;
    }
    if (kitchenInputDataArray.includes(kitchenInputData)) {
        alert("INPUT ALREADY EXIST!!!Enter another text");
        return;
    }
    kitchenInputDataArray.push(kitchenInputData);
    //set to local storage
    setLocalStorage();
    //get from local storage
    getLocalStorage();
    // console.log(kitchenInputData)

    // //create Dom Elements
    // let li = document.createElement("li");

    // //for editing adding a span element under li
    // let spanEle = document.createElement("span");
    // li.appendChild(spanEle);
    // spanEle.innerText = kitchenInputData;


    // // li.innerText = kitchenInputData;
    // li.style.cssText = "animation-name: slideIn";
    // kitchenItemsList.appendChild(li);
    // kitchenInput.value = '';
    // kitchenInput.focus();
    // console.log(li);

    // // trash button
    // let trashBtn = document.createElement("i");
    // trashBtn.classList.add("fa-solid", "fa-trash");
    // li.appendChild(trashBtn);
    // console.log(trashBtn);

    // // trashBtn.addEventListener("click", deleteKitchenItems);

    // // function deleteKitchenItems() {
    // //     li.remove();

    // // }

    // //Create edit button

    // let editBtn = document.createElement("i");
    // editBtn.classList.add("fa-solid", "fa-pen-to-square");
    // li.appendChild(editBtn);

}
//step:- 3
//Delete item from Kitchen list

function deleteKitchenItem(event) {

    if (event.target.classList[1] === 'fa-trash') {
        kitchenInputDataArray.splice(event.target.classList[2], 1);
        let item = event.target.parentElement;
        item.classList.add("slideOut")
        item.addEventListener("transitionend", function() {
            item.remove();

        });
        // item.remove();

        setLocalStorage();

        getLocalStorage();
    }
}

// step:-4
// edit items from kitchen list

function editKitchenItem(event) {
    if (event.target.classList[1] === 'fa-pen-to-square') {
        let editedValue = prompt("edit the value")
        let item = event.target.parentElement;
        let spanEle = item.querySelector("span");
        spanEle.innerText = editedValue;
        kitchenInputDataArray[event.target.classList[2]] = editedValue;

        setLocalStorage();

    }
}
//step1:-
//add event listener to the button

addBtn.addEventListener("click", addKitchenItems);
kitchenItemsList.addEventListener("click", deleteKitchenItem);
kitchenItemsList.addEventListener("click", editKitchenItem);
getLocalStorage();
ddEventListener("click", editKitchenItem);
getLocalStorage();