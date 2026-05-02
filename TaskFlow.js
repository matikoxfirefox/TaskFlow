const taskDesc = document.querySelector("#taskDesc");
const taskTitle = document.querySelector("#taskTitle");
const addTask = document.querySelector("#addTask");
const pendingList = document.querySelector("#pendingList");
const inProgressLIst = document.querySelector("#inProgressList");
const completedList = document.querySelector("#completedList");
const taskArr = [];
addTask.addEventListener('click', ()=> {
    const tdVal = taskDesc.value;
    const ttVal = taskTitle.value;
    if (ttVal === "" || tdVal === "") {
       return alert("Sprawdź czy któreś z pól nie jest puste!");
    } else {
        taskDesc.value = "";
        taskTitle.value = "";
    }
    const task = {
        title: ttVal,
        description: tdVal,
        status: "pending"
    }
    taskArr.push(task);
    console.log(taskArr);
    taskCreator();
})

function taskCreator() {
    pendingList.innerHTML = "";
    taskArr.forEach((arrEl) => {
        const newLi = document.createElement("li");
        newLi.innerHTML = arrEl.title;
        const inProgressBtn = document.createElement("button")
        const completedBtn = document.createElement("button")
        const pendingDiv = document.createElement("div")
        if (arrEl.status === "pending") {
            pendingList.appendChild(newLi);
            pendingDiv.appendChild(inProgressBtn);
            pendingDiv.appendChild(completedBtn);
            pendingDiv.id = "pendingDiv"
            inProgressBtn.id = "inProgressBtn"
            completedBtn.id = "completedBtn"
            newLi.appendChild(pendingDiv)
            inProgressBtn.textContent = "W trakcie"
            completedBtn.textContent = "Skończone"
        }
    })
}