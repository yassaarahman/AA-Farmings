// Core Modules
const path = require("path");

// External Module
const express = require("express");

// Local Modules
const { adminRouter } = require("./routes/adminRouter");
const storeRouter = require("./routes/storeRouter");
const rootDir = require("./utils/pathUtil");

// Controller
const errorsController = require("./controllers/404");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(adminRouter);
app.use(storeRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
