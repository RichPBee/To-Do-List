let totalTodoList = [];
let todoDeleteButtons = document.querySelectorAll(".list-button.delete");
let todoEditButtons = document.querySelectorAll(".list-button.edit");
let todoSelectedButtons = document.querySelectorAll(".list-button.checkbox");


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

//Function to update the appPages object as new todos are added. 
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
            document.querySelector(`#${page}`).innerHTML = "";
            document.querySelector(`#${page}`).style.scale = "1";
            document.querySelector(`#${page}`).style.cursor = "auto";
        }
    } 
})

// Function to check which page Selectors need to be enabled (based on totalTodoList)
const checkPageNumbers = () => {
    for (page in appPages) {
        if (appPages[page].length > 0) {
            if (page == currentPage) {
                document.querySelector(`#${page}`).style.backgroundColor = "teal";
            } else {
                document.querySelector(`#${page}`).style.backgroundColor = "#D3D3D3";
            }
            document.querySelector(`#${page}`).disabled = false;
            document.querySelector(`#${page}`).innerHTML = `${page}`;
            document.querySelector(`#${page}`).style.scale = "1.02";
            document.querySelector(`#${page}`).style.cursor = "pointer";

        } else {
            if (page == "one") {
                return;
            }
            document.querySelector(`#${page}`).disabled = true;
            document.querySelector(`#${page}`).style.backgroundColor = "grey";
            document.querySelector(`#${page}`).innerHTML = "";
            document.querySelector(`#${page}`).style.scale = "1";
            document.querySelector(`#${page}`).style.cursor = "auto";
            if (page == currentPage) {
                const pages = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]; 
                let currentPageIndex = pages.indexOf(page)
                currentPage = pages[currentPageIndex - 1];
                document.querySelector(`#${currentPage}`).style.backgroundColor = "teal";
            }
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

    //This loop creates the buttons that go on each todo item
    for (let i = 0; i < 3; i++) {
        const listButton = document.createElement("button");
        if (i < 2) {
            const icon = document.createElement("i");
            icon.setAttribute("class", `${iconClasses[i]}`);
            listButton.appendChild(icon);
            listButton.setAttribute("class", "list-button");
            listButton.className += ` ${buttonClasses[i]}`;
            itemControls.appendChild(listButton);
        } else {
            listButton.setAttribute("class", "list-button");
            listButton.className += ` ${buttonClasses[i]}`;
            itemControls.appendChild(listButton);
        }
    }


    listItem.appendChild(itemControls);
    listItem.setAttribute("class", "todo");
    totalTodoList.unshift(listItem);
    const list = document.querySelector(".todo-list");
    //Checking that the total number of todo items doesn't exceed the page limit. 
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
    

    //Creating and handling click to delete function for each list item
    todoDeleteButtons = document.querySelectorAll(".list-button.delete");
    todoDeleteButtons.forEach(deletor => {
    deletor.addEventListener("click", () => {
        const todo = deletor.parentElement.parentElement;
        const todoList = document.querySelector(".todo-list");
        if (todoList.contains(todo)) {
            todoList.removeChild(todo);
        } else {
            return;
        }
        let newTodoList = [];
        for (let i = 0; i < totalTodoList.length; i++) {
            if (i !== totalTodoList.indexOf(todo)) {
                newTodoList.push(totalTodoList[i])
            }
        }

    //Handling click for todo edit buttons.         
    document.querySelectorAll(".list-button.edit").forEach(editor => {
        editor.addEventListener("click", () => {
            let todo = editor.parentElement.parentElement;
            let newTodo = prompt("What would you like to do instead?");
            todo.removeChild(todo.firstElementChild);
            todo.insertBefore(newTodo, todo.firstElementChild);
            
        })
    })


    totalTodoList = newTodoList;
    checkAppPages();
    checkPageNumbers();
    displayPage(currentPage);
    })
})

})

//reset the page selector buttons. May rename to resetPageButtons
const resetButtons = () => {
    const buttons = document.querySelectorAll(".page-selector");
    buttons.forEach(button => {
    button.clicked = false;
    button.style.backgroundColor = "#d3d3d3";
})
}

//Handling click for the page selector buttons. 
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

const displayPage = (pageNum) => {
    const todoList = document.querySelector(".todo-list");
    todoList.innerHTML ="";
    const todoSection = document.querySelector(".list-section");
    for (page in appPages){
        if (pageNum == page) {
            for (let i = 0; i < appPages[page].length; i++) {
                    let pageContentItem = appPages[page][i];
                    todoList.appendChild(pageContentItem);
            }
            todoSection.appendChild(todoList);
            document.querySelector(`#${pageNum}`).backgroundColor = "teal"
        }
    }
}