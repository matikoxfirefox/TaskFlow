const taskDesc = document.querySelector("#taskDesc");
const taskTitle = document.querySelector("#taskTitle");
const addTask = document.querySelector("#addTask");
const pendingList = document.querySelector("#pendingList");
const inProgressList = document.querySelector("#inProgressList");
const completedList = document.querySelector("#completedList");
const taskArr = [];
addTask.addEventListener('click', ()=> {
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
        status: "pending"
    }
    taskArr.push(task);
    console.log(taskArr);
    renderTask();
})

function renderTask() {
    pendingList.innerHTML = "";    
    inProgressList.innerHTML = "";    
    completedList.innerHTML = "";
      
    taskArr.forEach((arrEl) => {
        const newLi = document.createElement("li");
        const taskBox = document.createElement("div");
        const pendingBtn = document.createElement("button");
        const inProgressBtn = document.createElement("button");
        const completedBtn = document.createElement("button");

        newLi.innerHTML = arrEl.title;
        pendingBtn.classList.add("pendingBtn");
        inProgressBtn.classList.add("inProgressBtn");
        completedBtn.classList.add("completedBtn");
        taskBox.classList.add("taskBox");
        
        if (arrEl.status === "pending") {
            inProgressBtn.textContent = "W trakcie";
            completedBtn.textContent = "Ukończone";
            taskBox.appendChild(inProgressBtn);
            taskBox.appendChild(completedBtn);
            newLi.appendChild(taskBox);
            pendingList.appendChild(newLi);
        } 
        if (arrEl.status === "inProgress") {
            pendingBtn.textContent = "Oczekujące";
            completedBtn.textContent = "Ukończone";
            taskBox.appendChild(pendingBtn);
            taskBox.appendChild(completedBtn);
            newLi.appendChild(taskBox);
            inProgressList.appendChild(newLi);
        } 
        if (arrEl.status === "completed") {
            pendingBtn.textContent = "Oczekujące";
            inProgressBtn.textContent = "W trakcie";
            taskBox.appendChild(inProgressBtn);
            taskBox.appendChild(pendingBtn);
            newLi.appendChild(taskBox);
            completedList.appendChild(newLi);
        }
        changeStatus(arrEl, newLi)
    }) 
}

function changeStatus(arrEl, newLi){
    if (arrEl.status === "pending") {
        newLi.querySelector(".inProgressBtn").addEventListener('click', ()=>{
            event.stopPropagation();
            arrEl.status = "inProgress";
            renderTask();
        })
        newLi.querySelector(".completedBtn").addEventListener('click', ()=>{
            event.stopPropagation();
            arrEl.status = "completed";
            renderTask();
        })
    }
    if (arrEl.status === "inProgress") {
        newLi.querySelector(".completedBtn").addEventListener('click', ()=>{
            event.stopPropagation();
            arrEl.status = "completed";
            renderTask();
        })
        newLi.querySelector(".pendingBtn").addEventListener('click', ()=>{
            event.stopPropagation();
            arrEl.status = "pending";
            renderTask();
        })
    }
    if (arrEl.status === "completed") {
        newLi.querySelector(".inProgressBtn").addEventListener('click', ()=>{
            event.stopPropagation();
            arrEl.status = "inProgress";
            renderTask();
        })
        newLi.querySelector(".pendingBtn").addEventListener('click', ()=>{
            event.stopPropagation();
            arrEl.status = "pending";
            renderTask();
        })
    }
}