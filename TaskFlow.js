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
const creatorModal = document.querySelector("#creatorModal");
const taskCreator = document.querySelector("#taskCreator");
const usrPhoto = document.querySelector("#usrPhoto");
const deleteAllTasks = document.querySelector("#deleteAllTasks");
const delModal = document.querySelector("#delModal");
const accept = document.querySelector("#accept");
const deny = document.querySelector("#deny");
closeModal.classList.add("closeModal")
let taskArr = [];
let holderItem;

window.onload = () => {
    if (taskArr.length == 0) {
        const lsList = JSON.parse(localStorage.getItem("tasks"));
        taskArr = lsList || [];
        document.querySelector("#totalCount").innerHTML = 0;
        document.querySelector("#pendingNr").textContent = 0;
        document.querySelector("#inProgressNr").textContent = 0;
        document.querySelector("#completedNr").textContent = 0;
        renderTask();
    }
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == taskCreator) {
        taskCreator.style.display = "none";
    }
    if (event.target == delModal) {
        delModal.style.display = "none";
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
        taskCreator.style.display = "none";
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
        const span = document.createElement("span");
        span.innerHTML = arrEl.title
        span.classList.add("taskSpan");
        modalBtn.classList.add("modalBtn");
        taskBox.classList.add("taskBox");
        newLi.draggable = true;
        newLi.addEventListener("dragstart", dStart)

        if (arrEl.status === "pending") {
            modalBtn.textContent = "Szczegóły";
            taskBox.appendChild(modalBtn);
            newLi.appendChild(span);
            newLi.appendChild(taskBox);
            pendingList.appendChild(newLi);
        }
        if (arrEl.status === "inProgress") {
            modalBtn.textContent = "Szczegóły";
            taskBox.appendChild(modalBtn);
            newLi.appendChild(span);
            newLi.appendChild(taskBox);
            inProgressList.appendChild(newLi);
        }
        if (arrEl.status === "completed") {
            modalBtn.textContent = "Szczegóły";
            taskBox.appendChild(modalBtn);
            newLi.appendChild(span);
            newLi.appendChild(taskBox);
            completedList.appendChild(newLi);
        }
        showModal(arrEl, newLi);
        taskCounter();
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
function taskCounter () {
    const pendingArr = taskArr.filter((task) => task.status === "pending").length
    const inProgressArr = taskArr.filter((task) => task.status === "inProgress").length
    const completedArr = taskArr.filter((task) => task.status === "completed").length

    document.querySelector("#totalCount").innerHTML = taskArr.length;
    document.querySelector("#pendingNr").textContent = pendingArr;
    document.querySelector("#inProgressNr").textContent = inProgressArr;
    document.querySelector("#completedNr").textContent = completedArr;
}
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
})

creatorModal.addEventListener('click', ()=>{
    taskCreator.style.display = "block";
})

document.querySelector("#closeCreator").addEventListener('click', ()=> {
    taskCreator.style.display = "none"
})

deleteAllTasks.addEventListener("click", ()=> {
    delModal.style.display = "block";
})

deny.addEventListener("click", ()=> {
    delModal.style.display = "none"
})

accept.addEventListener("click", ()=>{
    if (taskArr.length === 0 ){
        alert("Brak zadań do usunięcia!")
        delModal.style.display = "none";
    } else {
        taskArr = [];
        delModal.style.display = "none";
        renderTask();
        taskCounter();
    }
})
JSON.parse(localStorage.getItem("tasks"));