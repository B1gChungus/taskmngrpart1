
var itemname = document.getElementById("name")
var desc = document.getElementById("description")
var tasks = document.getElementById("tasks")
var taskdiv = document.getElementsByClassName("task")[0].cloneNode(true)
document.getElementsByClassName("task")[0].remove()

function send(type, data) {
    let body = {
        method: type,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    if (!data) {
        body = {
            method: type,
            headers: { 'Content-Type': 'application/json' },
        }
    }
    let troll = fetch("/tasks", body)
    return troll
}

function addtask(data) {
    let done = false
    let mouseTimer
    let newtask = taskdiv.cloneNode(true)
    let name = data.name || itemname.value
    let desc = data.description || desc.value
    let complete = data.completed || newtask.children[2]

    newtask.children[0].children[0].textContent = name
    newtask.children[1].textContent = desc
    let completed = complete
    let c1 = completed.addEventListener("click", function () {
        completed.children[0].textContent = (done == false && "true") || "false"
        completed.children[0].style.color = (done == false && "rgb(52, 248, 118)") || "rgb(255, 125, 125)"
        done = !done
    })
    function mdown() {
        mup();
        mouseTimer = window.setTimeout(troll, 1000); //set timeout to fire in 2 seconds when the user presses mouse button down
    }
    function mup() {
        if (mouseTimer) window.clearTimeout(mouseTimer);  //cancel timer when mouse button is released
    }
    function troll() {
        removeEventListener(completed, c1)
        removeEventListener(completed, c2)
        removeEventListener(completed, c3)
        send("")
        newtask.remove()
    }
    let c2 = completed.addEventListener("mousedown", mdown);
    let c3 = newtask.addEventListener("mouseup", mup);
    send("POST", {name:name,description:desc,completed:completed})
    tasks.appendChild(newtask)
}

let currenttasks = send("GET")
console.log(currenttasks)
for (const a in currenttasks) {
    addtask()
}