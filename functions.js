document.querySelector(".submit").addEventListener("click", () => {
    const listItem = document.createElement("li");
    const list = document.querySelector("list-section");
    const text = document.querySelector(".user-input").value;
    listItem.innerHTML = `${text}`;
    list.appendChild(listItem);

})