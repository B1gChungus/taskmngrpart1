let tasks = require("./tasks.json")
console.log(tasks)
function add(data) {
    console.log(data)
    let desc = data.description
    let completed = data.completed
    let name = data.name
    tasks[name] = { name: name, description: desc, completed: completed }
    return tasks[name]
}
function remove(data) {
    let name = data.name
    tasks[name] = undefined
    return "done"
}
function change(data) {
    let name = data.name
    tasks[name].completed = !tasks[name].completed
    return tasks[name]
}
function get() {
    return tasks
}
module.exports = { add, remove, change, get }