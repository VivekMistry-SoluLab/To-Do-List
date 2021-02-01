
let addTask = document.getElementById("add-task");
let addTaskBtn = document.getElementById("add-task-btn");


//Add the Task

addTaskBtn.addEventListener("click", () => {
    addTaskValue = addTask.value;
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    } else{
        taskObj = JSON.parse(webtask);
    }
    taskObj.push(addTaskValue);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addTask.value = '';
    showTask();

})

//show added task

let showTask = () => {
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    } else{
        taskObj = JSON.parse(webtask);
    }
    let html='';
    let addedTaskList = document.getElementById("added-task-list");
    taskObj.forEach((item, index) => {
        html += `
        <tr>
        <th scope="row">${index+1}</th>
        <td>  ${item}</td>
        <td align='right'><button type="button" onclick="editTask(${index})" class="buttons" style="width:80px; padding:0; margin:0;">Edit</button>
        <button type="button" onclick="deleteItem(${index})" class="buttons" style="width:80px; padding:0; margin:0;">Delete</button></td>
        </tr>
        `;
    });
    addedTaskList.innerHTML = html;
}

//shows previously added task when re-launch the html file

showTask();


//Edit the task

const editTask = (index) =>{
    let saveTask = document.getElementById("save-task-index");
    let addTaskBtn = document.getElementById("add-task-btn");
    let saveTaskBtn = document.getElementById("save-task-btn");
    saveTask.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    addTask.value = taskObj[index];
    addTaskBtn.style.display="none";
    saveTaskBtn.style.display="block";
}


//save Task

let saveTaskBtn = document.getElementById("save-task-btn");
saveTaskBtn.addEventListener("click", () => {
    let addTaskBtn = document.getElementById("add-task-btn");
    let webtask =localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let saveTask = document.getElementById("save-task-index").value;
    taskObj[saveTask] = addTask.value;
    saveTaskBtn.style.display="none";
    addTaskBtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addTask.value='';
    showTask();
})


//Delete Item

const deleteItem = (index) => {
    let webtask =localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
}


//search task

let searchTask = document.getElementById("search-task");
searchTask.addEventListener("input", () => {
    let trList = document.querySelectorAll("tr");
    Array.from(trList).forEach((item) => {
        let searchInput = item.getElementsByTagName("td")[0].innerText;
        let searchTaskValue = searchTask.value;
        let regx = new RegExp(searchTaskValue,'gi');
        if(searchInput.match(regx)){
            item.style.display = "table-row";
        } else{
            item.style.display = "none";
        }
    })
})
