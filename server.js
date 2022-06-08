const express = require("express");
const routes = require("./routes/routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))
app.use(routes)


app.listen(PORT, () =>{
    console.log(`Listening @ http://localhost:${PORT}`)
})