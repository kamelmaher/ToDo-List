class Task {
    constructor(name, isCompleted) {
        this.name = name;
        this.isCompleted = isCompleted;
    }
}
let image = document.querySelector("img");
let theme = document.querySelector(".title i");
let addTask = document.querySelector(".add-task");
let button = document.querySelector(".add-task button");
let tasks = document.querySelector(".tasks");
let taskList = document.querySelector(".tasks ul");
let li = document.querySelectorAll(".tasks li");
let completed = document.querySelector(".complete");
let active = document.querySelector(".Active")
let All = document.querySelector(".All")
let filters = document.querySelectorAll(".filter span");
let clear = document.querySelector(".clear");
let newSrc = "images/bg-desktop-light.jpg";
let Tasks = [];

if(localStorage.getItem("task"))
    Tasks = JSON.parse(localStorage.getItem("task"));

let arr = [];
arr.push(document.body, addTask, tasks);
const changeTheme = () => {
    arr.map((e) => e.classList.toggle("theme"));
    li.forEach((e) => e.classList.toggle("text-theme"));
    if (image.src != newSrc) {
        let x = image.src;
        image.src = newSrc;
        newSrc = x;
    }
};
const createTask = () => {
    const task = new Task(document.querySelector("input").value, false);
    if(task.name != "") {
        Tasks.push(task);
        createTaskElement(task.name , task.isCompleted)
        completeTask();
        localStorage.setItem("task" , JSON.stringify(Tasks));
    }
    document.querySelector("input").value = "";
};
function createTaskElement(text , isCompleted) {
    let task = document.createElement("li");
    task.innerHTML = `
            <span></span>
            <p class= "task ${isCompleted ? "completed" : ""}">${text}</p>
    `;
    taskList.appendChild(task);
}
const completeTask = () => {
    let Task = document.querySelectorAll("ul li span");
    let Text = document.querySelectorAll("ul li p");
    Task.forEach((e, i) => {
        e.addEventListener("click",() => {
            Tasks[i].isCompleted = true;
            Text[i].classList.add("completed");
            let data = JSON.parse(localStorage.getItem("task"));
            data[i].isCompleted = true;
            localStorage.setItem("task" , JSON.stringify(data));
        }); 
    });
    console.log(Tasks)

};
function showTasks () {
    taskList.innerHTML = "";
    for (let i = 0; i < Tasks.length; i++) {
        createTaskElement(Tasks[i].name , Tasks[i].isCompleted);
    }

};
const showCompleted = ()=> {
    taskList.innerHTML = "";
    for(let i = 0 ; i < Tasks.length ; i++) {
        if(Tasks[i].isCompleted) {
            createTaskElement(Tasks[i].name , Tasks[i].isCompleted);
        }
    }
}
const showActive = ()=> {
    taskList.innerHTML = "";
    for(let i = 0 ; i < Tasks.length ; i++) {
        if(!Tasks[i].isCompleted)
            createTaskElement(Tasks[i].name , Tasks[i].isCompleted);
        
    }
}
filters.forEach(e => {
    e.addEventListener("click" , ()=> {
        filters.forEach(e => {
            e.classList.remove("active");
        })
        e.classList.add("active")
    })
})
const clearCompleted = ()=> {
    Tasks.map((e , index)=> {
        if(e.isCompleted) {
            Tasks = Tasks.filter(t => t != e)
            localStorage.setItem("task" , JSON.stringify(Tasks))
        }
        showTasks();
    })
}
showTasks();
completeTask();
All.addEventListener("click" , showTasks);
completed.addEventListener("click" , showCompleted);
active.addEventListener("click" , showActive);
theme.addEventListener("click", changeTheme);
button.addEventListener("click", createTask);
clear.addEventListener("click" , clearCompleted);
