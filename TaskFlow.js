const taskDesc = document.querySelector("#taskDesc");
const taskTitle = document.querySelector("#taskTitle");
const addTask = document.querySelector("#addTask");
const pendingList = document.querySelector("#pendingList");
const inProgressList = document.querySelector("#inProgressList");
const completedList = document.querySelector("#completedList");
const closeModal = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const deleteTask = document.querySelector("#deleteTask");
const modal = document.querySelector("#modal");
let taskArr = [];
let holderItem;

window.onload = () => {
    if (taskArr.length == 0) {
        const lsList = JSON.parse(localStorage.getItem("tasks"));
        taskArr = lsList || [];
        renderTask();
    }
}

addTask.addEventListener('click', () => {
    const tdVal = taskDesc.value;
    const ttVal = taskTitle.value;
    if (ttVal === "" || tdVal === "") {
        alert("Sprawdź czy któreś z pól nie jest puste!");
        return;
    } else {
        taskDesc.value = "";
        taskTitle.value = "";
    }
    const task = {
        title: ttVal,
        description: tdVal,
        status: "pending",
        id: Date.now()
    }
    taskArr.push(task);
    renderTask();
})

function renderTask() {
    pendingList.innerHTML = "";
    inProgressList.innerHTML = "";
    completedList.innerHTML = "";
    taskArr.forEach((arrEl) => {
        const newLi = document.createElement("li");
        newLi.dataset.id = arrEl.id
        const taskBox = document.createElement("div");
        const modalBtn = document.createElement("button");
        newLi.innerHTML = arrEl.title;
        modalBtn.classList.add("modalBtn");
        taskBox.classList.add("taskBox");
        newLi.draggable = true;
        newLi.addEventListener("dragstart", dStart)

        if (arrEl.status === "pending") {
            modalBtn.textContent = "Szczegóły";
            taskBox.appendChild(modalBtn);
            newLi.appendChild(taskBox);
            pendingList.appendChild(newLi);
        }
        if (arrEl.status === "inProgress") {
            modalBtn.textContent = "Szczegóły";
            taskBox.appendChild(modalBtn);
            newLi.appendChild(taskBox);
            inProgressList.appendChild(newLi);
        }
        if (arrEl.status === "completed") {
            modalBtn.textContent = "Szczegóły";
            taskBox.appendChild(modalBtn);
            newLi.appendChild(taskBox);
            completedList.appendChild(newLi);
        }
        showModal(arrEl, newLi);
    })
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}
function oDrop (event){
    event.preventDefault();
}
function dStart (event){
    holderItem = event.target;
}
function changeStatus(event) {
    event.preventDefault();
    const targetList = event.currentTarget;
    const taskId = holderItem.dataset.id;
    const task = taskArr.find(t => t.id == taskId);
    if(targetList && targetList.id === "pendingList") {
        event.target.appendChild(holderItem);
        task.status = "pending";
        renderTask();
    }
    if(targetList && targetList.id === "inProgressList") {
        event.target.appendChild(holderItem);
        task.status = "inProgress";
        renderTask();
    }
    if(targetList && targetList.id === "completedList") {
        event.target.appendChild(holderItem);
        task.status = "completed";
        renderTask();
    }
}
function showModal(modalEl, newLi) {
    newLi.querySelector(".modalBtn").addEventListener("click", () => {
        event.stopPropagation();
        modal.style.display = "block";
        modalTitle.innerHTML = modalEl.title;
        modalDescription.innerHTML = modalEl.description;
        deleteTask.addEventListener("click", ()=> {
            taskArr = taskArr.filter((task) => task.id !== modalEl.id);
            modal.style.display = "none";
            renderTask();
        })
    })
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
})
