let totalTodoList = [];
let currentPage = 1;
document.querySelector("#1").style.backgroundColor = "teal"; 

//Adds a new todo based on clicking the tick -- will need to be changed to a call to a separate function to handle enter key presses.
document.querySelector(".submit").addEventListener("click", () => {
    const text = document.querySelector(".user-input").value;
    if (text == "") {
        return;
    }
    const iconClasses = ["fa fa-pencil", "fa fa-trash",]
    const buttonClasses = ["edit", "delete", "checkbox"]
    const listItem = document.createElement("li");
    const itemControls = document.createElement("div")
    itemControls.setAttribute("class", "item-controls")
    listItem.append(text);

    for (let i = 0; i < 3; i++) {
        const listButton = document.createElement("button");
        if (i < 2) {
            const icon = document.createElement("i");
            icon.setAttribute("class", `${iconClasses[i]}`);
            listButton.appendChild(icon);
            listButton.setAttribute("class", "list-button");
            listButton.setAttribute("id", `${buttonClasses[i]}`);
            itemControls.appendChild(listButton)
            console.log(listItem);
        } else {
            listButton.style.backgroundColor = "black";         
            listButton.setAttribute("class", "list-button");
            listButton.setAttribute("id", `${buttonClasses[i]}`);
            itemControls.appendChild(listButton);
        }
    }


    listItem.appendChild(itemControls);
    listItem.setAttribute("class", "todo");
    totalTodoList.unshift(listItem);
    const list = document.querySelector(".todo-list");
    if (totalTodoList.length > 6) {
        list.removeChild(list.lastChild);
    }
    list.insertBefore(listItem, list.firstElementChild);
    document.querySelector(".user-input").value = "";
})

const resetButtons = () => {
    const buttons = document.querySelectorAll(".page-selector");
    buttons.forEach(button => {
    button.clicked = false;
    button.style.backgroundColor = "#d3d3d3";
})
}

document.querySelectorAll(".page-selector").forEach(button => {
    button.addEventListener("click", () => {
        currentPage = button.id;
        resetButtons();
        button.style.backgroundColor = "teal";
   })
})

