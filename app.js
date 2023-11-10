const express = require("express");
const database = require("knex")(require("./knexfile").development);
const path = require("path");

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRUD

// renderFormInput

// untuk memuat halaman form yg akan digunakan untuk input data ke content
app.get("/inputcontent", (req, res) => {
  res.status(200).render("form");
});

// create
app.post("/contents", async (req, res) => {
  const { judul, isi, gambar } = req.body;
  const dataContent = await database("contents")
    .insert({ isi, judul, gambar })
    .returning("*");
  res.status(200).redirect("/contents");
});

// read
app.get("/contents", async (req, res) => {
  const dataContents = await database("contents").select("*");
  console.log(dataContents);
  res.status(200).render("index", { dataContents });
});
// update

app.put("/contents", (req, res) => {
  res.status(200).json({
    status: "masuk put contents",
  });
});

// delete
app.delete("/contents", (req, res) => {
  res.status(200).json({
    status: "masuk delet contents",
  });
});

app.listen(port, () => {
  console.log(`listening to server ${port}`);
});
