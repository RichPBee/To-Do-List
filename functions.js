let totalTodoList = [];
let appPages = {
    "one": totalTodoList.slice(0,6),
    "two": totalTodoList.slice(6,12),
    "three": totalTodoList.slice(12,18),
    "four": totalTodoList.slice(18,23),
    "five": totalTodoList.slice(23,29),
    "six": totalTodoList.slice(29,35),
    "seven": totalTodoList.slice(35,41),
    "eight": totalTodoList.slice(41,47),
    "nine": totalTodoList.slice(47,53),
    "ten": totalTodoList.slice(53,59),
}

const checkAppPages = () => {
    appPages["one"] = totalTodoList.slice(0,6);
    appPages["two"] = totalTodoList.slice(6,12);
    appPages["three"] = totalTodoList.slice(12,18);
    appPages["four"] = totalTodoList.slice(18,23);
    appPages["five"] = totalTodoList.slice(23,29);
    appPages["six"] = totalTodoList.slice(29,35);
    appPages["seven"] = totalTodoList.slice(35,41);
    appPages["eight"] = totalTodoList.slice(41,47);
    appPages["nine"] = totalTodoList.slice(47,53);
    appPages["ten"] = totalTodoList.slice(53,59);
}

let currentPage;

window.addEventListener("load", () => {
    let totalTodoList = [];
    const pages = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]; 
    currentPage = "one";
    document.querySelector("#one").style.backgroundColor = "teal";
    for (page of pages) {
        if (page !== "one") {
            document.querySelector(`#${page}`).disabled = true;
            document.querySelector(`#${page}`).style.backgroundColor = "grey";
            document.querySelector(`#${page}`).style.boxShadow = "-3px 0px 2px 0px black";
            document.querySelector(`#${page}`).innerHTML = "";
            document.querySelector(`#${page}`).style.scale = "1";
            document.querySelector(`#${page}`).style.cursor = "auto";
        }
    } 
})

const checkPageNumbers = () => {
    for (page in appPages) {
        if (appPages[page].length > 0) {
            document.querySelector(`#${page}`).disabled = false;
            document.querySelector(`#${page}`).style.backgroundColor = "#D3D3D3";
            document.querySelector(`#${page}`).style.boxShadow = "-3px 0px 5px 0px teal";
            document.querySelector(`#${page}`).innerHTML = `${page}`;
            document.querySelector(`#${page}`).style.scale = "1.02";
            document.querySelector(`#${page}`).style.cursor = "pointer";

        } else {
            document.querySelector(`#${page}`).disabled = true;
            document.querySelector(`#${page}`).style.backgroundColor = "grey";
            document.querySelector(`#${page}`).style.boxShadow = "-3px 0px 2px 0px black";
            document.querySelector(`#${page}`).innerHTML = "";
            document.querySelector(`#${page}`).style.scale = "1";
            document.querySelector(`#${page}`).style.cursor = "auto";
        }
    }
}




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
    console.log(totalTodoList);
    const list = document.querySelector(".todo-list");
    if (currentPage == "one" && totalTodoList.length > 6) {
        list.removeChild(list.lastChild);
        list.insertBefore(listItem, list.firstElementChild);
    } else if (currentPage == "one") {
        list.insertBefore(listItem, list.firstElementChild);
    }
    checkAppPages();
    checkPageNumbers();
    displayPage(currentPage);
    document.querySelector(`#${currentPage}`).style.backgroundColor = "teal";
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
        if (currentPage == button.id) {
            return;
        }
        currentPage = button.id;
        resetButtons();
        checkPageNumbers();
        displayPage(currentPage);
        button.style.backgroundColor = "teal";
   })
})

/* const clearTodoSection = () => {
    const todoListElements = document.querySelector(".todo-list").children;
    const todoList = document.querySelector(".todo-list");
    for (element of todoListElements) {
        todoList.remove(element);
    }
} */


const displayPage = (pageNum) => {
    const todoList = document.querySelector(".todo-list");
    todoList.innerHTML ="";
    const todoSection = document.querySelector(".list-section");
    //clearTodoSection();
    for (page in appPages){
        if (pageNum == page) {
            for (let i = 0; i < appPages[page].length; i++) {
                    let pageContentItem = appPages[page][i];
                    todoList.appendChild(pageContentItem);
            }
            todoSection.appendChild(todoList);
        }
    }
}




