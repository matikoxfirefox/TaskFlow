const taskDesc = document.querySelector("#taskDesc");
const taskTitle = document.querySelector("#taskTitle");
const addTask = document.querySelector("#addTask");
const taskArr = [];
addTask.addEventListener('click', ()=> {
    const tdVal = taskDesc.value;
    const ttVal = taskTitle.value;
    if (ttVal === "" || tdVal === "") {
        alert("Sprawdź czy któreś z pól nie jest puste!")
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
})