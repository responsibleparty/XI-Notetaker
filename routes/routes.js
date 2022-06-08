const path = require("path");
const router = require("express").Router();
const {readFromFile, writeToFile, readAndAppend} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");


//Get routes
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    console.log(`${req.method} for ${req.path}`);
})

router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    console.log(`${req.method} for ${req.path}`);
}) 

router.get("/api/notes", (req, res) =>{
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
    console.log(`${req.method} for ${req.path}`);
})

// Post routes
router.post("/api/notes", (req, res) =>{
    const { title, text } = req.body;
    if(req.body){
        const newNote = {title, text, id:uuid()}
        readAndAppend(newNote, "./db/db.json")
        console.info(`${req.method} for ${req.path}`)
        res.json("Note Saved")
    } else {
        res.error("Couldn't Add Note")
    }
})


// Delete route
router.delete("/api/notes/:id", (req, res) =>{
    const noteId = req.params.id
    readFromFile("./db/db.json")
    .then((data) =>{
        const dbData = JSON.parse(data)
        const result = dbData.filter((note) => note.id !== noteId)
        writeToFile("./db/db.json", result)
        res.json('note was deleted')
    })
    console.info(`${req.method} for ${req.path}`)
})
module.exports = router;