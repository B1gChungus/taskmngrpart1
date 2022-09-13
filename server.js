let e = require("express")
let path = require("path")

let app = e()
let { add, remove, get, change } = require("./api")
app.use(e.urlencoded({ extended: false }))
app.use(e.json())


app.use(e.static("./"))

app.get("/", function (r, re) {
    re.sendFile(path.resolve(__dirname, "index.html"))
})

app.post("/tasks", function (r, re) {
    console.log("thepost", r.body)
    let stuff = r.body.data
    if (stuff) {
        let name = stuff.name
        let desc = stuff.description
        let completed = stuff.completed
        add({ name: name, description: desc, completed: completed })
    }
})
app.get("/tasks", function (r, re) {
    console.log(get())
    re.status(201).send(get())
})

app.get("/tasks", function (r, re) {
    console.log("returning tasks")
    re.json(tasks)
})

app.listen(5000)